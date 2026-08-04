import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const SERIES = [
  { key: "vencidas", name: "Vencidas", color: "#c8433c" },
  { key: "hoy", name: "Hoy", color: "#c17a17" },
  { key: "proximos", name: "Próximos", color: "#2f56c9" },
  { key: "finalizadas", name: "Finalizadas", color: "#21875a" },
];

export default function WorkloadChart({ byProject }) {
  if (byProject.length === 0) {
    return <div className="empty-state">Sin tareas asignadas para graficar.</div>;
  }

  const height = Math.max(160, byProject.length * 44);

  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer>
        <BarChart data={byProject} layout="vertical" margin={{ top: 4, right: 16, bottom: 4, left: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e5eb" horizontal={false} />
          <XAxis
            type="number"
            allowDecimals={false}
            tick={{ fontSize: 11, fill: "#5c6675", fontFamily: "IBM Plex Mono, monospace" }}
            axisLine={{ stroke: "#c9cdd6" }}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="proyecto"
            width={140}
            tick={{ fontSize: 11.5, fill: "#182233", fontFamily: "IBM Plex Mono, monospace" }}
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
