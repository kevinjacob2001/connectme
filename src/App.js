import React, { useEffect } from 'react';
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
import { useSelector } from 'react-redux';
import UserPage from './components/UserPage';


const App = () => {


  
// A function to check if the user is authenticated
const isAuthenticated = () => {
  // Check if the user is logged in or not
  // You can implement your own logic to check authentication
  const token = localStorage.getItem('token');
  if(token) return true;
  else return false;

}

const ProtectedRoute = ({ component: Component, ...rest }) => {
  useEffect(() => {
    isAuthenticated();
  }, []);

  return (
    isAuthenticated() ? (
      <Component {...rest} />
    ) : (
      <Navigate to="/login" replace />
    )
  )
}



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
        <Route path="/user/:id" element={<ProtectedRoute component={Dashboard} />} />


        <Route path="/profile" element={<ProtectedRoute component={ProfilePage} />} />
        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
