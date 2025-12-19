import apiClient from './api';

// User Authentication
export const userAuthAPI = {
  register: (data) => apiClient.post('/users/register', data),
  login: (data) => apiClient.post('/users/login', data),
  getProfile: () => apiClient.get('/users/profile'),
};

// Admin Authentication
export const adminAuthAPI = {
  register: (data) => apiClient.post('/admin/register', data),
  login: (data) => apiClient.post('/admin/login', data),
  getProfile: () => apiClient.get('/admin/profile'),
};

// Cities
export const cityAPI = {
  getAll: () => apiClient.get('/cities'),
  getById: (id) => apiClient.get(`/cities/${id}`),
  create: (data) => apiClient.post('/cities', data),
  update: (id, data) => apiClient.put(`/cities/${id}`, data),
  delete: (id) => apiClient.delete(`/cities/${id}`),
};

// Turfs
export const turfAPI = {
  getAll: (params) => apiClient.get('/turfs', { params }),
  getById: (id) => apiClient.get(`/turfs/${id}`),
  create: (data) => apiClient.post('/turfs', data),
  update: (id, data) => apiClient.put(`/turfs/${id}`, data),
  delete: (id) => apiClient.delete(`/turfs/${id}`),
};

// Venues
export const venueAPI = {
  getAll: (params) => apiClient.get('/venues', { params }),
  getById: (id) => apiClient.get(`/venues/${id}`),
  getByTurf: (turfId) => apiClient.get(`/venues/turf/${turfId}`),
  create: (data) => apiClient.post('/venues', data),
  update: (id, data) => apiClient.put(`/venues/${id}`, data),
  delete: (id) => apiClient.delete(`/venues/${id}`),
};

// Slots
export const slotAPI = {
  getAll: (params) => apiClient.get('/slots', { params }),
  getById: (id) => apiClient.get(`/slots/${id}`),
  getByVenue: (venueId, date) => apiClient.get(`/slots/venue/${venueId}`, { params: { date } }),
  create: (data) => apiClient.post('/slots', data),
  update: (id, data) => apiClient.put(`/slots/${id}`, data),
  delete: (id) => apiClient.delete(`/slots/${id}`),
};

// Bookings
export const bookingAPI = {
  getAll: (params) => apiClient.get('/bookings', { params }),
  getById: (id) => apiClient.get(`/bookings/${id}`),
  getUserBookings: () => apiClient.get('/bookings/user/my-bookings'),
  create: (data) => apiClient.post('/bookings', data),
  update: (id, data) => apiClient.put(`/bookings/${id}`, data),
  cancel: (id) => apiClient.put(`/bookings/${id}/cancel`),
  delete: (id) => apiClient.delete(`/bookings/${id}`),
};
