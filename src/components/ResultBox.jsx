import { formatCurrency, formatNumber } from '../utils/seedCalculations.js';

function ResultItem({ label, value, detail, recommended = false }) {
  return (
    <div className={recommended ? 'result-item result-item-recommended' : 'result-item'}>
      <span>{label}</span>
      <strong>{value}</strong>
      {recommended ? <mark>Recomendada para regular la sembradora</mark> : null}
      {detail ? <small>{detail}</small> : null}
    </div>
  );
}

function ResultBox({ results }) {
  if (!results) {
    return (
      <section className="results-empty" aria-live="polite">
        Completa los campos obligatorios y pulsa Calcular para ver los
        resultados.
      </section>
    );
  }

  return (
    <section className="results-section" aria-live="polite">
      <h3>Resultados</h3>
      <div className="result-grid">
        <ResultItem
          label="Semilla total necesaria"
          value={`${formatNumber(results.totalSeedKg)} kg`}
          detail="Calculada con la dosis corregida."
        />
        <ResultItem
          label="Dosis corregida"
          value={`${formatNumber(results.correctedDoseKgHa)} kg/ha`}
          detail={`Factor de correccion: ${formatNumber(results.correctionFactor)}`}
        />
        {results.totalCost !== null ? (
          <ResultItem
            label="Coste total estimado"
            value={formatCurrency(results.totalCost)}
            detail={`${formatCurrency(results.seedPricePerKg)} por kg`}
          />
        ) : null}
        {results.targetSeedsPerSquareMeter !== null ? (
          <ResultItem
            label="Semillas objetivo estimadas"
            value={`${formatNumber(results.targetSeedsPerSquareMeter)} semillas/m2`}
            detail="Antes de aplicar la correccion comercial."
          />
        ) : null}
        {results.correctedSeedsPerSquareMeter !== null ? (
          <ResultItem
            label="Semillas comerciales estimadas"
            value={`${formatNumber(results.correctedSeedsPerSquareMeter)} semillas/m2`}
            detail="Equivalente a la dosis corregida."
          />
        ) : null}
        {results.targetSeedsPerLinearMeter !== null ? (
          <ResultItem
            label="Semillas objetivo por metro"
            value={`${formatNumber(results.targetSeedsPerLinearMeter)} semillas/m`}
            detail="Semillas objetivo/m2 x separacion en metros."
          />
        ) : null}
        {results.correctedSeedsPerLinearMeter !== null ? (
          <ResultItem
            label="Semillas comerciales por metro"
            value={`${formatNumber(results.correctedSeedsPerLinearMeter)} semillas/m`}
            detail="Semillas comerciales/m2 x separacion en metros."
            recommended
          />
        ) : null}
      </div>

      <div className="steps-panel">
        <h3>Explicacion paso a paso</h3>
        <ol>
          {results.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default ResultBox;
