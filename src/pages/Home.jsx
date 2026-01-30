import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAllFavorites, selectFavoritesCount } from '../redux/favoritesSlice';
import TankCard from '../components/TankCard';
import { tanksData } from '../data/tanksData';
import useApi from '../hooks/useApi';
import './Home.css';

function Home() {
  const [tanks, setTanks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  
  const favoriteIds = useSelector(selectAllFavorites);
  const favoritesCount = useSelector(selectFavoritesCount);

  const { data, loading, error, refetch } = useApi('/api/tanks');

  useEffect(() => {
    if (data) setTanks(data);
  }, [data]);

  useEffect(() => {
    if (error) {
      // graceful fallback so the UI is still usable even when the API is down
      setTanks(tanksData);
    }
  }, [error]);

  // Filter tanks based on search term and favorites filter
  const filteredTanks = tanks.filter(tank => {
    const id = tank._id || tank.id;
    const matchesSearch = tank.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tank.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFavorites = !showFavoritesOnly || favoriteIds.includes(id);
    return matchesSearch && matchesFavorites;
  });

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1 className="hero-title">ArmorAtlas</h1>
        <p className="hero-subtitle">
          Explore the most iconic tanks in military history
        </p>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name or country..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="container">
        {error && (
          <div className="api-error" role="alert">
            ⚠️ Could not reach the server. Showing built-in demo data instead.
            <button onClick={refetch} className="retry-btn">Retry</button>
          </div>
        )}

        {/* Info bar with tank count and favorites filter */}
        <div className="info-bar">
          <p className="tank-count">
            Showing <strong>{filteredTanks.length}</strong> out of <strong>{tanks.length}</strong> tanks
          </p>
          
          <div className="info-bar-actions">
            {favoritesCount > 0 && (
              <button 
                className={`favorites-filter-toggle ${showFavoritesOnly ? 'active' : ''}`}
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                title={showFavoritesOnly ? 'Show all tanks' : 'Show favorites only'}
              >
                {showFavoritesOnly ? '⭐ Favorites' : '☆ Favorites'} ({favoritesCount})
              </button>
            )}
            
            <Link to="/add-tank" className="add-tank-button">
              ➕ Add New Tank
            </Link>
          </div>
        </div>

        <div className="tanks-grid">
          {loading && <p className="no-results">Loading tanks…</p>}
          {filteredTanks.length > 0 ? (
            filteredTanks.map((tank) => (
              <TankCard key={tank._id || tank.id} tank={tank} />
            ))
          ) : (
            !loading && <p className="no-results">No tanks found matching your search.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
