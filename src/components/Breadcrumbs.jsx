import { Link, useLocation } from 'react-router-dom';
import './Breadcrumbs.css';

function Breadcrumbs() {
  const location = useLocation();
  
  // Build breadcrumb trail from current path
  const pathnames = location.pathname.split('/').filter(x => x);
  
  // Don't show breadcrumbs on home page
  if (pathnames.length === 0) {
    return null;
  }
  
  // Helper to format breadcrumb text
  const formatCrumb = (crumb) => {
    // Handle special cases
    if (crumb === 'add-tank') return 'Add Tank';
    if (crumb === 'admin') return 'Admin';
    if (crumb === 'tank') return 'Tank Details';
    
    // Capitalize first letter
    return crumb.charAt(0).toUpperCase() + crumb.slice(1);
  };
  
  return (
    <nav className="breadcrumbs">
      <div className="breadcrumbs-container">
        <Link to="/" className="breadcrumb-link">
          🏠 Home
        </Link>
        
        {pathnames.map((crumb, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          
          // Skip numeric IDs in breadcrumb display
          if (!isNaN(crumb)) {
            return null;
          }
          
          return (
            <span key={routeTo} className="breadcrumb-item">
              <span className="breadcrumb-separator">›</span>
              {isLast ? (
                <span className="breadcrumb-current">{formatCrumb(crumb)}</span>
              ) : (
                <Link to={routeTo} className="breadcrumb-link">
                  {formatCrumb(crumb)}
                </Link>
              )}
            </span>
          );
        })}
      </div>
    </nav>
  );
}

export default Breadcrumbs;
