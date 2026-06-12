import Header from './components/Header.jsx';
import CalculatorCard from './components/CalculatorCard.jsx';
import CalculatorSelector from './components/CalculatorSelector.jsx';
import ComingSoonSection from './components/ComingSoonSection.jsx';
import FeedbackSection from './components/FeedbackSection.jsx';
import Hero from './components/Hero.jsx';
import SeedRateCalculator from './components/SeedRateCalculator.jsx';
import SprayCalculator from './components/SprayCalculator.jsx';
import {
  availableCalculators,
  plannedCalculators,
  seedRateCalculator,
  sprayingCalculator,
} from './data/calculators.js';

function App() {
  const selectorCalculators = availableCalculators.filter(
    (calculator) => calculator.id !== 'export',
  );

  return (
    <div className="app-shell">
      <Header />

      <main className="main-layout">
        <Hero />

        <CalculatorSelector calculators={selectorCalculators} />

        <CalculatorCard
          id="siembra"
          category={seedRateCalculator.category}
          title={seedRateCalculator.title}
          description={seedRateCalculator.description}
        >
          <SeedRateCalculator />
        </CalculatorCard>

        <CalculatorCard
          id="pulverizacion"
          category={sprayingCalculator.category}
          title={sprayingCalculator.title}
          description={sprayingCalculator.description}
        >
          <SprayCalculator />
        </CalculatorCard>

        <ComingSoonSection calculators={plannedCalculators} />
        <FeedbackSection />
      </main>
    </div>
  );
}

export default App;
