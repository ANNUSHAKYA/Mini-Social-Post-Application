import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// Create Axios Instance with dynamic Base URL
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Set Authorization Header helper
const setAuthHeader = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is stored in localStorage on mount
  useEffect(() => {
    const checkLoggedIn = async () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          setAuthHeader(parsed.token);
          
          // Verify token by fetching current user details
          const res = await api.get('/auth/me');
          setUser({ ...res.data, token: parsed.token });
        } catch (error) {
          console.error('Session verification failed', error);
          localStorage.removeItem('user');
          setAuthHeader(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkLoggedIn();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      setUser(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
      setAuthHeader(res.data.token);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
      };
    }
  };

  const signup = async (username, email, password, avatar) => {
    try {
      const res = await api.post('/auth/signup', { username, email, password, avatar });
      setUser(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
      setAuthHeader(res.data.token);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Signup failed',
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setAuthHeader(null);
    setUser(null);
  };

  const addPoints = async (amount) => {
    if (!user) return { success: false };
    try {
      const res = await api.put('/auth/points', { amount });
      const updatedUser = { ...user, points: res.data.points };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return { success: true, points: res.data.points };
    } catch (error) {
      console.error('Failed to update points', error);
      return { success: false };
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, addPoints }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
