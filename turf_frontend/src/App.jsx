import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

// User Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import TurfList from './pages/TurfList';
import TurfDetails from './pages/TurfDetails';
import MyBookings from './pages/MyBookings';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import CityManagement from './pages/admin/CityManagement';
import TurfManagement from './pages/admin/TurfManagement';
import VenueManagement from './pages/admin/VenueManagement';
import SlotManagement from './pages/admin/SlotManagement';
import BookingManagement from './pages/admin/BookingManagement';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/turfs" element={<TurfList />} />
          <Route path="/turfs/:id" element={<TurfDetails />} />
          
          {/* Protected User Routes */}
          <Route path="/my-bookings" element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          } />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } />
          <Route path="/admin/cities" element={
            <AdminRoute>
              <CityManagement />
            </AdminRoute>
          } />
          <Route path="/admin/turfs" element={
            <AdminRoute>
              <TurfManagement />
            </AdminRoute>
          } />
          <Route path="/admin/venues" element={
            <AdminRoute>
              <VenueManagement />
            </AdminRoute>
          } />
          <Route path="/admin/slots" element={
            <AdminRoute>
              <SlotManagement />
            </AdminRoute>
          } />
          <Route path="/admin/bookings" element={
            <AdminRoute>
              <BookingManagement />
            </AdminRoute>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
