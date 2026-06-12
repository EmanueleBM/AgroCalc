function FormulaBox({ id, formulas }) {
  return (
    <section className="formula-section" id={id}>
      <h3>Formula utilizada</h3>
      {formulas.map((formula) => (
        <p key={formula}>{formula}</p>
      ))}
    </section>
  );
}

export default FormulaBox;
