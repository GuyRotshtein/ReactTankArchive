import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🛡️ Tank Encyclopedia
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/add-tank" className="nav-link">
              Add Tank
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
