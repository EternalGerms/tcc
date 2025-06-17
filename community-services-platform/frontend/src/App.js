import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from '@mui/material';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Page Components
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Profile from './pages/Profile';
import ProviderProfile from './pages/ProviderProfile';
import Dashboard from './pages/Dashboard';

// Protected Route Component
import ProtectedRoute from './components/common/ProtectedRoute';

// Styles
import './App.css';

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if user is logged in on app load
    const token = localStorage.getItem('token');
    if (token) {
      // TODO: Validate token and load user data
    }
  }, [dispatch]);

  return (
    <div className="App">
      <Navbar />
      <Container maxWidth="xl" sx={{ minHeight: 'calc(100vh - 200px)', mt: 3, mb: 3 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/provider/:id" element={<ProviderProfile />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}

export default App; 