function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Inicio de AgroCalc">
        <img
          className="brand-logo"
          src="/brand/agrocalc-wordmark.png"
          alt="AgroCalc"
        />
      </a>
      <nav className="top-nav" aria-label="Navegacion principal">
        <a href="#calculadora">Calculadora</a>
        <a href="#formula">Formula</a>
      </nav>
    </header>
  );
}

export default Header;
