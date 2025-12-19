import React, { useState, useEffect } from 'react';
import { cityAPI } from '../../services/apiService';
import '../../styles/AdminManagement.css';

const CityManagement = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCity, setEditingCity] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    state: '',
    country: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await cityAPI.getAll();
      setCities(response.data?.cities || []);
    } catch (error) {
      console.error('Error fetching cities:', error);
      setCities([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (editingCity) {
        await cityAPI.update(editingCity._id, formData);
      } else {
        await cityAPI.create(formData);
      }
      
      setShowModal(false);
      setFormData({ name: '', state: '', country: '' });
      setEditingCity(null);
      fetchCities();
    } catch (error) {
      setError(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (city) => {
    setEditingCity(city);
    setFormData({
      name: city.name,
      state: city.state || '',
      country: city.country || '',
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this city?')) {
      return;
    }

    try {
      await cityAPI.delete(id);
      fetchCities();
    } catch (error) {
      alert(error.response?.data?.message || 'Delete failed');
    }
  };

  const handleAdd = () => {
    setEditingCity(null);
    setFormData({ name: '', state: '', country: '' });
    setShowModal(true);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="admin-management-page">
      <div className="container">
        <div className="page-header">
          <h1>City Management</h1>
          <button className="btn-add" onClick={handleAdd}>
            + Add City
          </button>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>State</th>
                <th>Country</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cities.map((city) => (
                <tr key={city._id}>
                  <td>{city.name}</td>
                  <td>{city.state || '-'}</td>
                  <td>{city.country || '-'}</td>
                  <td>
                    <button 
                      className="btn-edit"
                      onClick={() => handleEdit(city)}
                    >
                      Edit
                    </button>
                    <button 
                      className="btn-delete"
                      onClick={() => handleDelete(city._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>{editingCity ? 'Edit City' : 'Add City'}</h2>
              
              {error && <div className="error-message">{error}</div>}
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>City Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>State</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Country</label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  />
                </div>

                <div className="modal-actions">
                  <button type="submit" className="btn-submit">
                    {editingCity ? 'Update' : 'Create'}
                  </button>
                  <button 
                    type="button" 
                    className="btn-cancel"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CityManagement;
