import { useState } from 'react';
import FormField from './FormField.jsx';
import FormulaBox from './FormulaBox.jsx';
import ResultCard from './ResultCard.jsx';
import { calculateSprayRate, formatNumber } from '../utils/sprayCalculations.js';

const initialValues = {
  speedKmh: '',
  workingWidthM: '',
  totalFlowLMin: '',
  nozzleCount: '',
  targetVolumeLHa: '',
};

const exampleValues = {
  speedKmh: '6',
  workingWidthM: '12',
  totalFlowLMin: '24',
  nozzleCount: '24',
  targetVolumeLHa: '200',
};

const fields = [
  {
    name: 'speedKmh',
    label: 'Velocidad de avance',
    suffix: 'km/h',
    required: true,
    placeholder: '6',
  },
  {
    name: 'workingWidthM',
    label: 'Anchura de trabajo',
    suffix: 'm',
    required: true,
    placeholder: '12',
  },
  {
    name: 'totalFlowLMin',
    label: 'Caudal total',
    suffix: 'L/min',
    required: true,
    placeholder: '24',
  },
  {
    name: 'nozzleCount',
    label: 'Numero de boquillas',
    suffix: 'uds.',
    required: true,
    placeholder: '24',
  },
  {
    name: 'targetVolumeLHa',
    label: 'Volumen objetivo',
    suffix: 'L/ha',
    required: false,
    placeholder: '200',
  },
];

const formulas = [
  'Volumen aplicado L/ha = (600 x caudal total L/min) / (velocidad km/h x anchura m)',
  'Caudal por boquilla = caudal total / numero de boquillas',
  'Diferencia = volumen aplicado - volumen objetivo',
];

function SprayCalculator() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [results, setResults] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: '',
      general: '',
    }));
  }

  function runCalculation(nextValues) {
    const calculation = calculateSprayRate(nextValues);

    if (!calculation.ok) {
      setErrors(calculation.errors);
      setResults(null);
      return;
    }

    setErrors({});
    setResults(calculation.data);
  }

  function handleSubmit(event) {
    event.preventDefault();
    runCalculation(values);
  }

  function handleExample() {
    setValues(exampleValues);
    runCalculation(exampleValues);
  }

  function handleReset() {
    setValues(initialValues);
    setErrors({});
    setResults(null);
  }

  return (
    <div className="calculator-layout">
      <form className="seed-form" onSubmit={handleSubmit} noValidate>
        {errors.general ? <div className="form-alert">{errors.general}</div> : null}

        <div className="form-grid">
          {fields.map((field) => (
            <FormField
              error={errors[field.name]}
              field={field}
              key={field.name}
              onChange={handleChange}
              value={values[field.name]}
            />
          ))}
        </div>

        <div className="button-row">
          <button className="secondary-button" type="button" onClick={handleExample}>
            Cargar ejemplo
          </button>
          <button className="primary-button" type="submit">
            Calcular
          </button>
          <button className="secondary-button" type="button" onClick={handleReset}>
            Limpiar
          </button>
        </div>
      </form>

      <aside className="result-column">
        {!results ? (
          <section className="results-empty" aria-live="polite">
            Completa los campos obligatorios y pulsa Calcular para ver los
            resultados.
          </section>
        ) : (
          <section className="results-section" aria-live="polite">
            <h3>Resultados</h3>
            <div className="result-grid">
              <ResultCard
                label="Volumen aplicado"
                value={`${formatNumber(results.appliedVolumeLHa)} L/ha`}
                detail="Calculado con velocidad, anchura y caudal total."
                badge="Resultado recomendado"
                recommended
              />
              <ResultCard
                label="Caudal por boquilla"
                value={`${formatNumber(results.flowPerNozzleLMin)} L/min`}
                detail="Caudal total dividido entre boquillas."
              />
              {results.differenceLHa !== null ? (
                <ResultCard
                  label="Diferencia frente al objetivo"
                  value={`${formatNumber(results.differenceLHa)} L/ha`}
                  detail={`${formatNumber(results.differencePercent)} % respecto al objetivo.`}
                />
              ) : null}
              <ResultCard
                label="Interpretacion"
                value={results.interpretation}
                detail="Revisa la calibracion si se aleja del objetivo."
                textValue
              />
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
        )}

        <FormulaBox formulas={formulas} id="formula-pulverizacion" />
      </aside>
    </div>
  );
}

export default SprayCalculator;
