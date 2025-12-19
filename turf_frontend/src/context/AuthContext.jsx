import React, { createContext, useState, useContext, useEffect } from 'react';
import { userAuthAPI, adminAuthAPI } from '../services/apiService';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    const adminFlag = localStorage.getItem('isAdmin');
    
    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
        setIsAdmin(adminFlag === 'true');
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('isAdmin');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await userAuthAPI.login({ email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isAdmin', 'false');
      
      setUser(user);
      setIsAdmin(false);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const adminLogin = async (email, password) => {
    try {
      const response = await adminAuthAPI.login({ email, password });
      const { token, admin } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(admin));
      localStorage.setItem('isAdmin', 'true');
      
      setUser(admin);
      setIsAdmin(true);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Admin login failed' 
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await userAuthAPI.register(userData);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isAdmin', 'false');
      
      setUser(user);
      setIsAdmin(false);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Registration failed' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isAdmin');
    setUser(null);
    setIsAdmin(false);
  };

  const value = {
    user,
    isAdmin,
    loading,
    login,
    adminLogin,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
