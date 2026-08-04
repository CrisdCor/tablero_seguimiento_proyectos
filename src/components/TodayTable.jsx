import { priorityChipClass, statusChipClass } from "../lib/format";

export default function TodayTable({ tasks }) {
  if (tasks.length === 0) {
    return <div className="empty-state">Sin tareas con vencimiento hoy.</div>;
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
              <td>
                <span className={`chip ${statusChipClass(t.estado)}`}>{t.estado || "—"}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
