import React from 'react';
import '../styles/TurfCard.css';

const TurfCard = ({ turf, onClick }) => {
  return (
    <div className="turf-card" onClick={onClick}>
      <div className="turf-card-image">
        <img 
          src={turf.image || '/placeholder-turf.jpg'} 
          alt={turf.name}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=Turf+Image';
          }}
        />
        {turf.featured && <span className="badge-featured">Featured</span>}
      </div>
      
      <div className="turf-card-content">
        <h3 className="turf-name">{turf.name}</h3>
        <p className="turf-location">
          <span className="icon">📍</span>
          {turf.location || 'Location Not Available'}
        </p>
        
        {turf.description && (
          <p className="turf-description">
            {turf.description.substring(0, 100)}
            {turf.description.length > 100 && '...'}
          </p>
        )}
        
        <div className="turf-card-footer">
          <div className="turf-amenities">
            {turf.amenities?.slice(0, 3).map((amenity, index) => (
              <span key={index} className="amenity-tag">{amenity}</span>
            ))}
          </div>
          <button className="btn-view">View Details</button>
        </div>
      </div>
    </div>
  );
};

export default TurfCard;
