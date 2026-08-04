import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useDashboardData } from "../context/DataContext";
import { formatDateTime } from "../lib/dates";

export default function AppLayout() {
  const { lastUpdated, loading, error, reload } = useDashboardData();

  return (
    <div className="app-frame">
      <Sidebar />
      <div className="app-main">
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
              <button className="refresh-btn" onClick={reload} disabled={loading}>
                {loading ? "Actualizando…" : "Actualizar"}
              </button>
            </div>
          </header>

          {error && <div className="error-banner">{error}</div>}

          <Outlet />

          <footer className="app-footer">
            <span>Fuente: Google Sheets · 01_Seguimiento_de_Tareas</span>
            <span>Se actualiza automáticamente cada 5 minutos</span>
          </footer>
        </div>
      </div>
    </div>
  );
}
