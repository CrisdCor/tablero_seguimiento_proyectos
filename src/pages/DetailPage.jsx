import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Panel from "../components/Panel";
import TaskFilterBar from "../components/TaskFilterBar";
import AllTasksTable from "../components/AllTasksTable";
import { useDashboardData } from "../context/DataContext";

function parseList(searchParams, key) {
  const raw = searchParams.get(key);
  return raw ? raw.split(",").filter(Boolean) : [];
}

export default function DetailPage() {
  const { taskModel, projects, loading } = useDashboardData();
  const [searchParams, setSearchParams] = useSearchParams();

  const lider = parseList(searchParams, "lider");
  const estadoProyecto = parseList(searchParams, "estadoProyecto");
  const proyecto = parseList(searchParams, "proyecto");
  const estado = parseList(searchParams, "estado");
  const vista = searchParams.get("vista") || "";

  const tasks = taskModel?.tasks || [];

  const projectStatusMap = useMemo(() => {
    const map = new Map();
    projects.forEach((p) => map.set(p.proyecto, p.estadoGenerado));
    return map;
  }, [projects]);

  const projectLiderMap = useMemo(() => {
    const map = new Map();
    projects.forEach((p) => map.set(p.proyecto, p.lider));
    return map;
  }, [projects]);

  const lideres = useMemo(
    () => Array.from(new Set(projects.map((p) => p.lider).filter(Boolean))).sort(),
    [projects]
  );
  const proyectos = useMemo(
    () => Array.from(new Set(tasks.map((t) => t.proyecto))).sort(),
    [tasks]
  );

  const filtered = useMemo(() => {
    return tasks
      .filter((t) => lider.length === 0 || lider.includes(projectLiderMap.get(t.proyecto)))
      .filter((t) => estadoProyecto.length === 0 || estadoProyecto.includes(projectStatusMap.get(t.proyecto)))
      .filter((t) => proyecto.length === 0 || proyecto.includes(t.proyecto))
      .filter((t) => estado.length === 0 || estado.includes(t.estado))
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
  }, [tasks, lider, estadoProyecto, proyecto, estado, vista, projectLiderMap, projectStatusMap]);

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
    <Panel title="Detalle de tareas" accent="var(--blue)" count={filtered.length}>
      <TaskFilterBar
        lideres={lideres}
        proyectos={proyectos}
        lider={lider}
        estadoProyecto={estadoProyecto}
        proyecto={proyecto}
        estado={estado}
        vista={vista}
        onChange={updateParams}
        onReset={resetFilters}
        count={filtered.length}
        total={tasks.length}
      />
      <AllTasksTable tasks={filtered} projectStatusMap={projectStatusMap} />
    </Panel>
  );
}
