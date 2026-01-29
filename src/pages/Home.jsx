import { useState } from 'react';
import TankCard from '../components/TankCard';
import { tanksData } from '../data/tanksData';
import './Home.css';

function Home() {
  // Using useState to manage tanks data
  const [tanks, setTanks] = useState(tanksData);
  const [searchTerm, setSearchTerm] = useState('');

  // Filtering tanks based on search term
  const filteredTanks = tanks.filter(tank =>
    tank.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tank.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1 className="hero-title">🎖️ Tank Encyclopedia</h1>
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
        <div className="stats-section">
          <div className="stat-card">
            <h3>{tanks.length}</h3>
            <p>Total Tanks</p>
          </div>
          <div className="stat-card">
            <h3>{filteredTanks.length}</h3>
            <p>Showing</p>
          </div>
        </div>

        {/* Using .map() to render list of tanks*/}
        {/* Passing data via props to TankCard component*/}
        <div className="tanks-grid">
          {filteredTanks.length > 0 ? (
            filteredTanks.map((tank) => (
              <TankCard key={tank.id} tank={tank} />
            ))
          ) : (
            <p className="no-results">No tanks found matching your search.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
