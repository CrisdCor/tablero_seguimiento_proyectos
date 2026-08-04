# Tablero de Seguimiento de Proyectos

Dashboard de seguimiento de tareas y proyectos del equipo, alimentado en vivo
desde una hoja de Google Sheets ("01_Seguimiento_de_Tareas") publicada en la web.

## Stack
- Vite + React
- PapaParse (lectura de CSV publicado de Google Sheets)
- Sin backend: el fetch se hace directamente desde el navegador al CSV publicado

## Cómo funciona la actualización en vivo
1. La hoja de Google Sheets debe estar **publicada en la web** como CSV
   (Archivo → Compartir → Publicar en la web → pestaña específica → CSV).
2. La app hace `fetch` a esos dos enlaces (Tareas y Proyectos) al cargar y
   cada 5 minutos (ver `src/config.js`), y también con el botón "Actualizar".
3. Como Google Sheets sirve el CSV publicado sin autenticación, cualquier
   cambio guardado en la hoja se refleja en el sitio sin volver a desplegar.

## Configuración
Los enlaces del CSV publicado están en `src/config.js`. Se pueden
sobrescribir con variables de entorno (ver `.env.example`) sin tocar código,
tanto localmente como en las variables de entorno del proyecto en Vercel.

## Desarrollo local
```bash
npm install
npm run dev
```

## Build de producción
```bash
npm run build
```
