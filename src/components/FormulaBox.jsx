function FormulaBox() {
  return (
    <section className="formula-section" id="formula">
      <h3>Formula utilizada</h3>
      <p>
        Dosis corregida = dosis objetivo / ((pureza / 100) x (germinacion /
        100))
      </p>
      <p>Kg totales = superficie x dosis corregida</p>
      <p>Coste total = kg totales x precio por kg</p>
      <p>Semillas objetivo/m2 = dosis objetivo kg/ha x 100 / PMS en gramos</p>
      <p>Semillas comerciales/m2 = dosis corregida kg/ha x 100 / PMS en gramos</p>
      <p>Semillas/m lineal = semillas/m2 x separacion entre lineas en metros</p>
    </section>
  );
}

export default FormulaBox;
