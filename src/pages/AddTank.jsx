import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tanksApi } from '../services/tanksApi';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './AddTank.css';

// Fix for default marker icon
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

function AddTank() {
  const navigate = useNavigate();

  // Controlled components using useState
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    year: '',
    weight: '',
    crew: '',
    description: ''
  });

  // State for locations (surviving examples)
  const [locations, setLocations] = useState([]);
  const [currentLocation, setCurrentLocation] = useState({
    name: '',
    country: '',
    lat: '',
    lng: '',
    image: ''
  });

  // State for validation errors
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLocationForm, setShowLocationForm] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Handle location input changes
  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setCurrentLocation({
      ...currentLocation,
      [name]: value
    });
  };

  // Add location to list
  const addLocation = () => {
    if (!currentLocation.name || !currentLocation.lat || !currentLocation.lng) {
      alert('Please fill in location name, latitude, and longitude');
      return;
    }

    // Validate coordinates
    const lat = parseFloat(currentLocation.lat);
    const lng = parseFloat(currentLocation.lng);

    if (isNaN(lat) || lat < -90 || lat > 90) {
      alert('Latitude must be between -90 and 90');
      return;
    }

    if (isNaN(lng) || lng < -180 || lng > 180) {
      alert('Longitude must be between -180 and 180');
      return;
    }

    setLocations([...locations, { ...currentLocation, lat, lng }]);
    setCurrentLocation({ name: '', country: '', lat: '', lng: '', image: '' });
    setShowLocationForm(false);
  };

  // Remove location from list
  const removeLocation = (index) => {
    setLocations(locations.filter((_, i) => i !== index));
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    // Name validation: must be at least 3 characters
    if (formData.name.trim().length < 3) {
      newErrors.name = 'Tank name must be at least 3 characters';
    }

    // Country validation: must not be empty
    if (!formData.country) {
      newErrors.country = 'Please select a country';
    }

    // Year validation: must be a number between 1900 and current year
    const yearNum = parseInt(formData.year);
    if (!formData.year || isNaN(yearNum) || yearNum < 1900 || yearNum > new Date().getFullYear()) {
      newErrors.year = `Year must be a number between 1900 and ${new Date().getFullYear()}`;
    }

    // Weight validation: must not be empty
    if (formData.weight.trim().length === 0) {
      newErrors.weight = 'Weight is required';
    }

    // Crew validation: must be a number between 1 and 20
    const crewNum = parseInt(formData.crew);
    if (!formData.crew || isNaN(crewNum) || crewNum < 1 || crewNum > 20) {
      newErrors.crew = 'Crew must be a number between 1 and 20';
    }

    // Description validation: must be at least 10 characters
    if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      // No errors - form is valid
      const payload = {
        ...formData,
        year: Number(formData.year),
        crew: Number(formData.crew),
        locations: locations
      };

      try {
        setIsSubmitting(true);
        await tanksApi.create(payload);
        setIsSubmitted(true);
        setTimeout(() => navigate('/'), 1200);
      } catch (err) {
        setSubmitError(err?.message || 'Failed to save tank');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Set errors to display
      setErrors(validationErrors);
    }
  };

  return (
    <div className="add-tank-page">
      <div className="form-container">
        <h1 className="form-title">➕ Add New Tank</h1>
        <p className="form-subtitle">Fill in the details to add a new tank to the encyclopedia</p>

        {isSubmitted && (
          <div className="success-message">
            ✅ Tank added successfully! Redirecting to home page...
          </div>
        )}

        {submitError && (
          <div className="error-message" role="alert" style={{ marginBottom: 12 }}>
            ❌ {submitError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="tank-form">
          {/* Tank Name Input */}
          <div className="form-group">
            <label htmlFor="name">Tank Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'input-error' : ''}
              placeholder="e.g., M4 Sherman"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          {/* Country Select */}
          <div className="form-group">
            <label htmlFor="country">Country of Origin *</label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className={errors.country ? 'input-error' : ''}
            >
              <option value="">Select a country</option>
              <option value="USA">USA</option>
              <option value="Germany">Germany</option>
              <option value="Soviet Union">Soviet Union</option>
              <option value="UK">United Kingdom</option>
              <option value="France">France</option>
              <option value="Japan">Japan</option>
              <option value="China">China</option>
              <option value="Italy">Italy</option>
            </select>
            {errors.country && <span className="error-message">{errors.country}</span>}
          </div>

          {/* Year Input */}
          <div className="form-group">
            <label htmlFor="year">Year of Introduction *</label>
            <input
              type="number"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className={errors.year ? 'input-error' : ''}
              placeholder="e.g., 1942"
            />
            {errors.year && <span className="error-message">{errors.year}</span>}
          </div>

          {/* Weight Input */}
          <div className="form-group">
            <label htmlFor="weight">Weight *</label>
            <input
              type="text"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className={errors.weight ? 'input-error' : ''}
              placeholder="e.g., 30.3 tons"
            />
            {errors.weight && <span className="error-message">{errors.weight}</span>}
          </div>

          {/* Crew Size Input */}
          <div className="form-group">
            <label htmlFor="crew">Crew Size *</label>
            <input
              type="number"
              id="crew"
              name="crew"
              value={formData.crew}
              onChange={handleChange}
              className={errors.crew ? 'input-error' : ''}
              placeholder="e.g., 5"
            />
            {errors.crew && <span className="error-message">{errors.crew}</span>}
          </div>

          {/* Description Textarea */}
          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={errors.description ? 'input-error' : ''}
              placeholder="Enter a brief description of the tank..."
              rows="4"
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>

          {/* Locations Section */}
          <div className="locations-section">
            <h3>📍 Surviving Examples (Optional)</h3>
            <p className="section-subtitle">Add museum locations where this tank can be found</p>

            {locations.length > 0 && (
              <div className="added-locations">
                {locations.map((loc, index) => (
                  <div key={index} className="location-item">
                    <div className="location-info">
                      <strong>{loc.name}</strong>
                      {loc.country && ` - ${loc.country}`}
                      <br />
                      <small>📍 {loc.lat}°N, {Math.abs(loc.lng)}°{loc.lng >= 0 ? 'E' : 'W'}</small>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeLocation(index)}
                      className="remove-location-btn"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            {!showLocationForm ? (
              <button
                type="button"
                onClick={() => setShowLocationForm(true)}
                className="add-location-btn"
              >
                + Add Location
              </button>
            ) : (
              <div className="location-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="locationName">Museum/Location Name *</label>
                    <input
                      type="text"
                      id="locationName"
                      name="name"
                      value={currentLocation.name}
                      onChange={handleLocationChange}
                      placeholder="e.g., Bovington Tank Museum"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="locationCountry">Country</label>
                    <input
                      type="text"
                      id="locationCountry"
                      name="country"
                      value={currentLocation.country}
                      onChange={handleLocationChange}
                      placeholder="e.g., UK"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="lat">Latitude * (-90 to 90)</label>
                    <input
                      type="number"
                      step="0.0001"
                      id="lat"
                      name="lat"
                      value={currentLocation.lat}
                      onChange={handleLocationChange}
                      placeholder="e.g., 50.6885"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="lng">Longitude * (-180 to 180)</label>
                    <input
                      type="number"
                      step="0.0001"
                      id="lng"
                      name="lng"
                      value={currentLocation.lng}
                      onChange={handleLocationChange}
                      placeholder="e.g., -2.1067"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="locationImage">Image URL (Optional)</label>
                  <input
                    type="url"
                    id="locationImage"
                    name="image"
                    value={currentLocation.image}
                    onChange={handleLocationChange}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                {/* Map Preview */}
                {currentLocation.lat && currentLocation.lng &&
                 !isNaN(parseFloat(currentLocation.lat)) &&
                 !isNaN(parseFloat(currentLocation.lng)) && (
                  <div className="map-preview">
                    <p><strong>📍 Location Preview:</strong></p>
                    <MapContainer
                      center={[parseFloat(currentLocation.lat), parseFloat(currentLocation.lng)]}
                      zoom={5}
                      style={{ height: '250px', width: '100%', borderRadius: '8px' }}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; OpenStreetMap'
                      />
                      <Marker position={[parseFloat(currentLocation.lat), parseFloat(currentLocation.lng)]} />
                    </MapContainer>
                  </div>
                )}

                <div className="location-form-buttons">
                  <button
                    type="button"
                    onClick={addLocation}
                    className="save-location-btn"
                  >
                    ✓ Save Location
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowLocationForm(false);
                      setCurrentLocation({ name: '', country: '', lat: '', lng: '', image: '' });
                    }}
                    className="cancel-location-btn"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Saving…' : 'Add Tank to Encyclopedia'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTank;
