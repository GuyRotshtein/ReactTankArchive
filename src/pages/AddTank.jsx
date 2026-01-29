import { useState } from 'react';
import './AddTank.css';

function AddTank() {
  // Controlled components using useState
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    year: '',
    weight: '',
    crew: '',
    description: ''
  });

  // State for validation errors
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    // Name validation - the name must be at least 3 characters long
    if (formData.name.trim().length < 3) {
      newErrors.name = 'Tank name must be at least 3 characters';
    }

    // Country validation: the field must not be empty, can choose from list or add your own
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

    // Crew validation: must be a number between 1 and 20 - definatly not to add the A7V or something >_>
    const crewNum = parseInt(formData.crew);
    if (!formData.crew || isNaN(crewNum) || crewNum < 1 || crewNum > 20) {
      newErrors.crew = 'Crew must be a number between 1 and 10';
    }

    // Description validation: must be at least 10 characters long
    if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    return newErrors;
  };

  // Handling form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length === 0) {
      // No errors - form is valid
      console.log('Form submitted successfully!', formData);
      setIsSubmitted(true);
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          country: '',
          year: '',
          weight: '',
          crew: '',
          description: ''
        });
        setIsSubmitted(false);
      }, 2000);
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
            ✅ Tank added successfully! Check the console for details.
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
            {/* Validation message display */}
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

          <button type="submit" className="submit-btn">
            Add Tank to Encyclopedia
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTank;
