export default function PersonList({ people, selected, onSelect }) {
  if (people.length === 0) {
    return <div className="empty-state">No hay responsables ni líderes registrados.</div>;
  }
  return (
    <ul className="person-list">
      {people.map((p) => (
        <li key={p.nombre}>
          <button
            className={`person-item${p.nombre === selected ? " active" : ""}`}
            onClick={() => onSelect(p.nombre)}
          >
            <span className="person-item-name">{p.nombre}</span>
            <span className="person-item-meta">
              {p.roles.map((r) => (
                <span key={r} className="chip chip-neutral">
                  {r}
                </span>
              ))}
              {p.kpis.vencidas > 0 && <span className="chip chip-red">{p.kpis.vencidas} venc.</span>}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
