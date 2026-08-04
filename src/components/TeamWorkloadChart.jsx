import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const SERIES = [
  { key: "vencidas", name: "Vencidas", color: "#c8433c" },
  { key: "hoy", name: "Hoy", color: "#c17a17" },
  { key: "proximos", name: "Próximos", color: "#2f56c9" },
  { key: "finalizadas", name: "Finalizadas", color: "#21875a" },
];

export default function TeamWorkloadChart({ people }) {
  const data = people
    .map((p) => ({
      nombre: p.nombre,
      vencidas: p.kpis.vencidas,
      hoy: p.kpis.hoy,
      proximos: p.kpis.proximos,
      finalizadas: p.kpis.finalizadas,
      total: p.kpis.total,
    }))
    .filter((p) => p.total > 0)
    .sort((a, b) => b.total - a.total);

  if (data.length === 0) {
    return <div className="empty-state">Sin tareas asignadas para graficar.</div>;
  }

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e5eb" vertical={false} />
          <XAxis
            dataKey="nombre"
            tick={{ fontSize: 11, fill: "#182233", fontFamily: "IBM Plex Mono, monospace" }}
            axisLine={{ stroke: "#c9cdd6" }}
            tickLine={false}
            interval={0}
            angle={-20}
            textAnchor="end"
            height={56}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 11, fill: "#5c6675", fontFamily: "IBM Plex Mono, monospace" }}
            axisLine={{ stroke: "#c9cdd6" }}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              fontFamily: "IBM Plex Mono, monospace",
              fontSize: 12,
              border: "1px solid #c9cdd6",
              borderRadius: 3,
            }}
          />
          <Legend wrapperStyle={{ fontSize: 11, fontFamily: "IBM Plex Mono, monospace" }} />
          {SERIES.map((s) => (
            <Bar key={s.key} dataKey={s.key} name={s.name} stackId="tasks" fill={s.color} radius={0} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
