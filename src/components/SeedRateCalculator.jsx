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

  function handleSubmit(event) {
    event.preventDefault();
    const calculation = calculateSeedRate(values);

    if (!calculation.ok) {
      setErrors(calculation.errors);
      setResults(null);
      return;
    }

    setErrors({});
    setResults(calculation.data);
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
        <FormulaBox />
      </aside>
    </div>
  );
}

export default SeedRateCalculator;
