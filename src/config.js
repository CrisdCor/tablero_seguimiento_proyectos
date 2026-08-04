// Las hojas están publicadas en la web como CSV (Archivo → Compartir → Publicar
// en la web). Se pueden sobrescribir con variables de entorno de Vite
// (VITE_TASKS_CSV_URL / VITE_PROJECTS_CSV_URL) si el enlace cambia, sin tocar
// el código.
export const TASKS_CSV_URL =
  import.meta.env.VITE_TASKS_CSV_URL ||
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRHUT-vFCozKVPj3kwDhh6eoKjamq4WotXJQPhDT-ZsTX3x6Pm9kSi_ievfra6xU1ST3h8nSiBwcz8a/pub?gid=0&single=true&output=csv";

export const PROJECTS_CSV_URL =
  import.meta.env.VITE_PROJECTS_CSV_URL ||
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRHUT-vFCozKVPj3kwDhh6eoKjamq4WotXJQPhDT-ZsTX3x6Pm9kSi_ievfra6xU1ST3h8nSiBwcz8a/pub?gid=568998207&single=true&output=csv";

// Ventana en días para considerar una tarea "próxima a vencer".
export const UPCOMING_WINDOW_DAYS = 7;

// Intervalo de auto-actualización (ms).
export const AUTO_REFRESH_MS = 5 * 60 * 1000;
