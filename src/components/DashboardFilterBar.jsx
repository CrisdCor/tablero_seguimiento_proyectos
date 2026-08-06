import MultiSelect from "./MultiSelect";

export default function DashboardFilterBar({
  responsables,
  lideres,
  proyectos,
  responsable,
  lider,
  proyecto,
  onChange,
  onReset,
}) {
  const active = responsable.length > 0 || lider.length > 0 || proyecto.length > 0;
  return (
    <div className="filter-bar-wrap dashboard-filter-bar">
      <div className="filter-bar">
        <div className="filter-field">
          <label>Responsable</label>
          <MultiSelect options={responsables} selected={responsable} onChange={(v) => onChange({ responsable: v })} />
        </div>

        <div className="filter-field">
          <label>Líder de Proyecto</label>
          <MultiSelect options={lideres} selected={lider} onChange={(v) => onChange({ lider: v })} />
        </div>

        <div className="filter-field">
          <label>Proyecto</label>
          <MultiSelect options={proyectos} selected={proyecto} onChange={(v) => onChange({ proyecto: v })} />
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
