import { NavLink } from "react-router-dom";

function IconResumen() {
  return (
    <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function IconEquipo() {
  return (
    <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconDetalle() {
  return (
    <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  );
}

const links = [
  { to: "/", label: "Resumen", hint: "Vencidas · hoy · próximos", accent: "var(--blue)", icon: <IconResumen /> },
  { to: "/equipo", label: "Equipo", hint: "Métricas por persona", accent: "var(--green)", icon: <IconEquipo /> },
  { to: "/detalle", label: "Detalle", hint: "Tareas filtrables", accent: "var(--amber)", icon: <IconDetalle /> },
];

export default function Sidebar() {
  return (
    <nav className="sidebar" aria-label="Navegación del tablero">
      <div className="sidebar-brand">
        <span className="dot" />
        <span>Tablero</span>
      </div>
      <div className="sidebar-links">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/"}
            className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
            style={{ "--link-accent": link.accent }}
          >
            {link.icon}
            <span className="nav-link-text">
              <span className="nav-link-label">{link.label}</span>
              <span className="nav-link-hint">{link.hint}</span>
            </span>
          </NavLink>
        ))}
      </div>
      <div className="sidebar-footer">
        <span>01_Seguimiento_de_Tareas</span>
      </div>
    </nav>
  );
}
