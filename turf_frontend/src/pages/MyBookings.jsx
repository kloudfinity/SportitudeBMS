import React, { useState, useEffect } from 'react';
import { bookingAPI } from '../services/apiService';
import { format } from 'date-fns';
import '../styles/MyBookings.css';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await bookingAPI.getUserBookings();
      setBookings(response.data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    try {
      await bookingAPI.cancel(bookingId);
      setBookings(bookings.map(booking => 
        booking._id === bookingId 
          ? { ...booking, status: 'cancelled' }
          : booking
      ));
    } catch (error) {
      console.error('Error cancelling booking:', error);
      alert('Failed to cancel booking');
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="my-bookings-page">
      <div className="container">
        <h1 className="page-title">My Bookings</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        {bookings.length === 0 ? (
          <div className="no-bookings">
            <p>You don't have any bookings yet.</p>
            <a href="/turfs" className="btn-primary">Browse Turfs</a>
          </div>
        ) : (
          <div className="bookings-list">
            {bookings.map((booking) => (
              <div key={booking._id} className="booking-card">
                <div className="booking-header">
                  <h3>{booking.venue?.name || 'Venue'}</h3>
                  <span className={`status-badge status-${booking.status}`}>
                    {booking.status}
                  </span>
                </div>
                
                <div className="booking-details">
                  <p><strong>Turf:</strong> {booking.venue?.turf?.name || 'N/A'}</p>
                  <p><strong>Date:</strong> {format(new Date(booking.bookingDate), 'PPP')}</p>
                  <p><strong>Time:</strong> {booking.slot?.startTime} - {booking.slot?.endTime}</p>
                  <p><strong>Price:</strong> ₹{booking.totalAmount}</p>
                  <p><strong>Booking ID:</strong> {booking._id}</p>
                </div>
                
                {booking.status === 'confirmed' && (
                  <div className="booking-actions">
                    <button 
                      className="btn-cancel"
                      onClick={() => handleCancel(booking._id)}
                    >
                      Cancel Booking
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
