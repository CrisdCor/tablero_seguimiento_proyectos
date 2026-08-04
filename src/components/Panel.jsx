export default function Panel({ title, accent, count, children }) {
  return (
    <section className="panel" style={{ "--panel-accent": accent }}>
      <header className="panel-header">
        <span className="icon" />
        <h2>{title}</h2>
        {typeof count === "number" && <span className="count-pill">{count}</span>}
      </header>
      {children}
    </section>
  );
}
