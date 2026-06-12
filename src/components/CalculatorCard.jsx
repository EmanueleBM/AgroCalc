function CalculatorCard({ category, title, description, children }) {
  return (
    <section className="calculator-card" id="calculadora" aria-labelledby="calculator-title">
      <div className="calculator-heading">
        <p className="eyebrow">{category}</p>
        <h2 id="calculator-title">{title}</h2>
        <p>{description}</p>
      </div>
      {children}
    </section>
  );
}

export default CalculatorCard;
