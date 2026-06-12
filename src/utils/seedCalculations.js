const REQUIRED_FIELDS = {
  areaHa: 'Introduce la superficie en hectareas.',
  targetDoseKgHa: 'Introduce la dosis objetivo en kg/ha.',
  purityPercent: 'Introduce la pureza de la semilla.',
  germinationPercent: 'Introduce el poder germinativo.',
};

const FIELD_LABELS = {
  areaHa: 'La superficie',
  targetDoseKgHa: 'La dosis objetivo',
  thousandSeedWeightG: 'El peso de mil semillas',
  purityPercent: 'La pureza',
  germinationPercent: 'El poder germinativo',
  rowSpacingCm: 'La separacion entre lineas',
  seedPricePerKg: 'El precio de semilla',
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

  ['purityPercent', 'germinationPercent'].forEach((field) => {
    if (parsedValues[field] > 100) {
      errors[field] = `${FIELD_LABELS[field]} no puede superar el 100 %.`;
    }
  });

  if (
    parsedValues.rowSpacingCm !== null &&
    parsedValues.thousandSeedWeightG === null
  ) {
    errors.rowSpacingCm =
      'Para calcular semillas por metro lineal, indica tambien el peso de mil semillas.';
  }

  return { errors, parsedValues };
}

export function calculateSeedRate(rawValues) {
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
    areaHa,
    targetDoseKgHa,
    thousandSeedWeightG,
    purityPercent,
    germinationPercent,
    rowSpacingCm,
    seedPricePerKg,
  } = parsedValues;

  const purityDecimal = purityPercent / 100;
  const germinationDecimal = germinationPercent / 100;

  // La correccion compensa las semillas que no son puras o no germinan.
  const correctionFactor = 1 / (purityDecimal * germinationDecimal);
  const correctedDoseKgHa = targetDoseKgHa * correctionFactor;
  const totalSeedKg = areaHa * correctedDoseKgHa;
  const totalCost = seedPricePerKg === null ? null : totalSeedKg * seedPricePerKg;

  // 1 kg/ha equivale a 0,1 g/m2; por eso kg/ha x 100 / PMS da semillas/m2.
  const targetSeedsPerSquareMeter =
    thousandSeedWeightG === null
      ? null
      : (targetDoseKgHa * 100) / thousandSeedWeightG;
  const correctedSeedsPerSquareMeter =
    thousandSeedWeightG === null
      ? null
      : (correctedDoseKgHa * 100) / thousandSeedWeightG;
  const targetSeedsPerLinearMeter =
    targetSeedsPerSquareMeter === null || rowSpacingCm === null
      ? null
      : targetSeedsPerSquareMeter * (rowSpacingCm / 100);
  const correctedSeedsPerLinearMeter =
    correctedSeedsPerSquareMeter === null || rowSpacingCm === null
      ? null
      : correctedSeedsPerSquareMeter * (rowSpacingCm / 100);

  const steps = [
    `Primero se convierten pureza (${formatNumber(purityPercent)} %) y germinacion (${formatNumber(
      germinationPercent,
    )} %) a decimales.`,
    `El factor de correccion es 1 / (${formatNumber(purityDecimal)} x ${formatNumber(
      germinationDecimal,
    )}) = ${formatNumber(correctionFactor)}.`,
    `La dosis corregida es ${formatNumber(targetDoseKgHa)} kg/ha x ${formatNumber(
      correctionFactor,
    )} = ${formatNumber(correctedDoseKgHa)} kg/ha.`,
    `La semilla total necesaria es ${formatNumber(areaHa)} ha x ${formatNumber(
      correctedDoseKgHa,
    )} kg/ha = ${formatNumber(totalSeedKg)} kg.`,
  ];

  if (totalCost !== null) {
    steps.push(
      `El coste estimado es ${formatNumber(totalSeedKg)} kg x ${formatCurrency(
        seedPricePerKg,
      )}/kg = ${formatCurrency(totalCost)}.`,
    );
  }

  if (targetSeedsPerSquareMeter !== null) {
    steps.push(
      `Con un PMS de ${formatNumber(
        thousandSeedWeightG,
      )} g, la dosis objetivo equivale a ${formatNumber(
        targetSeedsPerSquareMeter,
      )} semillas/m2 antes de la correccion.`,
    );
    steps.push(
      `La dosis corregida equivale a ${formatNumber(
        correctedSeedsPerSquareMeter,
      )} semillas comerciales/m2.`,
    );
  }

  if (targetSeedsPerLinearMeter !== null) {
    steps.push(
      `Con lineas a ${formatNumber(rowSpacingCm)} cm, las semillas objetivo equivalen a ${formatNumber(
        targetSeedsPerLinearMeter,
      )} semillas por metro lineal.`,
    );
    steps.push(
      `Para regular la sembradora, usa la cifra corregida: ${formatNumber(
        correctedSeedsPerLinearMeter,
      )} semillas comerciales por metro lineal.`,
    );
  }

  return {
    ok: true,
    data: {
      areaHa,
      targetDoseKgHa,
      thousandSeedWeightG,
      purityPercent,
      germinationPercent,
      rowSpacingCm,
      seedPricePerKg,
      correctionFactor,
      correctedDoseKgHa,
      totalSeedKg,
      totalCost,
      targetSeedsPerSquareMeter,
      correctedSeedsPerSquareMeter,
      targetSeedsPerLinearMeter,
      correctedSeedsPerLinearMeter,
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

export function formatCurrency(value) {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
  }).format(value);
}
