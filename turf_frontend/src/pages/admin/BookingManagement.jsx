import React, { useState, useEffect } from 'react';
import { bookingAPI } from '../../services/apiService';
import { format } from 'date-fns';
import '../../styles/AdminManagement.css';

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await bookingAPI.getAll();
      setBookings(response.data?.bookings || response.data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await bookingAPI.update(id, { status });
      fetchBookings();
    } catch (error) {
      alert(error.response?.data?.message || 'Update failed');
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="admin-management-page">
      <div className="container">
        <div className="page-header">
          <h1>Booking Management</h1>
          <div className="filter-tabs">
            <button 
              className={filter === 'all' ? 'active' : ''}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={filter === 'confirmed' ? 'active' : ''}
              onClick={() => setFilter('confirmed')}
            >
              Confirmed
            </button>
            <button 
              className={filter === 'cancelled' ? 'active' : ''}
              onClick={() => setFilter('cancelled')}
            >
              Cancelled
            </button>
            <button 
              className={filter === 'completed' ? 'active' : ''}
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
          </div>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>User</th>
                <th>Turf/Venue</th>
                <th>Date</th>
                <th>Time</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking._id.substring(0, 8)}</td>
                  <td>{booking.user?.name || booking.user?.email || '-'}</td>
                  <td>
                    {booking.venue?.turf?.name || '-'}<br />
                    <small>{booking.venue?.name || '-'}</small>
                  </td>
                  <td>{format(new Date(booking.bookingDate), 'PP')}</td>
                  <td>{booking.slot?.startTime} - {booking.slot?.endTime}</td>
                  <td>₹{booking.totalAmount}</td>
                  <td>
                    <span className={`status-badge status-${booking.status}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td>
                    {booking.status === 'confirmed' && (
                      <>
                        <button 
                          className="btn-small btn-success"
                          onClick={() => handleStatusUpdate(booking._id, 'completed')}
                        >
                          Complete
                        </button>
                        <button 
                          className="btn-small btn-danger"
                          onClick={() => handleStatusUpdate(booking._id, 'cancelled')}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredBookings.length === 0 && (
            <div className="no-results">No bookings found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingManagement;
