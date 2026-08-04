// Parseo robusto de fechas provenientes del CSV publicado de Google Sheets.
// Soporta DD/MM/YYYY (formato es-CO, el más común en estas hojas), YYYY-MM-DD
// y cualquier formato que Date() pueda interpretar de forma nativa.
export function parseSheetDate(raw) {
  if (!raw) return null;
  const value = String(raw).trim();
  if (!value) return null;

  // YYYY-MM-DD o YYYY/MM/DD
  let match = value.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})/);
  if (match) {
    const [, y, m, d] = match;
    return new Date(Number(y), Number(m) - 1, Number(d));
  }

  // DD/MM/YYYY o DD-MM-YYYY
  match = value.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})/);
  if (match) {
    const [, d, m, y] = match;
    return new Date(Number(y), Number(m) - 1, Number(d));
  }

  const fallback = new Date(value);
  return isNaN(fallback.getTime()) ? null : fallback;
}

export function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function daysBetween(from, to) {
  const MS_DAY = 1000 * 60 * 60 * 24;
  return Math.round((startOfDay(to).getTime() - startOfDay(from).getTime()) / MS_DAY);
}

export function formatDate(date) {
  if (!date) return "—";
  return new Intl.DateTimeFormat("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function formatDateTime(date) {
  if (!date) return "—";
  return new Intl.DateTimeFormat("es-CO", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
