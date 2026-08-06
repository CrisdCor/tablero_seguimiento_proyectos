import { useEffect, useRef, useState } from "react";

export default function MultiSelect({ options, selected, onChange, placeholder = "Todos" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    function onKeyDown(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const toggleValue = (value) => {
    if (selected.includes(value)) onChange(selected.filter((v) => v !== value));
    else onChange([...selected, value]);
  };

  const buttonLabel =
    selected.length === 0
      ? placeholder
      : selected.length === 1
      ? selected[0]
      : `${selected.length} seleccionados`;

  return (
    <div className="multiselect" ref={ref}>
      <button
        type="button"
        className={`multiselect-button${selected.length > 0 ? " has-value" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="multiselect-button-text">{buttonLabel}</span>
        <svg
          className="multiselect-chevron"
          viewBox="0 0 24 24"
          width="14"
          height="14"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div className="multiselect-panel">
          {options.length > 0 && (
            <div className="multiselect-actions">
              <button type="button" className="multiselect-action-btn" onClick={() => onChange(options)}>
                Seleccionar todos
              </button>
              <button type="button" className="multiselect-action-btn" onClick={() => onChange([])}>
                Limpiar
              </button>
            </div>
          )}
          {options.length === 0 && <div className="multiselect-empty">Sin opciones</div>}
          {options.map((opt) => (
            <label key={opt} className="multiselect-option">
              <input type="checkbox" checked={selected.includes(opt)} onChange={() => toggleValue(opt)} />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
