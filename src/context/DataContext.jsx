import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { fetchSheetAsObjects } from "../lib/sheets";
import { buildTaskModel, buildProjectModel } from "../lib/transform";
import { buildPeopleModel } from "../lib/people";
import { TASKS_CSV_URL, PROJECTS_CSV_URL, AUTO_REFRESH_MS } from "../config";

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [taskModel, setTaskModel] = useState(null);
  const [projects, setProjects] = useState([]);
  const [people, setPeople] = useState([]);
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
      const nextTaskModel = buildTaskModel(rawTasks);
      const nextProjects = buildProjectModel(rawProjects);
      setTaskModel(nextTaskModel);
      setProjects(nextProjects);
      setPeople(buildPeopleModel(nextTaskModel.tasks, nextProjects));
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
    <DataContext.Provider
      value={{ taskModel, projects, people, lastUpdated, loading, error, reload: load }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useDashboardData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useDashboardData debe usarse dentro de DataProvider");
  return ctx;
}
