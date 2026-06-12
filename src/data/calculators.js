export const availableCalculators = [
  {
    id: 'seed-rate',
    status: 'available',
    category: 'Siembra',
    title: 'Calculadora de dosis de siembra',
    description:
      'Calcula la semilla necesaria corrigiendo la dosis por pureza y poder germinativo.',
  },
  {
    id: 'spraying',
    status: 'available',
    category: 'Pulverizacion',
    title: 'Calculadora de pulverizacion',
    description:
      'Calcula el volumen aplicado, el caudal por boquilla y la diferencia frente al objetivo.',
  },
  {
    id: 'investment',
    status: 'planned',
    title: 'VAN / TIR / Payback',
  },
  {
    id: 'usle',
    status: 'planned',
    title: 'USLE',
  },
  {
    id: 'feed-consumption',
    status: 'planned',
    title: 'Consumo de pienso',
  },
  {
    id: 'export',
    status: 'planned',
    title: 'Exportar resultados',
  },
];

export const activeCalculators = availableCalculators.filter(
  (calculator) => calculator.status === 'available',
);

export const seedRateCalculator = availableCalculators.find(
  (calculator) => calculator.id === 'seed-rate',
);

export const sprayingCalculator = availableCalculators.find(
  (calculator) => calculator.id === 'spraying',
);

export const plannedCalculators = availableCalculators.filter(
  (calculator) => calculator.status === 'planned',
);
