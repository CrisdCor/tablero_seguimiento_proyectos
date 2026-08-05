import { formatDate } from "../lib/dates";
import { statusChipClass } from "../lib/format";

const MS_DAY = 1000 * 60 * 60 * 24;
const MIN_WIDTH_PCT = 3;

function dayNumber(date) {
  return Math.floor(date.getTime() / MS_DAY);
}

function barTone(task) {
  if (task.finalized) return "gantt-bar-green";
  if (task.closed) return "gantt-bar-neutral"; // cancelada
  if (task.diasRestantes === null) return "gantt-bar-neutral";
  if (task.diasRestantes < 0) return "gantt-bar-red";
  if (task.diasRestantes === 0) return "gantt-bar-amber";
  return "gantt-bar-blue";
}

export default function GanttChart({ tasks }) {
  if (tasks.length === 0) {
    return <div className="empty-state">Sin tareas asignadas.</div>;
  }

  const withDates = tasks.filter((t) => t.fechaCompromiso);
  const withoutDates = tasks.filter((t) => !t.fechaCompromiso);

  if (withDates.length === 0) {
    return (
      <div className="empty-state">
        Ninguna tarea tiene fecha de compromiso registrada, así que no se puede trazar el Gantt.
      </div>
    );
  }

  const today = new Date();
  const starts = withDates.map((t) => t.fechaAsignacion || t.fechaCompromiso);
  const ends = withDates.map((t) => t.fechaCompromiso);

  let rangeStartNum = Math.min(...starts.map(dayNumber), dayNumber(today)) - 2;
  let rangeEndNum = Math.max(...ends.map(dayNumber), dayNumber(today)) + 2;
  const totalDays = Math.max(rangeEndNum - rangeStartNum, 1);

  const todayPct = ((dayNumber(today) - rangeStartNum) / totalDays) * 100;

  const rows = [...withDates].sort((a, b) => {
    if (a.diasRestantes === null) return 1;
    if (b.diasRestantes === null) return -1;
    return a.diasRestantes - b.diasRestantes;
  });

  return (
    <div className="gantt-wrap">
      <div className="gantt-legend">
        <span className="gantt-legend-item">
          <i className="gantt-dot gantt-bar-red" /> Vencida
        </span>
        <span className="gantt-legend-item">
          <i className="gantt-dot gantt-bar-amber" /> Vence hoy
        </span>
        <span className="gantt-legend-item">
          <i className="gantt-dot gantt-bar-blue" /> En curso
        </span>
        <span className="gantt-legend-item">
          <i className="gantt-dot gantt-bar-green" /> Finalizada
        </span>
        <span className="gantt-legend-item">
          <i className="gantt-dot gantt-bar-neutral" /> Cancelada / sin estado
        </span>
      </div>

      <div className="gantt-header-row">
        <div className="gantt-col-proyecto">Proyecto</div>
        <div className="gantt-col-tarea">Tarea</div>
        <div className="gantt-col-estado">Estado</div>
        <div className="gantt-timeline gantt-timeline-header">
          <span>{formatDate(new Date(rangeStartNum * MS_DAY))}</span>
          <span>Hoy</span>
          <span>{formatDate(new Date(rangeEndNum * MS_DAY))}</span>
        </div>
      </div>

      {rows.map((t) => {
        const start = t.fechaAsignacion || t.fechaCompromiso;
        const leftPct = ((dayNumber(start) - rangeStartNum) / totalDays) * 100;
        const rawWidthPct = ((dayNumber(t.fechaCompromiso) - dayNumber(start)) / totalDays) * 100;
        const widthPct = Math.max(rawWidthPct, MIN_WIDTH_PCT);

        return (
          <div className="gantt-row" key={t.id}>
            <div className="gantt-col-proyecto">{t.proyecto}</div>
            <div className="gantt-col-tarea">{t.tarea}</div>
            <div className="gantt-col-estado">
              <span className={`chip ${statusChipClass(t.estado)}`}>{t.estado || "—"}</span>
            </div>
            <div className="gantt-timeline">
              <div className="gantt-track">
                {todayPct >= 0 && todayPct <= 100 && (
                  <div className="gantt-today-line" style={{ left: `${todayPct}%` }} />
                )}
                <div
                  className={`gantt-bar ${barTone(t)}`}
                  style={{ left: `${Math.max(leftPct, 0)}%`, width: `${widthPct}%` }}
                  title={`${formatDate(start)} → ${formatDate(t.fechaCompromiso)}`}
                />
              </div>
              <div className="gantt-bar-dates">
                {formatDate(start)} → {formatDate(t.fechaCompromiso)}
              </div>
            </div>
          </div>
        );
      })}

      {withoutDates.length > 0 && (
        <div className="gantt-nodates">
          <span className="stat-label">Sin fecha de compromiso ({withoutDates.length})</span>
          {withoutDates.map((t) => (
            <div className="gantt-row" key={t.id}>
              <div className="gantt-col-proyecto">{t.proyecto}</div>
              <div className="gantt-col-tarea">{t.tarea}</div>
              <div className="gantt-col-estado">
                <span className={`chip ${statusChipClass(t.estado)}`}>{t.estado || "—"}</span>
              </div>
              <div className="gantt-timeline cell-muted">Sin fecha</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
