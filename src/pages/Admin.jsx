import { useState, useEffect } from 'react';
import { tanksData } from '../data/tanksData';
import './Admin.css';

function Admin() {
  const [tanks, setTanks] = useState([]);
  const [editingTank, setEditingTank] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simple password protection (in real app, use proper auth)
  const ADMIN_PASSWORD = 'admin123';

  useEffect(() => {
    // Load tanks from localStorage or use default data
    const savedTanks = localStorage.getItem('tanksData');
    if (savedTanks) {
      setTanks(JSON.parse(savedTanks));
    } else {
      setTanks(tanksData);
      localStorage.setItem('tanksData', JSON.stringify(tanksData));
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password!');
    }
  };

  const saveTanks = (updatedTanks) => {
    setTanks(updatedTanks);
    localStorage.setItem('tanksData', JSON.stringify(updatedTanks));
  };

  const deleteTank = (id) => {
    if (window.confirm('Are you sure you want to delete this tank?')) {
      const updatedTanks = tanks.filter(tank => tank.id !== id);
      saveTanks(updatedTanks);
    }
  };

  const startEditing = (tank) => {
    setEditingTank(tank.id);
    setEditForm({ ...tank });
  };

  const cancelEditing = () => {
    setEditingTank(null);
    setEditForm({});
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: value
    });
  };

  const saveEdit = () => {
    const updatedTanks = tanks.map(tank => 
      tank.id === editingTank ? editForm : tank
    );
    saveTanks(updatedTanks);
    setEditingTank(null);
    setEditForm({});
  };

  const resetToDefaults = () => {
    if (window.confirm('Reset all data to defaults? This cannot be undone!')) {
      saveTanks(tanksData);
      alert('Data reset to defaults!');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-page">
        <div className="login-container">
          <h1>🔐 Admin Login</h1>
          <p>Enter the admin password to access the control panel</p>
          <form onSubmit={handleLogin} className="login-form">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="password-input"
            />
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
          <p className="hint">Hint: admin123</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-container">
        <div className="admin-header">
          <h1>🛠️ Admin Control Panel</h1>
          <div className="header-actions">
            <button onClick={resetToDefaults} className="reset-btn">
              🔄 Reset to Defaults
            </button>
            <button onClick={() => setIsAuthenticated(false)} className="logout-btn">
              🚪 Logout
            </button>
          </div>
        </div>

        <div className="admin-stats">
          <div className="stat-box">
            <h3>{tanks.length}</h3>
            <p>Total Tanks</p>
          </div>
        </div>

        <div className="tanks-list">
          {tanks.map(tank => (
            <div key={tank.id} className="admin-tank-card">
              {editingTank === tank.id ? (
                // Edit Mode
                <div className="edit-form">
                  <h3>Edit: {tank.name}</h3>
                  
                  <div className="edit-row">
                    <label>Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleEditChange}
                    />
                  </div>

                  <div className="edit-row">
                    <label>Country:</label>
                    <input
                      type="text"
                      name="country"
                      value={editForm.country}
                      onChange={handleEditChange}
                    />
                  </div>

                  <div className="edit-row">
                    <label>Year:</label>
                    <input
                      type="number"
                      name="year"
                      value={editForm.year}
                      onChange={handleEditChange}
                    />
                  </div>

                  <div className="edit-row">
                    <label>Weight:</label>
                    <input
                      type="text"
                      name="weight"
                      value={editForm.weight}
                      onChange={handleEditChange}
                    />
                  </div>

                  <div className="edit-row">
                    <label>Crew:</label>
                    <input
                      type="number"
                      name="crew"
                      value={editForm.crew}
                      onChange={handleEditChange}
                    />
                  </div>

                  <div className="edit-row">
                    <label>Image URL:</label>
                    <input
                      type="text"
                      name="image"
                      value={editForm.image}
                      onChange={handleEditChange}
                    />
                  </div>

                  <div className="edit-row">
                    <label>Description:</label>
                    <textarea
                      name="description"
                      value={editForm.description}
                      onChange={handleEditChange}
                      rows="3"
                    />
                  </div>

                  <div className="edit-actions">
                    <button onClick={saveEdit} className="save-btn">
                      ✓ Save Changes
                    </button>
                    <button onClick={cancelEditing} className="cancel-btn">
                      ✕ Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // View Mode
                <>
                  <div className="tank-preview">
                    <img src={tank.image} alt={tank.name} />
                  </div>
                  <div className="tank-details">
                    <h3>{tank.name}</h3>
                    <p><strong>Country:</strong> {tank.country}</p>
                    <p><strong>Year:</strong> {tank.year}</p>
                    <p><strong>Weight:</strong> {tank.weight}</p>
                    <p><strong>Crew:</strong> {tank.crew}</p>
                    <p className="description">{tank.description}</p>
                  </div>
                  <div className="tank-actions">
                    <button 
                      onClick={() => startEditing(tank)} 
                      className="edit-btn"
                    >
                      ✏️ Edit
                    </button>
                    <button 
                      onClick={() => deleteTank(tank.id)} 
                      className="delete-btn"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Admin;
