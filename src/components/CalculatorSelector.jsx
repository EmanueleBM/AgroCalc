function CalculatorSelector({ calculators }) {
  return (
    <section className="selector-section" id="calculadoras" aria-labelledby="selector-title">
      <div className="section-heading">
        <p className="eyebrow">Calculadoras</p>
        <h2 id="selector-title">Elige una calculadora</h2>
        <p>
          Empieza con las herramientas disponibles o revisa que modulos estan
          previstos para proximas versiones.
        </p>
      </div>

      <div className="selector-grid">
        {calculators.map((calculator) => {
          const isAvailable = calculator.status === 'available';
          const href =
            calculator.id === 'seed-rate'
              ? '#siembra'
              : calculator.id === 'spraying'
                ? '#pulverizacion'
                : '#proximamente';

          return (
            <a
              className={
                isAvailable
                  ? 'selector-card'
                  : 'selector-card selector-card-disabled'
              }
              href={href}
              key={calculator.id}
            >
              <span>{isAvailable ? 'Disponible' : 'Proximamente'}</span>
              <strong>{calculator.title.replace('Calculadora de ', '')}</strong>
              <small>
                {calculator.description || 'Modulo previsto para proximas versiones.'}
              </small>
            </a>
          );
        })}
      </div>
    </section>
  );
}

export default CalculatorSelector;
