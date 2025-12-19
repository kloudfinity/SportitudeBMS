import React, { useState, useEffect } from 'react';
import { venueAPI, cityAPI } from '../../services/apiService';
import '../../styles/AdminManagement.css';

const VenueManagement = () => {
  const [venues, setVenues] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingVenue, setEditingVenue] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    cityId: '',
    address: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [venuesRes, citiesRes] = await Promise.all([
        venueAPI.getAll(),
        cityAPI.getAll()
      ]);
      setVenues(venuesRes.data?.venues || []);
      setCities(citiesRes.data?.cities || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setVenues([]);
      setCities([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const data = {
      city: formData.cityId,
      name: formData.name,
      address: formData.address
    };

    try {
      if (editingVenue) {
        await venueAPI.update(editingVenue._id, data);
      } else {
        await venueAPI.create(data);
      }
      
      setShowModal(false);
      setFormData({ name: '', cityId: '', address: '' });
      setEditingVenue(null);
      fetchData();
    } catch (error) {
      setError(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (venue) => {
    setEditingVenue(venue);
    setFormData({
      name: venue.name,
      cityId: venue.city?._id || venue.cityId || '',
      address: venue.address || '',
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this venue?')) {
      return;
    }

    try {
      await venueAPI.delete(id);
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || 'Delete failed');
    }
  };

  const handleAdd = () => {
    setEditingVenue(null);
    setFormData({ name: '', cityId: '', address: '' });
    setShowModal(true);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="admin-management-page">
      <div className="container">
        <div className="page-header">
          <h1>Venue Management</h1>
          <button className="btn-add" onClick={handleAdd}>
            + Add Venue
          </button>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>City</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {venues.map((venue) => (
                <tr key={venue._id}>
                  <td>{venue.name}</td>
                  <td>{venue.city?.name || '-'}</td>
                  <td>{venue.address || '-'}</td>
                  <td>
                    <button 
                      className="btn-edit"
                      onClick={() => handleEdit(venue)}
                    >
                      Edit
                    </button>
                    <button 
                      className="btn-delete"
                      onClick={() => handleDelete(venue._id)}
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
              <h2>{editingVenue ? 'Edit Venue' : 'Add Venue'}</h2>
              
              {error && <div className="error-message">{error}</div>}
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Venue Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>City *</label>
                  <select
                    value={formData.cityId}
                    onChange={(e) => setFormData({ ...formData, cityId: e.target.value })}
                    required
                  >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                      <option key={city._id} value={city._id}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Address</label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    rows="3"
                    placeholder="Enter venue address"
                  />
                </div>

                <div className="modal-actions">
                  <button type="submit" className="btn-submit">
                    {editingVenue ? 'Update' : 'Create'}
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

export default VenueManagement;
