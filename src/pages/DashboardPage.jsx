import SummaryGrid from "../components/SummaryGrid";
import Panel from "../components/Panel";
import OverdueTable from "../components/OverdueTable";
import TodayTable from "../components/TodayTable";
import UpcomingTable from "../components/UpcomingTable";
import ProjectsPanel from "../components/ProjectsPanel";
import { useDashboardData } from "../context/DataContext";

export default function DashboardPage() {
  const { taskModel, projects, loading } = useDashboardData();

  if (!taskModel && loading) {
    return <div className="loading-state">Cargando información…</div>;
  }
  if (!taskModel) return null;

  return (
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
  );
}
