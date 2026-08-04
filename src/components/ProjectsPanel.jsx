export default function ProjectsPanel({ projects }) {
  if (projects.length === 0) {
    return <div className="empty-state">No hay proyectos registrados.</div>;
  }
  return (
    <div className="projects-grid">
      {projects.map((p) => (
        <article className="project-card" key={p.proyecto}>
          <div className="project-top">
            <span className="project-name">{p.proyecto}</span>
            <span className="project-lead">{p.lider}</span>
          </div>
          <div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${p.avance}%` }} />
            </div>
            <div className="project-meta">
              <span>Avance</span>
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
