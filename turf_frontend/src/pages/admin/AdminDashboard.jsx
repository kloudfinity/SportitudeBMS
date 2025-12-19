import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const { user } = useAuth();

  const dashboardCards = [
    {
      title: 'Cities',
      description: 'Manage cities and locations',
      icon: '🏙️',
      link: '/admin/cities',
      color: 'blue'
    },
    {
      title: 'Turfs',
      description: 'Manage turf facilities',
      icon: '⚽',
      link: '/admin/turfs',
      color: 'green'
    },
    {
      title: 'Venues',
      description: 'Manage venues within turfs',
      icon: '🏟️',
      link: '/admin/venues',
      color: 'purple'
    },
    {
      title: 'Slots',
      description: 'Manage time slots',
      icon: '⏰',
      link: '/admin/slots',
      color: 'orange'
    },
    {
      title: 'Bookings',
      description: 'View and manage bookings',
      icon: '📅',
      link: '/admin/bookings',
      color: 'red'
    }
  ];

  return (
    <div className="admin-dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <p>Welcome back, {user?.name || user?.email}!</p>
        </div>

        <div className="dashboard-grid">
          {dashboardCards.map((card, index) => (
            <Link 
              key={index}
              to={card.link}
              className={`dashboard-card ${card.color}`}
            >
              <div className="card-icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
