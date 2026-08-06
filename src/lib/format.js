import { normalize } from "./sheets";

export function priorityChipClass(prioridad) {
  const p = normalize(prioridad);
  if (p.startsWith("alta") || p.startsWith("urgente") || p.startsWith("critic")) return "chip-red";
  if (p.startsWith("media")) return "chip-amber";
  if (p.startsWith("baja")) return "chip-blue";
  return "chip-neutral";
}

export function statusChipClass(estado) {
  const e = normalize(estado);
  if (e.startsWith("finaliz") || e.startsWith("complet")) return "chip-green";
  if (e.startsWith("bloque")) return "chip-red";
  if (e.startsWith("en espera") || e.startsWith("pendiente")) return "chip-amber";
  if (e.startsWith("en proceso")) return "chip-blue";
  if (e.startsWith("cancel")) return "chip-neutral";
  return "chip-neutral";
}

export function parsePercent(raw) {
  if (raw === null || raw === undefined || raw === "") return 0;
  const cleaned = String(raw).replace("%", "").replace(",", ".").trim();
  const num = parseFloat(cleaned);
  if (isNaN(num)) return 0;
  return num <= 1 ? Math.round(num * 100) : Math.round(num);
}

export function projectStatusChipClass(estado) {
  if (estado === "Atención") return "chip-red";
  if (estado === "Finalizado") return "chip-green";
  return "chip-blue";
}
