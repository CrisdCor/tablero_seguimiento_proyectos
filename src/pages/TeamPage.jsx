import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Panel from "../components/Panel";
import PersonList from "../components/PersonList";
import KpiRow from "../components/KpiRow";
import DeadlineCallout from "../components/DeadlineCallout";
import LedProjects from "../components/LedProjects";
import WorkloadChart from "../components/WorkloadChart";
import PersonTasksTable from "../components/PersonTasksTable";
import { useDashboardData } from "../context/DataContext";

export default function TeamPage() {
  const { people, loading } = useDashboardData();
  const [searchParams, setSearchParams] = useSearchParams();
  const selected = searchParams.get("p");

  const person = useMemo(() => people.find((p) => p.nombre === selected), [people, selected]);

  useEffect(() => {
    if (!selected && people.length > 0) {
      setSearchParams({ p: people[0].nombre }, { replace: true });
    }
  }, [selected, people, setSearchParams]);

  if (people.length === 0 && loading) {
    return <div className="loading-state">Cargando información…</div>;
  }

  return (
    <div className="team-layout">
      <Panel title="Colaboradores" accent="var(--neutral)" count={people.length}>
        <PersonList
          people={people}
          selected={person?.nombre}
          onSelect={(nombre) => setSearchParams({ p: nombre })}
        />
      </Panel>

      <div className="team-detail">
        {!person && <div className="empty-state">Selecciona un colaborador para ver sus métricas.</div>}

        {person && (
          <>
            <Panel title={person.nombre} accent="var(--blue)">
              <div className="person-detail-body">
                <div className="person-role-row">
                  {person.roles.length === 0 && <span className="chip chip-neutral">Sin rol asignado</span>}
                  {person.roles.map((r) => (
                    <span key={r} className="chip chip-blue">
                      {r}
                    </span>
                  ))}
                </div>
                <KpiRow kpis={person.kpis} />
                <DeadlineCallout task={person.nextDeadline} />
              </div>
            </Panel>

            {person.roles.includes("Líder de proyecto") && (
              <Panel
                title="Proyectos liderados"
                accent="var(--green)"
                count={person.proyectosLiderados.length}
              >
                <LedProjects projects={person.proyectosLiderados} />
              </Panel>
            )}

            <Panel title="Carga de tareas por proyecto" accent="var(--blue)">
              <div style={{ padding: "16px" }}>
                <WorkloadChart byProject={person.byProject} />
              </div>
            </Panel>

            <Panel title="Tareas asignadas" accent="var(--neutral)" count={person.tasksAsResponsable.length}>
              <PersonTasksTable tasks={person.tasksAsResponsable} />
            </Panel>
          </>
        )}
      </div>
    </div>
  );
}
