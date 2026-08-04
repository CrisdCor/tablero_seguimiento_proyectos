export default function DashboardFilterBar({
  responsables,
  proyectos,
  responsable,
  proyecto,
  onChange,
  onReset,
}) {
  const active = Boolean(responsable || proyecto);
  return (
    <div className="filter-bar-wrap dashboard-filter-bar">
      <div className="filter-bar">
        <div className="filter-field">
          <label htmlFor="d-responsable">Responsable</label>
          <select
            id="d-responsable"
            value={responsable}
            onChange={(e) => onChange({ responsable: e.target.value })}
          >
            <option value="">Todos</option>
            {responsables.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-field">
          <label htmlFor="d-proyecto">Proyecto</label>
          <select id="d-proyecto" value={proyecto} onChange={(e) => onChange({ proyecto: e.target.value })}>
            <option value="">Todos</option>
            {proyectos.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        {active && (
          <div className="filter-meta">
            <button className="refresh-btn" onClick={onReset}>
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
