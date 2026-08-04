import { daysBetween, startOfDay } from "./dates";

function emptyBucket() {
  return { total: 0, vencidas: 0, hoy: 0, proximos: 0, finalizadas: 0, enProceso: 0, pendientes: 0 };
}

function bucketFromTasks(tasks) {
  const b = emptyBucket();
  b.total = tasks.length;
  for (const t of tasks) {
    if (t.finalized) b.finalizadas += 1;
    else if (!t.closed && t.diasRestantes !== null && t.diasRestantes < 0) b.vencidas += 1;
    else if (!t.closed && t.diasRestantes === 0) b.hoy += 1;
    else if (!t.closed && t.diasRestantes !== null && t.diasRestantes > 0) b.proximos += 1;
  }
  return b;
}

function groupByProject(tasks) {
  const map = new Map();
  for (const t of tasks) {
    if (!map.has(t.proyecto)) map.set(t.proyecto, []);
    map.get(t.proyecto).push(t);
  }
  return Array.from(map.entries())
    .map(([proyecto, projectTasks]) => ({ proyecto, ...bucketFromTasks(projectTasks) }))
    .sort((a, b) => b.vencidas - a.vencidas || b.total - a.total);
}

export function buildPeopleModel(tasks, projects) {
  const today = startOfDay(new Date());
  const names = new Set();

  tasks.forEach((t) => {
    if (t.responsable && t.responsable !== "—") names.add(t.responsable);
  });
  projects.forEach((p) => {
    if (p.lider) names.add(p.lider);
  });

  const people = Array.from(names).map((nombre) => {
    const tasksAsResponsable = tasks.filter((t) => t.responsable === nombre);
    const projectsAsLider = projects.filter((p) => p.lider === nombre);

    const kpis = bucketFromTasks(tasksAsResponsable);
    kpis.cumplimiento = kpis.total > 0 ? Math.round((kpis.finalizadas / kpis.total) * 100) : 0;

    const openTasks = tasksAsResponsable
      .filter((t) => !t.closed && t.fechaCompromiso)
      .sort((a, b) => a.diasRestantes - b.diasRestantes);
    const nextDeadline = openTasks.length > 0 ? openTasks[0] : null;

    const proyectosLiderados = projectsAsLider.map((p) => ({
      ...p,
      diasObjetivo: p.fechaObjetivo ? daysBetween(today, p.fechaObjetivo) : null,
    }));

    const byProject = groupByProject(tasksAsResponsable);

    const roles = [];
    if (tasksAsResponsable.length > 0) roles.push("Responsable");
    if (projectsAsLider.length > 0) roles.push("Líder de proyecto");

    return {
      nombre,
      roles,
      kpis,
      nextDeadline,
      proyectosLiderados,
      byProject,
      tasksAsResponsable,
    };
  });

  return people.sort((a, b) => a.nombre.localeCompare(b.nombre));
}
