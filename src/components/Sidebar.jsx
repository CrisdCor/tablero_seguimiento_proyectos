import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Resumen", hint: "Vencidas · hoy · próximos", accent: "var(--blue)" },
  { to: "/equipo", label: "Equipo", hint: "Métricas por persona", accent: "var(--green)" },
  { to: "/detalle", label: "Detalle", hint: "Tareas filtrables", accent: "var(--amber)" },
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
            <span className="nav-link-marker" />
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
