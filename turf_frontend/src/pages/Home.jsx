import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cityAPI, turfAPI } from '../services/apiService';
import TurfCard from '../components/TurfCard';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [cities, setCities] = useState([]);
  const [featuredTurfs, setFeaturedTurfs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [citiesRes, turfsRes] = await Promise.all([
        cityAPI.getAll(),
        turfAPI.getAll({ limit: 6 })
      ]);
      
      setCities(citiesRes.data?.cities || []);
      setFeaturedTurfs(turfsRes.data?.turfs || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Reserve your perfect<br />play space</h1>
          <p className="hero-subtitle">
            Book world-class turfs for football, cricket, and more a space<br />where athletes train, teams compete, and champions are made.
          </p>
          
          <div className="hero-features">
            <div className="feature-item">
              <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                <polyline points="12 6 12 12 16 14" strokeWidth="2"/>
              </svg>
              <span>24/7 Availability</span>
            </div>
            <div className="feature-item">
              <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2"/>
                <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2"/>
                <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2"/>
                <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"/>
              </svg>
              <span>Easy Booking</span>
            </div>
          </div>

          <button 
            className="btn-hero"
            onClick={() => navigate('/turfs')}
          >
            Book a turf
          </button>
        </div>
      </section>

      {/* Cities Section */}
      {cities.length > 0 && (
        <section className="section cities-section">
          <div className="container">
            <h2 className="section-title">Popular Cities</h2>
            <div className="cities-grid">
              {cities.map((city) => (
                <div 
                  key={city._id} 
                  className="city-card"
                  onClick={() => navigate(`/turfs?city=${city._id}`)}
                >
                  <div className="city-image">
                    <img 
                      src={city.image || 'https://via.placeholder.com/300x200?text=' + city.name}
                      alt={city.name}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x200?text=' + city.name;
                      }}
                    />
                  </div>
                  <h3 className="city-name">{city.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Turfs Section */}
      {featuredTurfs.length > 0 && (
        <section className="section featured-section">
          <div className="container">
            <h2 className="section-title">Featured Turfs</h2>
            <div className="turfs-grid">
              {featuredTurfs.map((turf) => (
                <TurfCard
                  key={turf._id}
                  turf={turf}
                  onClick={() => navigate(`/turfs/${turf._id}`)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="section features-section">
        <div className="container">
          <h2 className="section-title">Why Choose TurfBook?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Easy Search</h3>
              <p>Find the perfect turf in your area with our smart search</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Quick Booking</h3>
              <p>Book your slot in seconds with our streamlined process</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Best Prices</h3>
              <p>Compare prices and get the best deals on turf bookings</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure Payment</h3>
              <p>Safe and secure payment options for hassle-free bookings</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
