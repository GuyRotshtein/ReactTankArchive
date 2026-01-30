import { useState, useEffect } from 'react';
import useApi from '../hooks/useApi';
import { tanksApi } from '../services/tanksApi';
import './Admin.css';

const API_BASE = import.meta.env.VITE_API_BASE || '';

function Admin() {
  const [tanks, setTanks] = useState([]);
  const [editingTank, setEditingTank] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { data, loading, error, refetch } = useApi(isAuthenticated ? '/api/tanks' : null, {
    autoFetch: isAuthenticated,
    dependencies: [isAuthenticated]
  });

  useEffect(() => {
    if (data) setTanks(data);
  }, [data]);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${API_BASE}/api/tanks/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password })
      });

      const data = await response.json();

      if (data.success) {
        setIsAuthenticated(true);
      } else {
        alert('Incorrect password!');
      }
    } catch (err) {
      alert('Could not verify password. Please try again.');
    }
  };

  const deleteTank = async (id) => {
    if (window.confirm('Are you sure you want to delete this tank?')) {
      await tanksApi.remove(id);
      refetch();
    }
  };

  const startEditing = (tank) => {
    setEditingTank(tank._id);
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

  const saveEdit = async () => {
    await tanksApi.update(editingTank, {
      ...editForm,
      year: Number(editForm.year),
      crew: Number(editForm.crew)
    });
    setEditingTank(null);
    setEditForm({});
    refetch();
  };

  const resetToDefaults = async () => {
    if (window.confirm('Reset all data to defaults? This cannot be undone!')) {
      try {
        await fetch(`${API_BASE}/api/tanks/reset`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-admin-password': password
          }
        });
        alert('Data reset to defaults!');
        refetch();
      } catch {
        alert('Reset failed (server error)');
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-page">
        <div className="login-container">
          <h1>Admin Login</h1>
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

        {error && (
          <div className="error-container" role="alert" style={{ marginBottom: 12 }}>
            ⚠️ Could not load tanks from the server. <button onClick={refetch} className="retry-btn">Retry</button>
          </div>
        )}

        {loading && <p>Loading tanks…</p>}

        <div className="tanks-list">
          {!loading && tanks.map(tank => (
            <div key={tank._id} className="admin-tank-card">
              {editingTank === tank._id ? (
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
                      onClick={() => deleteTank(tank._id)} 
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
