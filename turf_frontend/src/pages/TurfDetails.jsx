import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { turfAPI, venueAPI, slotAPI, bookingAPI } from '../services/apiService';
import { useAuth } from '../context/AuthContext';
import { format } from 'date-fns';
import '../styles/TurfDetails.css';

const TurfDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const [turf, setTurf] = useState(null);
  const [venues, setVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchTurfDetails();
  }, [id]);

  useEffect(() => {
    if (selectedVenue && selectedDate) {
      fetchSlots();
    }
  }, [selectedVenue, selectedDate]);

  const fetchTurfDetails = async () => {
    try {
      const [turfRes, venuesRes] = await Promise.all([
        turfAPI.getById(id),
        venueAPI.getByTurf(id)
      ]);
      
      setTurf(turfRes.data);
      setVenues(venuesRes.data || []);
      
      if (venuesRes.data && venuesRes.data.length > 0) {
        setSelectedVenue(venuesRes.data[0]._id);
      }
    } catch (error) {
      console.error('Error fetching turf details:', error);
      setError('Failed to load turf details');
    } finally {
      setLoading(false);
    }
  };

  const fetchSlots = async () => {
    try {
      const response = await slotAPI.getByVenue(selectedVenue, selectedDate);
      setSlots(response.data || []);
    } catch (error) {
      console.error('Error fetching slots:', error);
      setSlots([]);
    }
  };

  const handleBooking = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!selectedSlot) {
      setError('Please select a slot');
      return;
    }

    setBookingLoading(true);
    setError('');
    setSuccess('');

    try {
      await bookingAPI.create({
        slotId: selectedSlot,
        venueId: selectedVenue,
        bookingDate: selectedDate,
      });
      
      setSuccess('Booking successful! Redirecting to your bookings...');
      setTimeout(() => {
        navigate('/my-bookings');
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!turf) {
    return <div className="error">Turf not found</div>;
  }

  return (
    <div className="turf-details-page">
      <div className="container">
        {/* Turf Header */}
        <div className="turf-header">
          <div className="turf-image-large">
            <img 
              src={turf.image || 'https://via.placeholder.com/800x400?text=Turf+Image'} 
              alt={turf.name}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/800x400?text=Turf+Image';
              }}
            />
          </div>
          
          <div className="turf-info">
            <h1>{turf.name}</h1>
            <p className="location">
              <span className="icon">📍</span>
              {turf.location || 'Location Not Available'}
            </p>
            <p className="description">{turf.description}</p>
            
            {turf.amenities && turf.amenities.length > 0 && (
              <div className="amenities">
                <h3>Amenities</h3>
                <div className="amenities-list">
                  {turf.amenities.map((amenity, index) => (
                    <span key={index} className="amenity-tag">{amenity}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Booking Section */}
        <div className="booking-section">
          <h2>Book a Slot</h2>
          
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          
          <div className="booking-form">
            {/* Venue Selection */}
            {venues.length > 0 && (
              <div className="form-group">
                <label>Select Venue</label>
                <select
                  value={selectedVenue || ''}
                  onChange={(e) => setSelectedVenue(e.target.value)}
                  className="form-select"
                >
                  {venues.map((venue) => (
                    <option key={venue._id} value={venue._id}>
                      {venue.name} - {venue.sportType}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Date Selection */}
            <div className="form-group">
              <label>Select Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={format(new Date(), 'yyyy-MM-dd')}
                className="form-input"
              />
            </div>

            {/* Slot Selection */}
            {slots.length > 0 ? (
              <div className="slots-section">
                <label>Available Slots</label>
                <div className="slots-grid">
                  {slots.map((slot) => (
                    <button
                      key={slot._id}
                      className={`slot-button ${selectedSlot === slot._id ? 'selected' : ''} ${!slot.isAvailable ? 'unavailable' : ''}`}
                      onClick={() => slot.isAvailable && setSelectedSlot(slot._id)}
                      disabled={!slot.isAvailable}
                    >
                      <div className="slot-time">
                        {slot.startTime} - {slot.endTime}
                      </div>
                      <div className="slot-price">₹{slot.price}</div>
                      {!slot.isAvailable && <div className="slot-status">Booked</div>}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <p className="no-slots">No slots available for the selected date</p>
            )}

            {/* Book Button */}
            <button
              className="btn-book"
              onClick={handleBooking}
              disabled={!selectedSlot || bookingLoading}
            >
              {bookingLoading ? 'Booking...' : 'Book Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TurfDetails;
