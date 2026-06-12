import Header from './components/Header.jsx';
import CalculatorCard from './components/CalculatorCard.jsx';
import SeedRateCalculator from './components/SeedRateCalculator.jsx';
import { plannedCalculators, seedRateCalculator } from './data/calculators.js';

function App() {
  return (
    <div className="app-shell">
      <Header />

      <main className="main-layout">
        <section className="intro-section" aria-labelledby="home-title">
          <div>
            <p className="eyebrow">Version inicial</p>
            <h1 id="home-title">AgroCalc</h1>
            <p className="intro-copy">
              Calculadoras agroambientales claras, rapidas y listas para usar
              en clase, campo o gabinete tecnico.
            </p>
          </div>

          <div className="roadmap-panel" aria-label="Proximas calculadoras">
            <span className="panel-label">Proximamente</span>
            <ul>
              {plannedCalculators.map((calculator) => (
                <li key={calculator.id}>{calculator.title}</li>
              ))}
            </ul>
          </div>
        </section>

        <CalculatorCard
          category={seedRateCalculator.category}
          title={seedRateCalculator.title}
          description={seedRateCalculator.description}
        >
          <SeedRateCalculator />
        </CalculatorCard>
      </main>
    </div>
  );
}

export default App;
