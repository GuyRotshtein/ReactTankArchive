import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectFavoritesCount } from '../redux/favoritesSlice';
import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';
import './Navbar.css';

function Navbar() {
  const { theme, toggleTheme, isDark } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Get favorites count for sidebar display
  const favoritesCount = useSelector(selectFavoritesCount);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          {/* Hamburger Menu Button */}
          <button 
            className={`hamburger ${sidebarOpen ? 'active' : ''}`}
            onClick={toggleSidebar}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Logo and Title */}
          <Link to="/" className="nav-logo" onClick={closeSidebar}>
            <img 
              src={isDark ? '/images/logo_grey.png' : '/images/logo_brown.png'} 
              alt="ArmorAtlas Logo" 
              className="logo-image"
            />
            ArmorAtlas
          </Link>

          {/* Right side buttons */}
          <div className="nav-right">
            {/* Theme Toggle */}
            <button onClick={toggleTheme} className="theme-toggle" title="Toggle theme">
              {isDark ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar Menu */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Menu</h2>
          <button className="close-btn" onClick={closeSidebar}>
            ✕
          </button>
        </div>
        
        <ul className="sidebar-menu">
          <li>
            <Link to="/" className="sidebar-link" onClick={closeSidebar}>
              🏠 Home
            </Link>
          </li>
          <li>
            <Link to="/" className="sidebar-link" onClick={closeSidebar}>
              ⭐ Favorites {favoritesCount > 0 && `(${favoritesCount})`}
            </Link>
          </li>
          <li>
            <Link to="/add-tank" className="sidebar-link" onClick={closeSidebar}>
              ➕ Add Tank
            </Link>
          </li>
          <li>
            <Link to="/admin" className="sidebar-link admin-sidebar-link" onClick={closeSidebar}>
              🛠️ Admin
            </Link>
          </li>
        </ul>
      </div>

      {/* Overlay */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}
    </>
  );
}

export default Navbar;
