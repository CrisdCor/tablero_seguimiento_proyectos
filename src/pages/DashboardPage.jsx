import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import SummaryGrid from "../components/SummaryGrid";
import Panel from "../components/Panel";
import OverdueTable from "../components/OverdueTable";
import TodayTable from "../components/TodayTable";
import UpcomingTable from "../components/UpcomingTable";
import ProjectsPanel from "../components/ProjectsPanel";
import DashboardFilterBar from "../components/DashboardFilterBar";
import { useDashboardData } from "../context/DataContext";
import { deriveTaskViews } from "../lib/transform";

export default function DashboardPage() {
  const { taskModel, projects, loading } = useDashboardData();
  const [searchParams, setSearchParams] = useSearchParams();

  const responsable = searchParams.get("responsable") || "";
  const proyecto = searchParams.get("proyecto") || "";

  const tasks = taskModel?.tasks || [];

  const responsables = useMemo(
    () => Array.from(new Set(tasks.map((t) => t.responsable).filter((r) => r && r !== "—"))).sort(),
    [tasks]
  );
  const proyectos = useMemo(
    () => Array.from(new Set(tasks.map((t) => t.proyecto))).sort(),
    [tasks]
  );

  const filteredTasks = useMemo(
    () =>
      tasks
        .filter((t) => !responsable || t.responsable === responsable)
        .filter((t) => !proyecto || t.proyecto === proyecto),
    [tasks, responsable, proyecto]
  );

  const views = useMemo(() => deriveTaskViews(filteredTasks), [filteredTasks]);

  const filteredProjects = useMemo(
    () => projects.filter((p) => !proyecto || p.proyecto === proyecto),
    [projects, proyecto]
  );

  const updateParams = (patch) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(patch).forEach(([key, value]) => {
      if (value) next.set(key, value);
      else next.delete(key);
    });
    setSearchParams(next);
  };

  const resetFilters = () => setSearchParams({});

  if (!taskModel && loading) {
    return <div className="loading-state">Cargando información…</div>;
  }
  if (!taskModel) return null;

  return (
    <>
      <DashboardFilterBar
        responsables={responsables}
        proyectos={proyectos}
        responsable={responsable}
        proyecto={proyecto}
        onChange={updateParams}
        onReset={resetFilters}
      />

      <SummaryGrid summary={views.summary} />

      <Panel title="Tareas vencidas" accent="var(--red)" count={views.vencidas.length}>
        <OverdueTable tasks={views.vencidas} />
      </Panel>

      <Panel title="Tareas de hoy" accent="var(--amber)" count={views.hoy.length}>
        <TodayTable tasks={views.hoy} />
      </Panel>

      <Panel title="Próximos días" accent="var(--blue)" count={views.proximos.length}>
        <UpcomingTable tasks={views.proximos} />
      </Panel>

      <Panel title="Estado de proyectos" accent="var(--green)" count={filteredProjects.length}>
        <ProjectsPanel projects={filteredProjects} />
      </Panel>
    </>
  );
}
