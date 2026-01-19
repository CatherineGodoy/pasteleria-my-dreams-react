import { Link } from 'react-router-dom'

// Se recibe "logo" como prop desde App.jsx
function Header({ logo }) {
  return (
    <header className="header-container">
      {/* LOGO */}
      <div className="logo-container">
        <Link to="/">
          <img src={logo} alt="Logo Pastelería" className="logo-img" />
        </Link>
      </div>

      {/* NAVEGACIÓN */}
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
          
          {/* --- AQUÍ ESTÁ EL LOGIN VISUAL --- */}
          <li className="login-item">
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header