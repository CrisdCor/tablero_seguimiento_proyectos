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

function parseList(searchParams, key) {
  const raw = searchParams.get(key);
  return raw ? raw.split(",").filter(Boolean) : [];
}

export default function DashboardPage() {
  const { taskModel, projects, loading } = useDashboardData();
  const [searchParams, setSearchParams] = useSearchParams();

  const responsable = parseList(searchParams, "responsable");
  const lider = parseList(searchParams, "lider");
  const proyecto = parseList(searchParams, "proyecto");

  const tasks = taskModel?.tasks || [];

  const responsables = useMemo(
    () => Array.from(new Set(tasks.map((t) => t.responsable).filter((r) => r && r !== "—"))).sort(),
    [tasks]
  );
  const lideres = useMemo(
    () => Array.from(new Set(projects.map((p) => p.lider).filter(Boolean))).sort(),
    [projects]
  );
  const proyectos = useMemo(
    () => Array.from(new Set(tasks.map((t) => t.proyecto))).sort(),
    [tasks]
  );

  const projectLiderMap = useMemo(() => {
    const map = new Map();
    projects.forEach((p) => map.set(p.proyecto, p.lider));
    return map;
  }, [projects]);

  const filteredTasks = useMemo(
    () =>
      tasks
        .filter((t) => responsable.length === 0 || responsable.includes(t.responsable))
        .filter((t) => proyecto.length === 0 || proyecto.includes(t.proyecto))
        .filter((t) => lider.length === 0 || lider.includes(projectLiderMap.get(t.proyecto))),
    [tasks, responsable, proyecto, lider, projectLiderMap]
  );

  const views = useMemo(() => deriveTaskViews(filteredTasks), [filteredTasks]);

  const filteredProjects = useMemo(
    () =>
      projects
        .filter((p) => proyecto.length === 0 || proyecto.includes(p.proyecto))
        .filter((p) => lider.length === 0 || lider.includes(p.lider)),
    [projects, proyecto, lider]
  );

  const updateParams = (patch) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(patch).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.length > 0) next.set(key, value.join(","));
        else next.delete(key);
      } else if (value) {
        next.set(key, value);
      } else {
        next.delete(key);
      }
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
        lideres={lideres}
        proyectos={proyectos}
        responsable={responsable}
        lider={lider}
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
