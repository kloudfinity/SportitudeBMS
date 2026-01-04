import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Banner from './components/Banner';
import About from './components/About';
import BookingForm from './components/BookingForm';
import Gallery from './components/Gallery';
import Footer from './components/Footer';

function HomePage() {
  return (
    <>
      <Banner />
      <BookingForm />
      <About />
      <Gallery />
    </>
  );
}

function AdminRedirect() {
  useEffect(() => {
    window.location.href = 'https://sportitude-bms-admin.vercel.app';
  }, []);

  return (
    <div className="container text-center py-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Redirecting to Admin Panel...</span>
      </div>
      <p className="mt-3">Redirecting to Admin Panel...</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="wrapper">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminRedirect />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
