import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Breadcrumbs.css';

function Breadcrumbs() {
  const location = useLocation();
  const [tankName, setTankName] = useState('');
  
  // Calculate pathnames
  const pathnames = location.pathname.split('/').filter(x => x);

  // useEffect MUST come before any early returns
  useEffect(() => {
    const paths = location.pathname.split('/').filter(x => x);
    
    // Reset tank name
    setTankName('');
    
    // Only fetch if we're on a tank details page
    if (paths[0] === 'tank' && paths[1]) {
      fetch(`/api/tanks/${paths[1]}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.name) {
            setTankName(data.name);
          }
        })
        .catch(() => {
          setTankName('Tank Details');
        });
    }
  }, [location.pathname]);
  
  // NOW we can do early return - AFTER all hooks
  if (pathnames.length === 0) {
    return null;
  }
  
  const formatCrumb = (crumb, index) => {
    if (crumb === 'add-tank') return 'Add Tank';
    if (crumb === 'admin') return 'Admin';
    if (crumb === 'tank') return 'Tank Details';
    
    // If this is the ID after /tank/, show the tank name
    if (pathnames[index - 1] === 'tank' && !isNaN(crumb)) {
      return tankName || 'Loading...';
    }
    
    // Skip IDs without names
    if (!isNaN(crumb)) {
      return null;
    }
    
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
          const formattedCrumb = formatCrumb(crumb, index);
          
          if (formattedCrumb === null) {
            return null;
          }
          
          return (
            <span key={routeTo} className="breadcrumb-item">
              <span className="breadcrumb-separator">›</span>
              {isLast ? (
                <span className="breadcrumb-current">{formattedCrumb}</span>
              ) : (
                <Link to={routeTo} className="breadcrumb-link">
                  {formattedCrumb}
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
