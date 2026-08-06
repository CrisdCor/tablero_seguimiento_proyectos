import { formatDate } from "../lib/dates";
import { priorityChipClass, statusChipClass, projectStatusChipClass } from "../lib/format";

function dueChip(task) {
  if (task.finalized) return null;
  if (task.diasRestantes === null) return <span className="chip chip-neutral">Sin fecha</span>;
  if (task.diasRestantes < 0) return <span className="chip chip-red">Vencida {Math.abs(task.diasRestantes)}d</span>;
  if (task.diasRestantes === 0) return <span className="chip chip-amber">Vence hoy</span>;
  return <span className="chip chip-blue">Faltan {task.diasRestantes}d</span>;
}

export default function AllTasksTable({ tasks, projectStatusMap }) {
  if (tasks.length === 0) {
    return <div className="empty-state">No hay tareas que coincidan con los filtros.</div>;
  }

  return (
    <div className="table-scroll">
      <table className="data-table">
        <thead>
          <tr>
            <th>Proyecto</th>
            <th>Tarea</th>
            <th>Responsable</th>
            <th>Prioridad</th>
            <th>Estado</th>
            <th>Fecha compromiso</th>
            <th>Vencimiento</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t) => {
            const projectStatus = projectStatusMap?.get(t.proyecto);
            return (
              <tr key={t.id}>
                <td>
                  {t.proyecto}
                  {projectStatus && (
                    <>
                      {" "}
                      <span className={`chip ${projectStatusChipClass(projectStatus)}`}>{projectStatus}</span>
                    </>
                  )}
                </td>
                <td>{t.tarea}</td>
                <td className="cell-muted">{t.responsable}</td>
                <td>
                  <span className={`chip ${priorityChipClass(t.prioridad)}`}>{t.prioridad || "—"}</span>
                </td>
                <td>
                  <span className={`chip ${statusChipClass(t.estado)}`}>{t.estado || "—"}</span>
                </td>
                <td className="cell-muted">{formatDate(t.fechaCompromiso)}</td>
                <td>{dueChip(t)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
