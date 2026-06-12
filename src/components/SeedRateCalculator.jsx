import { useState } from 'react';
import FormField from './FormField.jsx';
import FormulaBox from './FormulaBox.jsx';
import ResultBox from './ResultBox.jsx';
import { calculateSeedRate } from '../utils/seedCalculations.js';

const initialValues = {
  areaHa: '',
  targetDoseKgHa: '',
  thousandSeedWeightG: '',
  purityPercent: '',
  germinationPercent: '',
  rowSpacingCm: '',
  seedPricePerKg: '',
};

const exampleValues = {
  areaHa: '2.5',
  targetDoseKgHa: '180',
  thousandSeedWeightG: '42',
  purityPercent: '98',
  germinationPercent: '92',
  rowSpacingCm: '15',
  seedPricePerKg: '0.85',
};

const fields = [
  {
    name: 'areaHa',
    label: 'Superficie',
    suffix: 'ha',
    required: true,
    placeholder: '2.5',
  },
  {
    name: 'targetDoseKgHa',
    label: 'Dosis objetivo',
    suffix: 'kg/ha',
    required: true,
    placeholder: '180',
  },
  {
    name: 'thousandSeedWeightG',
    label: 'Peso de mil semillas',
    suffix: 'g',
    required: false,
    placeholder: '42',
  },
  {
    name: 'purityPercent',
    label: 'Pureza',
    suffix: '%',
    required: true,
    placeholder: '98',
  },
  {
    name: 'germinationPercent',
    label: 'Poder germinativo',
    suffix: '%',
    required: true,
    placeholder: '92',
  },
  {
    name: 'rowSpacingCm',
    label: 'Separacion entre lineas',
    suffix: 'cm',
    required: false,
    placeholder: '15',
  },
  {
    name: 'seedPricePerKg',
    label: 'Precio de semilla',
    suffix: 'EUR/kg',
    required: false,
    placeholder: '0.85',
  },
];

const formulas = [
  'Dosis corregida = dosis objetivo / ((pureza / 100) x (germinacion / 100))',
  'Kg totales = superficie x dosis corregida',
  'Coste total = kg totales x precio por kg',
  'Semillas objetivo/m2 = dosis objetivo kg/ha x 100 / PMS en gramos',
  'Semillas comerciales/m2 = dosis corregida kg/ha x 100 / PMS en gramos',
  'Semillas/m lineal = semillas/m2 x separacion entre lineas en metros',
];

function SeedRateCalculator() {
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
    const calculation = calculateSeedRate(nextValues);

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
        <ResultBox results={results} />
        <FormulaBox formulas={formulas} id="formulas" />
      </aside>
    </div>
  );
}

export default SeedRateCalculator;
