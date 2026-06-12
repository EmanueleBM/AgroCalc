import { formatCurrency, formatNumber } from '../utils/seedCalculations.js';
import ResultCard from './ResultCard.jsx';

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
        <ResultCard
          label="Semilla total necesaria"
          value={`${formatNumber(results.totalSeedKg)} kg`}
          detail="Calculada con la dosis corregida."
        />
        <ResultCard
          label="Dosis corregida"
          value={`${formatNumber(results.correctedDoseKgHa)} kg/ha`}
          detail={`Factor de correccion: ${formatNumber(results.correctionFactor)}`}
        />
        {results.totalCost !== null ? (
          <ResultCard
            label="Coste total estimado"
            value={formatCurrency(results.totalCost)}
            detail={`${formatCurrency(results.seedPricePerKg)} por kg`}
          />
        ) : null}
        {results.targetSeedsPerSquareMeter !== null ? (
          <ResultCard
            label="Semillas objetivo estimadas"
            value={`${formatNumber(results.targetSeedsPerSquareMeter)} semillas/m2`}
            detail="Antes de aplicar la correccion comercial."
          />
        ) : null}
        {results.correctedSeedsPerSquareMeter !== null ? (
          <ResultCard
            label="Semillas comerciales estimadas"
            value={`${formatNumber(results.correctedSeedsPerSquareMeter)} semillas/m2`}
            detail="Equivalente a la dosis corregida."
          />
        ) : null}
        {results.targetSeedsPerLinearMeter !== null ? (
          <ResultCard
            label="Semillas objetivo por metro"
            value={`${formatNumber(results.targetSeedsPerLinearMeter)} semillas/m`}
            detail="Semillas objetivo/m2 x separacion en metros."
          />
        ) : null}
        {results.correctedSeedsPerLinearMeter !== null ? (
          <ResultCard
            label="Semillas comerciales por metro"
            value={`${formatNumber(results.correctedSeedsPerLinearMeter)} semillas/m`}
            detail="Cifra recomendada para regular la sembradora."
            badge="Resultado recomendado"
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
