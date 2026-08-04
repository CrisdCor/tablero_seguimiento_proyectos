const ESTADOS = ["Pendiente", "En proceso", "En espera", "Bloqueada", "Finalizada", "Cancelada"];

const VISTAS = [
  { key: "", label: "Todas" },
  { key: "vencidas", label: "Vencidas" },
  { key: "hoy", label: "Hoy" },
  { key: "proximos", label: "Próximas 7 días" },
  { key: "finalizadas", label: "Finalizadas" },
];

export default function TaskFilterBar({
  responsables,
  proyectos,
  responsable,
  estado,
  proyecto,
  vista,
  onChange,
  onReset,
  count,
  total,
}) {
  return (
    <div className="filter-bar-wrap">
      <div className="vista-chips">
        {VISTAS.map((v) => (
          <button
            key={v.key}
            className={`vista-chip${vista === v.key ? " active" : ""}`}
            onClick={() => onChange({ vista: v.key })}
          >
            {v.label}
          </button>
        ))}
      </div>
      <div className="filter-bar">
      <div className="filter-field">
        <label htmlFor="f-responsable">Responsable</label>
        <select
          id="f-responsable"
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
        <label htmlFor="f-estado">Estado</label>
        <select id="f-estado" value={estado} onChange={(e) => onChange({ estado: e.target.value })}>
          <option value="">Todos</option>
          {ESTADOS.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-field">
        <label htmlFor="f-proyecto">Proyecto</label>
        <select id="f-proyecto" value={proyecto} onChange={(e) => onChange({ proyecto: e.target.value })}>
          <option value="">Todos</option>
          {proyectos.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-meta">
        <span className="filter-count">
          {count} de {total} tareas
        </span>
        <button className="refresh-btn" onClick={onReset}>
          Limpiar filtros
        </button>
      </div>
      </div>
    </div>
  );
}
