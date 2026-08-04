import { formatDate } from "../lib/dates";
import { priorityChipClass } from "../lib/format";

export default function UpcomingTable({ tasks }) {
  if (tasks.length === 0) {
    return <div className="empty-state">Sin tareas próximas a vencer en los próximos 7 días.</div>;
  }
  return (
    <div className="table-scroll">
      <table className="data-table">
        <thead>
          <tr>
            <th>Fecha compromiso</th>
            <th>Proyecto</th>
            <th>Tarea</th>
            <th>Responsable</th>
            <th>Prioridad</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t) => (
            <tr key={t.id}>
              <td className="cell-muted">{formatDate(t.fechaCompromiso)}</td>
              <td>{t.proyecto}</td>
              <td>{t.tarea}</td>
              <td className="cell-muted">{t.responsable}</td>
              <td>
                <span className={`chip ${priorityChipClass(t.prioridad)}`}>{t.prioridad || "—"}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
