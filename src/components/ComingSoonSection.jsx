function ComingSoonSection({ calculators }) {
  return (
    <section className="content-section" id="proximamente" aria-labelledby="coming-soon-title">
      <div className="section-heading">
        <p className="eyebrow">Proximamente</p>
        <h2 id="coming-soon-title">Mas calculadoras en camino</h2>
      </div>
      <div className="coming-grid">
        {calculators.map((calculator) => (
          <article className="coming-card" key={calculator.id}>
            <span>{calculator.title}</span>
            <small>{calculator.description || 'Disponible en proximas versiones.'}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ComingSoonSection;
