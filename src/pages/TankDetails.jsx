import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { tanksData } from '../data/tanksData';
import './TankDetails.css';

// Fix for default marker icon in Leaflet
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

function TankDetails() {
  const { id } = useParams();
  
  // States for loading and error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tank, setTank] = useState(null);
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    // Simulating API call with loading and error states
    const fetchTankData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simulating network delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // Finding tank from mock data
        const foundTank = tanksData.find(t => t.id === parseInt(id));
        
        if (!foundTank) {
          throw new Error('Tank not found');
        }

        setTank(foundTank);

        // Fetching weather data for each location using a real API
        // Using Open-Meteo API
        const weatherPromises = foundTank.locations.map(async (location) => {
          try {
            const response = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lng}&current=temperature_2m,weathercode&timezone=auto`
            );
            const data = await response.json();
            return {
              location: location.name,
              temperature: data.current.temperature_2m,
              weathercode: data.current.weathercode
            };
          } catch (err) {
            console.error('Weather fetch error:', err);
            return { location: location.name, temperature: 'N/A', weathercode: null };
          }
        });

        const weather = await Promise.all(weatherPromises);
        setWeatherData(weather);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTankData();
  }, [id]);

  // Getting weather description based on code
  const getWeatherDescription = (code) => {
    if (code === null) return 'Unknown';
    if (code === 0) return '☀️ Clear';
    if (code <= 3) return '🌤️ Partly Cloudy';
    if (code <= 67) return '🌧️ Rainy';
    if (code <= 77) return '❄️ Snowy';
    return '⛈️ Stormy';
  };

  // Loading state
  if (loading) {
    return (
      <div className="tank-details-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading tank details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="tank-details-page">
        <div className="error-container">
          <h2>❌ Error</h2>
          <p>{error}</p>
          <Link to="/" className="back-btn">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Success state - display tank details
  return (
    <div className="tank-details-page">
      <div className="details-container">
        <Link to="/" className="back-link">
          ← Back to Encyclopedia
        </Link>

        <div className="tank-header">
          <h1>{tank.name}</h1>
          <img src={tank.image} alt={tank.name} className="tank-main-image" />
        </div>

        <div className="tank-specs">
          <h2>📋 Specifications</h2>
          <div className="specs-grid">
            <div className="spec-item">
              <strong>Country:</strong> {tank.country}
            </div>
            <div className="spec-item">
              <strong>Year:</strong> {tank.year}
            </div>
            <div className="spec-item">
              <strong>Weight:</strong> {tank.weight}
            </div>
            <div className="spec-item">
              <strong>Crew:</strong> {tank.crew}
            </div>
          </div>
          <p className="tank-full-description">{tank.description}</p>
        </div>

        <div className="locations-section">
          <h2>📍 Where to Find Surviving Examples</h2>
          
          {/* Display locations using .map() with proper keys */}
          <div className="locations-list">
            {tank.locations.map((location, index) => (
              <div key={`${location.name}-${index}`} className="location-card">
                <h3>{location.name}</h3>
                <p>📍 {location.country}</p>
                <p>🌐 Coordinates: {location.lat.toFixed(4)}°N, {Math.abs(location.lng).toFixed(4)}°{location.lng >= 0 ? 'E' : 'W'}</p>
                {weatherData[index] && (
                  <div className="weather-info">
                    <p>
                      {getWeatherDescription(weatherData[index].weathercode)} 
                      {weatherData[index].temperature !== 'N/A' && ` • ${weatherData[index].temperature}°C`}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Map with all locations */}
          <div className="map-container">
            <h3>🗺️ Interactive Map</h3>
            <MapContainer
              center={[tank.locations[0].lat, tank.locations[0].lng]}
              zoom={3}
              style={{ height: '500px', width: '100%', borderRadius: '12px' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {tank.locations.map((location, index) => (
                <Marker
                  key={`marker-${index}`}
                  position={[location.lat, location.lng]}
                >
                  <Popup>
                    <strong>{location.name}</strong>
                    <br />
                    {location.country}
                    <br />
                    {tank.name}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TankDetails;
