import MultiSelect from "./MultiSelect";

const ESTADOS = ["Pendiente", "En proceso", "En espera", "Bloqueada", "Finalizada", "Cancelada"];
const ESTADOS_PROYECTO = ["Finalizado", "Atención", "En proceso"];

const VISTAS = [
  { key: "", label: "Todas" },
  { key: "vencidas", label: "Vencidas" },
  { key: "hoy", label: "Hoy" },
  { key: "proximos", label: "Próximas 7 días" },
  { key: "finalizadas", label: "Finalizadas" },
];

export default function TaskFilterBar({
  lideres,
  proyectos,
  lider,
  estadoProyecto,
  proyecto,
  estado,
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
          <label>Líder del proyecto</label>
          <MultiSelect options={lideres} selected={lider} onChange={(v) => onChange({ lider: v })} />
        </div>

        <div className="filter-field">
          <label>Estado del proyecto</label>
          <MultiSelect
            options={ESTADOS_PROYECTO}
            selected={estadoProyecto}
            onChange={(v) => onChange({ estadoProyecto: v })}
          />
        </div>

        <div className="filter-field">
          <label>Proyecto</label>
          <MultiSelect options={proyectos} selected={proyecto} onChange={(v) => onChange({ proyecto: v })} />
        </div>

        <div className="filter-field">
          <label>Estado de tarea</label>
          <MultiSelect options={ESTADOS} selected={estado} onChange={(v) => onChange({ estado: v })} />
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
