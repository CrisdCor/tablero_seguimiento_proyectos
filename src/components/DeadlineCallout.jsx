import { formatDate } from "../lib/dates";

export default function DeadlineCallout({ task }) {
  if (!task) {
    return (
      <div className="deadline-callout deadline-neutral">
        <span className="deadline-label">Próximo vencimiento</span>
        <span className="deadline-value">Sin tareas pendientes con fecha</span>
      </div>
    );
  }

  const overdue = task.diasRestantes < 0;
  const today = task.diasRestantes === 0;
  const tone = overdue ? "deadline-red" : today ? "deadline-amber" : "deadline-blue";
  const message = overdue
    ? `Vencida hace ${Math.abs(task.diasRestantes)} día(s)`
    : today
    ? "Vence hoy"
    : `Vence en ${task.diasRestantes} día(s)`;

  return (
    <div className={`deadline-callout ${tone}`}>
      <span className="deadline-label">Próximo vencimiento · {formatDate(task.fechaCompromiso)}</span>
      <span className="deadline-value">{message}</span>
      <span className="deadline-detail">
        {task.tarea} · {task.proyecto}
      </span>
    </div>
  );
}
