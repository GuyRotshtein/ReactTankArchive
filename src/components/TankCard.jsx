import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite, selectIsFavorite } from '../redux/favoritesSlice';
import './TankCard.css';

// TankCard component receives tank data as props
function TankCard({ tank }) {
  const tankId = tank._id || tank.id;
  const dispatch = useDispatch();
  const isFavorite = useSelector(selectIsFavorite(tankId));

  const handleToggleFavorite = (e) => {
    e.preventDefault(); // Prevent link navigation
    dispatch(toggleFavorite(tankId));
  };

  return (
      <Link
          to={`/tanks/${tank._id}`}
          className="tank-card-link"
      >
        <div className="tank-card">
          <div className="tank-image-container">
            <img
              src={tank.image}
              alt={tank.name}
              className="tank-image"
            />
            {/* Favorite Button */}
            <button
              className={`favorite-btn ${isFavorite ? 'active' : ''}`}
              onClick={handleToggleFavorite}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite ? '⭐' : '☆'}
            </button>
          </div>
          <div className="tank-content">
            <h3 className="tank-name">{tank.name}</h3>
            <div className="tank-info">
              <p><strong>Country:</strong> {tank.country}</p>
              <p><strong>Year:</strong> {tank.year}</p>
              <p><strong>Weight:</strong> {tank.weight}</p>
              <p><strong>Crew:</strong> {tank.crew}</p>
            </div>
            <p className="tank-description">{tank.description}</p>
            <p className="tank-link-text">View details & locations</p>

          </div>
        </div>
      </Link>
  );
}

export default TankCard;
