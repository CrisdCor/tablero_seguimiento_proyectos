import { useCallback, useEffect, useState } from "react";
import SummaryGrid from "./components/SummaryGrid";
import Panel from "./components/Panel";
import OverdueTable from "./components/OverdueTable";
import TodayTable from "./components/TodayTable";
import UpcomingTable from "./components/UpcomingTable";
import ProjectsPanel from "./components/ProjectsPanel";
import { fetchSheetAsObjects } from "./lib/sheets";
import { buildTaskModel, buildProjectModel } from "./lib/transform";
import { formatDateTime } from "./lib/dates";
import { TASKS_CSV_URL, PROJECTS_CSV_URL, AUTO_REFRESH_MS } from "./config";

export default function App() {
  const [taskModel, setTaskModel] = useState(null);
  const [projects, setProjects] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [rawTasks, rawProjects] = await Promise.all([
        fetchSheetAsObjects(TASKS_CSV_URL),
        fetchSheetAsObjects(PROJECTS_CSV_URL),
      ]);
      setTaskModel(buildTaskModel(rawTasks));
      setProjects(buildProjectModel(rawProjects));
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError(
        "No se pudo cargar la información desde Google Sheets. Verifica que la hoja siga publicada en la web. " +
          (err?.message || "")
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const interval = setInterval(load, AUTO_REFRESH_MS);
    return () => clearInterval(interval);
  }, [load]);

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1 className="app-title">
            <span className="dot" />
            Tablero de Seguimiento
          </h1>
          <p className="app-subtitle">Proyectos y tareas del equipo · datos en vivo</p>
        </div>
        <div className="header-status">
          <span className="badge-live">
            <span className="pulse" />
            {lastUpdated ? `Actualizado ${formatDateTime(lastUpdated)}` : "Cargando…"}
          </span>
          <button className="refresh-btn" onClick={load} disabled={loading}>
            {loading ? "Actualizando…" : "Actualizar"}
          </button>
        </div>
      </header>

      {error && <div className="error-banner">{error}</div>}

      {!taskModel && loading && <div className="loading-state">Cargando información…</div>}

      {taskModel && (
        <>
          <SummaryGrid summary={taskModel.summary} />

          <Panel title="Tareas vencidas" accent="var(--red)" count={taskModel.vencidas.length}>
            <OverdueTable tasks={taskModel.vencidas} />
          </Panel>

          <Panel title="Tareas de hoy" accent="var(--amber)" count={taskModel.hoy.length}>
            <TodayTable tasks={taskModel.hoy} />
          </Panel>

          <Panel title="Próximos días" accent="var(--blue)" count={taskModel.proximos.length}>
            <UpcomingTable tasks={taskModel.proximos} />
          </Panel>

          <Panel title="Estado de proyectos" accent="var(--green)" count={projects.length}>
            <ProjectsPanel projects={projects} />
          </Panel>
        </>
      )}

      <footer className="app-footer">
        <span>Fuente: Google Sheets · 01_Seguimiento_de_Tareas</span>
        <span>Se actualiza automáticamente cada 5 minutos</span>
      </footer>
    </div>
  );
}
