import { useState } from 'react';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Inicio de AgroCalc">
        <img
          className="brand-logo"
          src="/brand/agrocalc-wordmark.png"
          alt="AgroCalc"
        />
      </a>
      <button
        className="menu-button"
        type="button"
        aria-expanded={isOpen}
        aria-controls="main-navigation"
        aria-label="Abrir navegacion"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>
      <nav
        className={isOpen ? 'top-nav top-nav-open' : 'top-nav'}
        id="main-navigation"
        aria-label="Navegacion principal"
      >
        <a href="#inicio" onClick={closeMenu}>Inicio</a>
        <a href="#calculadoras" onClick={closeMenu}>Calculadoras</a>
        <a href="#formulas" onClick={closeMenu}>Formulas</a>
        <a href="#feedback" onClick={closeMenu}>Feedback</a>
      </nav>
    </header>
  );
}

export default Header;
