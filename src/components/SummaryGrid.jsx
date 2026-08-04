export default function SummaryGrid({ summary }) {
  const tiles = [
    { key: "total", label: "Total", value: summary.total, accent: "var(--neutral)" },
    { key: "hoy", label: "Hoy", value: summary.hoy, accent: "var(--amber)" },
    { key: "proximos", label: "Próximos 7 días", value: summary.proximos, accent: "var(--blue)" },
    { key: "vencidas", label: "Vencidas", value: summary.vencidas, accent: "var(--red)" },
    { key: "finalizadas", label: "Finalizadas", value: summary.finalizadas, accent: "var(--green)" },
  ];

  return (
    <section className="summary-grid" aria-label="Resumen de gestión">
      {tiles.map((tile) => (
        <div key={tile.key} className="stat-tile" style={{ "--tile-accent": tile.accent }}>
          <div className="stat-label">{tile.label}</div>
          <div className="stat-value">
            {tile.value}
            <small>tareas</small>
          </div>
        </div>
      ))}
    </section>
  );
}
