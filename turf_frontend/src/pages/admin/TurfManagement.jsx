import React, { useState, useEffect } from 'react';
import { turfAPI, venueAPI } from '../../services/apiService';
import '../../styles/AdminManagement.css';

const TurfManagement = () => {
  const [turfs, setTurfs] = useState([]);
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTurf, setEditingTurf] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    venueId: '',
    sportType: '',
    pricePerHour: '',
    amenities: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [turfsRes, venuesRes] = await Promise.all([
        turfAPI.getAll(),
        venueAPI.getAll()
      ]);
      setTurfs(turfsRes.data?.turfs || []);
      setVenues(venuesRes.data?.venues || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setTurfs([]);
      setVenues([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const data = {
      venue: formData.venueId,
      name: formData.name,
      sportType: formData.sportType,
      pricePerHour: Number(formData.pricePerHour),
      amenities: formData.amenities.split(',').map(a => a.trim()).filter(a => a)
    };

    try {
      if (editingTurf) {
        await turfAPI.update(editingTurf._id, data);
      } else {
        await turfAPI.create(data);
      }
      
      setShowModal(false);
      setFormData({ name: '', venueId: '', sportType: '', pricePerHour: '', amenities: '' });
      setEditingTurf(null);
      fetchData();
    } catch (error) {
      setError(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (turf) => {
    setEditingTurf(turf);
    setFormData({
      name: turf.name,
      venueId: turf.venue?._id || turf.venueId || '',
      sportType: turf.sportType || '',
      pricePerHour: turf.pricePerHour || '',
      amenities: turf.amenities?.join(', ') || '',
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this turf?')) {
      return;
    }

    try {
      await turfAPI.delete(id);
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || 'Delete failed');
    }
  };

  const handleAdd = () => {
    setEditingTurf(null);
    setFormData({ name: '', venueId: '', sportType: '', pricePerHour: '', amenities: '' });
    setShowModal(true);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="admin-management-page">
      <div className="container">
        <div className="page-header">
          <h1>Turf Management</h1>
          <button className="btn-add" onClick={handleAdd}>
            + Add Turf
          </button>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Venue</th>
                <th>Sport Type</th>
                <th>Price/Hour</th>
                <th>Amenities</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {turfs.map((turf) => (
                <tr key={turf._id}>
                  <td>{turf.name}</td>
                  <td>{turf.venue?.name || '-'}</td>
                  <td>{turf.sportType || '-'}</td>
                  <td>₹{turf.pricePerHour || '-'}</td>
                  <td>{turf.amenities?.join(', ') || '-'}</td>
                  <td>
                    <button 
                      className="btn-edit"
                      onClick={() => handleEdit(turf)}
                    >
                      Edit
                    </button>
                    <button 
                      className="btn-delete"
                      onClick={() => handleDelete(turf._id)}
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
              <h2>{editingTurf ? 'Edit Turf' : 'Add Turf'}</h2>
              
              {error && <div className="error-message">{error}</div>}
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Turf Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Venue *</label>
                  <select
                    value={formData.venueId}
                    onChange={(e) => setFormData({ ...formData, venueId: e.target.value })}
                    required
                  >
                    <option value="">Select Venue</option>
                    {venues.map((venue) => (
                      <option key={venue._id} value={venue._id}>
                        {venue.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Sport Type *</label>
                  <select
                    value={formData.sportType}
                    onChange={(e) => setFormData({ ...formData, sportType: e.target.value })}
                    required
                  >
                    <option value="">Select Sport Type</option>
                    <option value="CRICKET">Cricket</option>
                    <option value="FOOTBALL">Football</option>
                    <option value="BADMINTON">Badminton</option>
                    <option value="BASKETBALL">Basketball</option>
                    <option value="PICKLEBALL">Pickleball</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Price Per Hour *</label>
                  <input
                    type="number"
                    value={formData.pricePerHour}
                    onChange={(e) => setFormData({ ...formData, pricePerHour: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Amenities (comma-separated)</label>
                  <input
                    type="text"
                    value={formData.amenities}
                    onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                    placeholder="Parking, Washroom, Changing Room"
                  />
                </div>

                <div className="modal-actions">
                  <button type="submit" className="btn-submit">
                    {editingTurf ? 'Update' : 'Create'}
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

export default TurfManagement;
