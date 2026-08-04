import { formatDate } from "../lib/dates";
import { priorityChipClass, statusChipClass } from "../lib/format";

export default function PersonTasksTable({ tasks }) {
  if (tasks.length === 0) {
    return <div className="empty-state">Sin tareas asignadas.</div>;
  }

  const sorted = [...tasks].sort((a, b) => {
    if (a.diasRestantes === null) return 1;
    if (b.diasRestantes === null) return -1;
    return a.diasRestantes - b.diasRestantes;
  });

  return (
    <div className="table-scroll">
      <table className="data-table">
        <thead>
          <tr>
            <th>Proyecto</th>
            <th>Tarea</th>
            <th>Prioridad</th>
            <th>Estado</th>
            <th>Fecha compromiso</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((t) => (
            <tr key={t.id}>
              <td>{t.proyecto}</td>
              <td>{t.tarea}</td>
              <td>
                <span className={`chip ${priorityChipClass(t.prioridad)}`}>{t.prioridad || "—"}</span>
              </td>
              <td>
                <span className={`chip ${statusChipClass(t.estado)}`}>{t.estado || "—"}</span>
              </td>
              <td className="cell-muted">{formatDate(t.fechaCompromiso)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
