import { formatDate } from "../lib/dates";

function objectiveTone(dias) {
  if (dias === null) return "chip-neutral";
  if (dias < 0) return "chip-red";
  if (dias <= 7) return "chip-amber";
  return "chip-blue";
}

function objectiveLabel(dias) {
  if (dias === null) return "Sin fecha objetivo";
  if (dias < 0) return `Vencido hace ${Math.abs(dias)} d`;
  if (dias === 0) return "Vence hoy";
  return `Faltan ${dias} d`;
}

export default function LedProjects({ projects }) {
  if (projects.length === 0) {
    return <div className="empty-state">Esta persona no lidera proyectos.</div>;
  }
  return (
    <div className="projects-grid">
      {projects.map((p) => (
        <article className="project-card" key={p.proyecto}>
          <div className="project-top">
            <span className="project-name">{p.proyecto}</span>
            <span className={`chip ${objectiveTone(p.diasObjetivo)}`}>{objectiveLabel(p.diasObjetivo)}</span>
          </div>
          <div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${p.avance}%` }} />
            </div>
            <div className="project-meta">
              <span>Avance · objetivo {p.fechaObjetivo ? formatDate(p.fechaObjetivo) : "—"}</span>
              <strong>{p.avance}%</strong>
            </div>
          </div>
          <div className="project-stats">
            <span>
              <strong>{p.tareas}</strong>tareas
            </span>
            <span style={{ color: "var(--green)" }}>
              <strong>{p.finalizadas}</strong>finalizadas
            </span>
            <span style={{ color: p.vencidas > 0 ? "var(--red)" : "inherit" }}>
              <strong>{p.vencidas}</strong>vencidas
            </span>
          </div>
        </article>
      ))}
    </div>
  );
}
