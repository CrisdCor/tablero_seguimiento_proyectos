import { formatDate } from "../lib/dates";
import { priorityChipClass } from "../lib/format";

export default function OverdueTable({ tasks }) {
  if (tasks.length === 0) {
    return <div className="empty-state">No hay tareas vencidas. Al día. ✓</div>;
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
            <th>Fecha compromiso</th>
            <th>Días vencida</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t) => (
            <tr key={t.id}>
              <td>{t.proyecto}</td>
              <td>{t.tarea}</td>
              <td className="cell-muted">{t.responsable}</td>
              <td>
                <span className={`chip ${priorityChipClass(t.prioridad)}`}>{t.prioridad || "—"}</span>
              </td>
              <td className="cell-muted">{formatDate(t.fechaCompromiso)}</td>
              <td>
                <span className="chip chip-red">{t.diasVencida} d</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
