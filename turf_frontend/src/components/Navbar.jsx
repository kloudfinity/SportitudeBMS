import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, isAdmin, isAuthenticated, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">⚽</span>
          SPORTITUDE
        </Link>

        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/turfs" className="nav-link">Gallery</Link>
          </li>

          {isAuthenticated && !isAdmin && (
            <li className="nav-item">
              <Link to="/my-bookings" className="nav-link">My Bookings</Link>
            </li>
          )}

          {isAdmin && (
            <li className="nav-item">
              <Link to="/admin/dashboard" className="nav-link">Dashboard</Link>
            </li>
          )}

          {!isAuthenticated ? (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link btn-primary">Register</Link>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <div className="user-menu">
                <span className="user-name">{user?.name || user?.email}</span>
                <button onClick={logout} className="nav-link btn-logout">
                  Logout
                </button>
              </div>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
