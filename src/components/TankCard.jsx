import { Link } from 'react-router-dom';
import './TankCard.css';

// TankCard component receives tank data as props
function TankCard({ tank }) {
  return (
    <div className="tank-card">
      <div className="tank-image-container">
        <img 
          src={tank.image} 
          alt={tank.name}
          className="tank-image"
        />
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
        <Link to={`/tank/${tank.id}`} className="view-details-btn">
          View Details & Locations 📍
        </Link>
      </div>
    </div>
  );
}

export default TankCard;
