import React, { useState } from 'react';

const BookingForm = () => {
  const [activeGame, setActiveGame] = useState('football');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    city: 'Kolkata',
    venue: '',
    groundType: '',
    timeSlots: []
  });

  const games = [
    { id: 'football', name: 'Football', icon: '/assets/images/g1.png' },
    { id: 'cricket', name: 'Cricket', icon: '/assets/images/g2.png' },
    { id: 'pickleball', name: 'Pickleball', icon: '/assets/images/g3.png' },
    { id: 'paintball', name: 'Paintball', icon: '/assets/images/g4.png' }
  ];

  const cities = ['Kolkata', 'Delhi', 'Mumbai'];
  const venues = ['Sector V', 'Park Street', 'Garia'];
  const timeSlots = [
    '11:30 AM-12:30 PM',
    '12:30 PM-01:30 PM',
    '01:30 PM-02:30 PM',
    '02:30 PM-03:30 PM',
    '03:30 PM-04:30 PM',
    '04:30 PM-05:30 PM',
    '05:30 PM-06:30 PM',
    '06:30 PM-07:30 PM',
    '07:30 PM-08:30 PM',
    '08:30 PM-09:30 PM'
  ];

  const handleSlotToggle = (slot) => {
    setFormData(prev => {
      const isSelected = prev.timeSlots.includes(slot);
      if (isSelected) {
        return { ...prev, timeSlots: prev.timeSlots.filter(s => s !== slot) };
      } else {
        return { ...prev, timeSlots: [...prev.timeSlots, slot] };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.timeSlots.length === 0) {
      alert('Please select at least one time slot');
      return;
    }
    setShowModal(true);
  };

  return (
    <section className="book-court-section section-padding" id="booking">
      <div className="container">
        <div className="heading-part text-center">
          <h2>Book Your Court</h2>
          <p>Select your preferred game, date, and time slot to book your court</p>
        </div>

        <div className="court-form-area">
          <div className="nav-area">
            <h3>Choose Your Game</h3>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              {games.map((game) => (
                <li className="nav-item" role="presentation" key={game.id}>
                  <button
                    className={`nav-link ${activeGame === game.id ? 'active' : ''}`}
                    onClick={() => setActiveGame(game.id)}
                    type="button"
                    role="tab"
                  >
                    <img src={game.icon} alt={game.name} /> {game.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="tab-content">
              <div className="tab-pane active" role="tabpanel">
                <div className="booking-form-area">
                  <div className="row gx-5 gy-4">
                    <div className="col-lg">
                      <div className="form-group">
                        <label htmlFor="b_date" className="form-label">
                          Select Date
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="b_date"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg">
                      <div className="form-group">
                        <label htmlFor="b_city" className="form-label">
                          Select Cities
                        </label>
                        <select
                          className="form-select form-control"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        >
                          {cities.map((city) => (
                            <option key={city} value={city}>
                              {city}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-lg">
                      <div className="form-group">
                        <label htmlFor="b_venue" className="form-label">
                          Select Venues
                        </label>
                        <select
                          className="form-select form-control"
                          value={formData.venue}
                          onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                          required
                        >
                          <option value="">Select</option>
                          {venues.map((venue) => (
                            <option key={venue} value={venue}>
                              {venue}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="ground-part">
                    <div className="row top-part justify-content-between">
                      <div className="col-auto">
                        <h4>{activeGame.charAt(0).toUpperCase() + activeGame.slice(1)} Ground (Right Side)</h4>
                        <div className="form-group">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="ground"
                              id="halfground"
                              value="half"
                              onChange={(e) => setFormData({ ...formData, groundType: e.target.value })}
                            />
                            <label className="form-check-label" htmlFor="halfground">
                              Half Ground
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="ground"
                              id="fullground"
                              value="full"
                              onChange={(e) => setFormData({ ...formData, groundType: e.target.value })}
                            />
                            <label className="form-check-label" htmlFor="fullground">
                              Full Ground
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="col-auto rate-hd">
                        <h4>₹5000/hr(Weekdays)</h4>
                        <h4>₹6000/hr(Weekends)</h4>
                      </div>
                    </div>

                    <div className="time-slot-main">
                      <h4>
                        <i className="fa-regular fa-clock"></i> Available Time Slots
                      </h4>
                      <div className="time-slots">
                        {timeSlots.map((slot, index) => (
                          <div className="form-check" key={index}>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="time_slot"
                              id={`slot-${index}`}
                              value={slot}
                              checked={formData.timeSlots.includes(slot)}
                              onChange={() => handleSlotToggle(slot)}
                            />
                            <label className="form-check-label" htmlFor={`slot-${index}`}>
                              {slot}
                              <br />
                              <span>₹5000</span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-100 text-center mt-5">
              <button type="submit" className="btn btn-secondary">
                Book Now
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal fade show booking-modal" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title fs-5">Personal Information</h3>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="form-area">
                  <input type="text" className="form-control" placeholder="Full Name" required />
                  <input type="tel" className="form-control" placeholder="Phone Number" required />
                  <input type="email" className="form-control" placeholder="Email Address" required />
                  <input type="submit" value="Submit" className="btn btn-secondary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showModal && <div className="modal-backdrop fade show" onClick={() => setShowModal(false)}></div>}
    </section>
  );
};

export default BookingForm;
