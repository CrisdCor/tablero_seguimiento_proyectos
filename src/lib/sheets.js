import Papa from "papaparse";

// Evita que Google Sheets sirva una respuesta cacheada por el navegador.
function withCacheBuster(url) {
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}_ts=${Date.now()}`;
}

export async function fetchSheetAsObjects(url) {
  const response = await fetch(withCacheBuster(url), { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`No se pudo leer la hoja (HTTP ${response.status})`);
  }
  const text = await response.text();
  const { data } = Papa.parse(text, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim(),
  });
  // Descarta filas completamente vacías (celda "Proyecto"/"Tarea" en blanco)
  return data.filter((row) =>
    Object.values(row).some((v) => String(v ?? "").trim() !== "")
  );
}

export function normalize(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
