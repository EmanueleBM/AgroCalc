function Hero() {
  return (
    <section className="hero-section" id="inicio" aria-labelledby="home-title">
      <div className="hero-copy">
        <p className="eyebrow">AgroCalc v0.2</p>
        <h1 id="home-title">AgroCalc</h1>
        <p className="hero-lead">
          Calculadoras agroambientales para estudiantes, tecnicos y
          profesionales del sector agrario.
        </p>
        <p className="hero-description">
          Resuelve calculos de siembra, pulverizacion, costes, erosion y
          produccion animal de forma clara, rapida y explicada paso a paso.
        </p>
        <a className="hero-button" href="#calculadoras">
          Empezar ahora
        </a>
      </div>

      <div className="hero-panel" aria-label="Resumen de AgroCalc">
        <strong>2 calculadoras disponibles</strong>
        <p>Siembra y pulverizacion listas para usar, con resultados explicados.</p>
        <dl>
          <div>
            <dt>Sin registro</dt>
            <dd>Uso directo desde web o movil.</dd>
          </div>
          <div>
            <dt>Paso a paso</dt>
            <dd>Formulas y explicacion en cada calculo.</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

export default Hero;
