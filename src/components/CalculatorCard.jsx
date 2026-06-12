function CalculatorCard({ id, category, title, description, children }) {
  return (
    <section className="calculator-card" id={id} aria-labelledby={`${id}-title`}>
      <div className="calculator-heading">
        <p className="eyebrow">{category}</p>
        <h2 id={`${id}-title`}>{title}</h2>
        <p>{description}</p>
      </div>
      {children}
    </section>
  );
}

export default CalculatorCard;
