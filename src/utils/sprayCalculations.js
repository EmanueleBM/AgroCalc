const REQUIRED_FIELDS = {
  speedKmh: 'Introduce la velocidad de avance.',
  workingWidthM: 'Introduce la anchura de trabajo.',
  totalFlowLMin: 'Introduce el caudal total.',
  nozzleCount: 'Introduce el numero de boquillas.',
};

const FIELD_LABELS = {
  speedKmh: 'La velocidad',
  workingWidthM: 'La anchura de trabajo',
  totalFlowLMin: 'El caudal total',
  nozzleCount: 'El numero de boquillas',
  targetVolumeLHa: 'El volumen objetivo',
};

function parseOptionalNumber(value) {
  if (value === '' || value === null || value === undefined) {
    return null;
  }

  const number = Number(String(value).replace(',', '.'));
  return Number.isFinite(number) ? number : NaN;
}

function validateValues(rawValues) {
  const errors = {};
  const parsedValues = {};

  Object.entries(rawValues).forEach(([field, value]) => {
    const parsedValue = parseOptionalNumber(value);
    parsedValues[field] = parsedValue;

    if (REQUIRED_FIELDS[field] && parsedValue === null) {
      errors[field] = REQUIRED_FIELDS[field];
      return;
    }

    if (parsedValue !== null && Number.isNaN(parsedValue)) {
      errors[field] = `${FIELD_LABELS[field]} debe ser un numero valido.`;
      return;
    }

    if (parsedValue !== null && parsedValue <= 0) {
      errors[field] = `${FIELD_LABELS[field]} debe ser mayor que cero.`;
    }
  });

  if (
    parsedValues.nozzleCount !== null &&
    !Number.isInteger(parsedValues.nozzleCount)
  ) {
    errors.nozzleCount = 'El numero de boquillas debe ser un entero.';
  }

  return { errors, parsedValues };
}

function buildInterpretation(appliedVolumeLHa, targetVolumeLHa) {
  if (targetVolumeLHa === null) {
    return 'Usa este valor para comparar con la recomendacion tecnica del tratamiento.';
  }

  const difference = appliedVolumeLHa - targetVolumeLHa;
  const differencePercent = (difference / targetVolumeLHa) * 100;

  if (Math.abs(differencePercent) <= 5) {
    return 'El volumen aplicado esta muy cerca del objetivo.';
  }

  if (difference > 0) {
    return 'El volumen aplicado supera el objetivo; revisa caudal, velocidad o anchura antes de tratar.';
  }

  return 'El volumen aplicado queda por debajo del objetivo; revisa caudal, velocidad o anchura antes de tratar.';
}

export function calculateSprayRate(rawValues) {
  const { errors, parsedValues } = validateValues(rawValues);

  if (Object.keys(errors).length > 0) {
    return {
      ok: false,
      errors: {
        ...errors,
        general: 'Revisa los campos marcados antes de calcular.',
      },
    };
  }

  const {
    speedKmh,
    workingWidthM,
    totalFlowLMin,
    nozzleCount,
    targetVolumeLHa,
  } = parsedValues;

  const appliedVolumeLHa =
    (600 * totalFlowLMin) / (speedKmh * workingWidthM);
  const flowPerNozzleLMin = totalFlowLMin / nozzleCount;
  const differenceLHa =
    targetVolumeLHa === null ? null : appliedVolumeLHa - targetVolumeLHa;
  const differencePercent =
    targetVolumeLHa === null ? null : (differenceLHa / targetVolumeLHa) * 100;
  const interpretation = buildInterpretation(appliedVolumeLHa, targetVolumeLHa);

  const steps = [
    `Se multiplica el caudal total por 600: 600 x ${formatNumber(
      totalFlowLMin,
    )} = ${formatNumber(600 * totalFlowLMin)}.`,
    `Se calcula la capacidad de trabajo: ${formatNumber(
      speedKmh,
    )} km/h x ${formatNumber(workingWidthM)} m = ${formatNumber(
      speedKmh * workingWidthM,
    )}.`,
    `El volumen aplicado es ${formatNumber(
      600 * totalFlowLMin,
    )} / ${formatNumber(speedKmh * workingWidthM)} = ${formatNumber(
      appliedVolumeLHa,
    )} L/ha.`,
    `El caudal por boquilla es ${formatNumber(
      totalFlowLMin,
    )} L/min / ${formatNumber(nozzleCount, 0)} boquillas = ${formatNumber(
      flowPerNozzleLMin,
    )} L/min por boquilla.`,
  ];

  if (targetVolumeLHa !== null) {
    steps.push(
      `Frente al objetivo de ${formatNumber(
        targetVolumeLHa,
      )} L/ha, la diferencia es ${formatNumber(
        differenceLHa,
      )} L/ha (${formatNumber(differencePercent)} %).`,
    );
  }

  steps.push(interpretation);

  return {
    ok: true,
    data: {
      speedKmh,
      workingWidthM,
      totalFlowLMin,
      nozzleCount,
      targetVolumeLHa,
      appliedVolumeLHa,
      flowPerNozzleLMin,
      differenceLHa,
      differencePercent,
      interpretation,
      steps,
    },
  };
}

export function formatNumber(value, fractionDigits = 2) {
  return new Intl.NumberFormat('es-ES', {
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: fractionDigits,
  }).format(value);
}
