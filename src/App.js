import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// Components for protected routes

// Components for unprotected routes
import Home from './components/Home';
import About from './components/About';
import NotFound from './components/NotFound';

// Components for authentication
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import ProfilePage from './components/ProfilePage';

// A function to check if the user is authenticated
const isAuthenticated = () => {
  // Check if the user is logged in or not
  // You can implement your own logic to check authentication
  return false; // For example, always return true for demo purposes
}

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Unprotected routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        {/* Login and Signup routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes */}
        <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />
        <Route path="/profile" element={<ProtectedRoute component={ProfilePage} />} />

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

// A component for protected routes
const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    isAuthenticated() ? (
      <Component {...rest} />
    ) : (
      <Navigate to="/login" replace />
    )
  )
}

export default App;
