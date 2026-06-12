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
    status: 'planned',
    title: 'Pulverizacion',
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
];

export const seedRateCalculator = availableCalculators.find(
  (calculator) => calculator.id === 'seed-rate',
);

export const plannedCalculators = availableCalculators.filter(
  (calculator) => calculator.status === 'planned',
);
