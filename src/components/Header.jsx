import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header-container">
      <nav className="nav-menu">
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/delicias">Delicias</Link>
          </li>
          <li>
            <Link to="/contacto">Contacto</Link>
          </li>
          <li className="login-item">
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;