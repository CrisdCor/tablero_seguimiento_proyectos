export default function KpiRow({ kpis }) {
  const tiles = [
    { key: "total", label: "Total", value: kpis.total, accent: "var(--neutral)" },
    { key: "vencidas", label: "Vencidas", value: kpis.vencidas, accent: "var(--red)" },
    { key: "hoy", label: "Hoy", value: kpis.hoy, accent: "var(--amber)" },
    { key: "proximos", label: "Próximos", value: kpis.proximos, accent: "var(--blue)" },
    { key: "finalizadas", label: "Finalizadas", value: kpis.finalizadas, accent: "var(--green)" },
    { key: "cumplimiento", label: "Cumplimiento", value: `${kpis.cumplimiento}%`, accent: "var(--green)" },
  ];

  return (
    <div className="kpi-row">
      {tiles.map((tile) => (
        <div key={tile.key} className="kpi-tile" style={{ "--tile-accent": tile.accent }}>
          <div className="stat-label">{tile.label}</div>
          <div className="kpi-value">{tile.value}</div>
        </div>
      ))}
    </div>
  );
}
