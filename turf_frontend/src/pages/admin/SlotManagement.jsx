import React, { useState, useEffect } from 'react';
import { slotAPI, venueAPI } from '../../services/apiService';
import '../../styles/AdminManagement.css';

const SlotManagement = () => {
  const [slots, setSlots] = useState([]);
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);
  const [formData, setFormData] = useState({
    venueId: '',
    startTime: '',
    endTime: '',
    price: '',
    isAvailable: true,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [slotsRes, venuesRes] = await Promise.all([
        slotAPI.getAll(),
        venueAPI.getAll()
      ]);
      setSlots(slotsRes.data?.slots || []);
      setVenues(venuesRes.data?.venues || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setSlots([]);
      setVenues([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (editingSlot) {
        await slotAPI.update(editingSlot._id, formData);
      } else {
        await slotAPI.create(formData);
      }
      
      setShowModal(false);
      setFormData({ venueId: '', startTime: '', endTime: '', price: '', isAvailable: true });
      setEditingSlot(null);
      fetchData();
    } catch (error) {
      setError(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (slot) => {
    setEditingSlot(slot);
    setFormData({
      venueId: slot.venue?._id || slot.venueId || '',
      startTime: slot.startTime || '',
      endTime: slot.endTime || '',
      price: slot.price || '',
      isAvailable: slot.isAvailable !== undefined ? slot.isAvailable : true,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this slot?')) {
      return;
    }

    try {
      await slotAPI.delete(id);
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || 'Delete failed');
    }
  };

  const handleAdd = () => {
    setEditingSlot(null);
    setFormData({ venueId: '', startTime: '', endTime: '', price: '', isAvailable: true });
    setShowModal(true);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="admin-management-page">
      <div className="container">
        <div className="page-header">
          <h1>Slot Management</h1>
          <button className="btn-add" onClick={handleAdd}>
            + Add Slot
          </button>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Venue</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Price</th>
                <th>Available</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {slots.map((slot) => (
                <tr key={slot._id}>
                  <td>{slot.venue?.name || '-'}</td>
                  <td>{slot.startTime}</td>
                  <td>{slot.endTime}</td>
                  <td>₹{slot.price}</td>
                  <td>{slot.isAvailable ? '✅ Yes' : '❌ No'}</td>
                  <td>
                    <button 
                      className="btn-edit"
                      onClick={() => handleEdit(slot)}
                    >
                      Edit
                    </button>
                    <button 
                      className="btn-delete"
                      onClick={() => handleDelete(slot._id)}
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
              <h2>{editingSlot ? 'Edit Slot' : 'Add Slot'}</h2>
              
              {error && <div className="error-message">{error}</div>}
              
              <form onSubmit={handleSubmit}>
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
                        {venue.name} - {venue.turf?.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Start Time *</label>
                  <input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>End Time *</label>
                  <input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Price *</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={formData.isAvailable}
                      onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                    />
                    {' '}Available
                  </label>
                </div>

                <div className="modal-actions">
                  <button type="submit" className="btn-submit">
                    {editingSlot ? 'Update' : 'Create'}
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

export default SlotManagement;
