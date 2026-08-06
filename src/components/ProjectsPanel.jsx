import { projectStatusChipClass } from "../lib/format";

export default function ProjectsPanel({ projects }) {
  if (projects.length === 0) {
    return <div className="empty-state">No hay proyectos registrados.</div>;
  }

  return (
    <div className="table-scroll">
      <table className="data-table">
        <thead>
          <tr>
            <th>Proyecto</th>
            <th>Líder del proyecto</th>
            <th>Estado</th>
            <th>Avance</th>
            <th>Tareas totales</th>
            <th>Vencidas</th>
            <th>Finalizadas</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p.proyecto}>
              <td>{p.proyecto}</td>
              <td className="cell-muted">{p.lider || "—"}</td>
              <td>
                <span className={`chip ${projectStatusChipClass(p.estadoGenerado)}`}>{p.estadoGenerado}</span>
              </td>
              <td>
                <div className="table-progress">
                  <div className="table-progress-track">
                    <div className="table-progress-fill" style={{ width: `${p.avance}%` }} />
                  </div>
                  <span className="table-progress-value">{p.avance}%</span>
                </div>
              </td>
              <td>{p.tareas}</td>
              <td>
                {p.vencidas > 0 ? <span className="chip chip-red">{p.vencidas}</span> : p.vencidas}
              </td>
              <td>
                <span style={{ color: p.finalizadas > 0 ? "var(--green)" : "inherit" }}>{p.finalizadas}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
