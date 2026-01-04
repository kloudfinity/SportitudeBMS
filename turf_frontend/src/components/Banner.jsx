import React from 'react';

const Banner = () => {
  return (
    <section className="banner-section">
      <div className="container">
        <div className="banner-area">
          <h1>Reserve your perfect play space</h1>
          <p>
            Book world-class turfs for football, cricket, and more a space where athletes train, 
            teams compete, and champions are made.
          </p>
          <ul>
            <li>
              <i className="fa-regular fa-clock"></i> 24/7 Availability
            </li>
            <li>
              <i className="fa-regular fa-calendar"></i> Easy Booking
            </li>
          </ul>
          <a href="#booking" className="btn btn-primary">
            Book Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default Banner;
