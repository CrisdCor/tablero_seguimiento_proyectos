import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Panel from "../components/Panel";
import TaskFilterBar from "../components/TaskFilterBar";
import AllTasksTable from "../components/AllTasksTable";
import { useDashboardData } from "../context/DataContext";

export default function DetailPage() {
  const { taskModel, loading } = useDashboardData();
  const [searchParams, setSearchParams] = useSearchParams();

  const responsable = searchParams.get("responsable") || "";
  const estado = searchParams.get("estado") || "";
  const proyecto = searchParams.get("proyecto") || "";
  const vista = searchParams.get("vista") || "";

  const tasks = taskModel?.tasks || [];

  const responsables = useMemo(
    () => Array.from(new Set(tasks.map((t) => t.responsable).filter((r) => r && r !== "—"))).sort(),
    [tasks]
  );
  const proyectos = useMemo(
    () => Array.from(new Set(tasks.map((t) => t.proyecto))).sort(),
    [tasks]
  );

  const filtered = useMemo(() => {
    return tasks
      .filter((t) => !responsable || t.responsable === responsable)
      .filter((t) => !estado || t.estado === estado)
      .filter((t) => !proyecto || t.proyecto === proyecto)
      .filter((t) => {
        if (!vista) return true;
        if (vista === "vencidas") return !t.closed && t.diasRestantes !== null && t.diasRestantes < 0;
        if (vista === "hoy") return !t.closed && t.diasRestantes === 0;
        if (vista === "proximos")
          return !t.closed && t.diasRestantes !== null && t.diasRestantes > 0 && t.diasRestantes <= 7;
        if (vista === "finalizadas") return t.finalized;
        return true;
      })
      .sort((a, b) => {
        if (a.diasRestantes === null) return 1;
        if (b.diasRestantes === null) return -1;
        return a.diasRestantes - b.diasRestantes;
      });
  }, [tasks, responsable, estado, proyecto, vista]);

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
    <Panel title="Detalle de tareas" accent="var(--blue)" count={filtered.length}>
      <TaskFilterBar
        responsables={responsables}
        proyectos={proyectos}
        responsable={responsable}
        estado={estado}
        proyecto={proyecto}
        vista={vista}
        onChange={updateParams}
        onReset={resetFilters}
        count={filtered.length}
        total={tasks.length}
      />
      <AllTasksTable tasks={filtered} />
    </Panel>
  );
}
