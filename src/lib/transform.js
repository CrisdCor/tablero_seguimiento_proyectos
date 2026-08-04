import { parseSheetDate, daysBetween, startOfDay } from "./dates";
import { normalize } from "./sheets";
import { parsePercent } from "./format";
import { UPCOMING_WINDOW_DAYS } from "../config";

const CLOSED_STATES = ["finaliz", "complet", "cancel"];

function isClosed(estado) {
  const e = normalize(estado);
  return CLOSED_STATES.some((prefix) => e.startsWith(prefix));
}

function isFinalized(estado) {
  const e = normalize(estado);
  return e.startsWith("finaliz") || e.startsWith("complet");
}

export function buildTaskModel(rawTasks) {
  const today = startOfDay(new Date());

  const tasks = rawTasks.map((row, idx) => {
    const fechaCompromiso = parseSheetDate(row["Fecha compromiso"]);
    const fechaAsignacion = parseSheetDate(row["Fecha asignación"]);
    const estado = (row["Estado"] || "").trim();
    const diasRestantes = fechaCompromiso ? daysBetween(today, fechaCompromiso) : null;

    return {
      id: row["ID"] || `row-${idx}`,
      proyecto: (row["Proyecto"] || "Sin proyecto").trim(),
      tarea: (row["Tarea"] || "—").trim(),
      responsable: (row["Responsable"] || "—").trim(),
      prioridad: (row["Prioridad"] || "").trim(),
      estado,
      fechaAsignacion,
      fechaCompromiso,
      diasRestantes,
      observaciones: (row["Observaciones"] || "").trim(),
      closed: isClosed(estado),
      finalized: isFinalized(estado),
    };
  });

  const withDueDate = tasks.filter((t) => t.fechaCompromiso);

  const vencidas = withDueDate
    .filter((t) => !t.closed && t.diasRestantes < 0)
    .map((t) => ({ ...t, diasVencida: Math.abs(t.diasRestantes) }))
    .sort((a, b) => b.diasVencida - a.diasVencida);

  const hoy = withDueDate.filter((t) => !t.closed && t.diasRestantes === 0);

  const proximos = withDueDate
    .filter((t) => !t.closed && t.diasRestantes > 0 && t.diasRestantes <= UPCOMING_WINDOW_DAYS)
    .sort((a, b) => a.diasRestantes - b.diasRestantes);

  const finalizadas = tasks.filter((t) => t.finalized);

  const summary = {
    total: tasks.length,
    hoy: hoy.length,
    proximos: proximos.length,
    vencidas: vencidas.length,
    finalizadas: finalizadas.length,
  };

  return { tasks, vencidas, hoy, proximos, finalizadas, summary };
}

function computeProjectStatus(project) {
  if (project.vencidas > 0) return "Atención";
  if (project.tareas > 0 && project.finalizadas === project.tareas) return "Finalizado";
  if (project.avance >= 100) return "Finalizado";
  return "En proceso";
}

export function buildProjectModel(rawProjects) {
  return rawProjects
    .map((row) => {
      const project = {
        proyecto: (row["Proyecto"] || "Sin proyecto").trim(),
        lider: (row["Líder de Proyecto"] || "").trim(),
        fechaObjetivo: parseSheetDate(row["Fecha Objetivo"]),
        estado: (row["Estado"] || "").trim(),
        avance: parsePercent(row["Avance"]),
        tareas: Number(row["Tareas"]) || 0,
        finalizadas: Number(row["Finalizadas"]) || 0,
        vencidas: Number(row["Vencidas"]) || 0,
        pendientes: Number(row["Pendientes"]) || 0,
        enProceso: Number(row["En Proceso"]) || 0,
        enEspera: Number(row["En Espera"]) || 0,
        bloqueadas: Number(row["Bloqueadas"]) || 0,
        canceladas: Number(row["Canceladas"]) || 0,
      };
      project.estadoGenerado = computeProjectStatus(project);
      return project;
    })
    .sort((a, b) => b.vencidas - a.vencidas || a.proyecto.localeCompare(b.proyecto));
}
