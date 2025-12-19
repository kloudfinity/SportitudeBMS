import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { turfAPI, cityAPI } from '../services/apiService';
import TurfCard from '../components/TurfCard';
import '../styles/TurfList.css';

const TurfList = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [turfs, setTurfs] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    city: searchParams.get('city') || '',
    search: '',
  });

  useEffect(() => {
    fetchCities();
  }, []);

  useEffect(() => {
    fetchTurfs();
  }, [filters]);

  const fetchCities = async () => {
    try {
      const response = await cityAPI.getAll();
      setCities(response.data?.cities || []);
    } catch (error) {
      console.error('Error fetching cities:', error);
      setCities([]);
    }
  };

  const fetchTurfs = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.city) params.city = filters.city;
      if (filters.search) params.search = filters.search;
      
      const response = await turfAPI.getAll(params);
      setTurfs(response.data?.turfs || []);
    } catch (error) {
      console.error('Error fetching turfs:', error);
      setTurfs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="turf-list-page">
      <div className="container">
        <h1 className="page-title">Browse Turfs</h1>
        
        {/* Filters */}
        <div className="filters-section">
          <div className="filter-group">
            <input
              type="text"
              name="search"
              placeholder="Search turfs..."
              value={filters.search}
              onChange={handleFilterChange}
              className="search-input"
            />
          </div>
          
          <div className="filter-group">
            <select
              name="city"
              value={filters.city}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="">All Cities</option>
              {cities.map((city) => (
                <option key={city._id} value={city._id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="loading">Loading turfs...</div>
        ) : turfs.length === 0 ? (
          <div className="no-results">
            <p>No turfs found. Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="turfs-grid">
            {turfs.map((turf) => (
              <TurfCard
                key={turf._id}
                turf={turf}
                onClick={() => navigate(`/turfs/${turf._id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TurfList;
