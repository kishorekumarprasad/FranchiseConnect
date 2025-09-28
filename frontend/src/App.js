import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';

// Import separated components
import Page from './components/Page';
import Home from './components/Home';
import Franchises from './components/Franchises';
import About from './components/About';
import Contact from './components/Contact';
import Reviews from './components/Reviews';
import UnifiedLogin from './components/UnifiedLogin';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import OwnerSubmit from './components/OwnerSubmit';

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [adminData, setAdminData] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage for theme preference
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    // Check for existing login sessions
    const userStatus = localStorage.getItem('userLoggedIn');
    const adminStatus = localStorage.getItem('adminLoggedIn');
    const storedUserData = localStorage.getItem('userData');
    const storedAdminData = localStorage.getItem('adminData');

    if (userStatus === 'true' && storedUserData) {
      setIsUserLoggedIn(true);
      setUserData(JSON.parse(storedUserData));
    }

    if (adminStatus === 'true' && storedAdminData) {
      setIsAdminLoggedIn(true);
      setAdminData(JSON.parse(storedAdminData));
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleLogin = (userData, role) => {
    if (role === 'admin') {
      setIsAdminLoggedIn(true);
      setAdminData(userData);
      // Clear any user session
      setIsUserLoggedIn(false);
      setUserData(null);
      localStorage.removeItem('userLoggedIn');
      localStorage.removeItem('userData');
    } else {
      setIsUserLoggedIn(true);
      setUserData(userData);
      // Clear any admin session
      setIsAdminLoggedIn(false);
      setAdminData(null);
      localStorage.removeItem('adminLoggedIn');
      localStorage.removeItem('adminData');
    }
  };

  const handleUserLogout = () => {
    setIsUserLoggedIn(false);
    setUserData(null);
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userData');
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setAdminData(null);
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminData');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <Router>
      <div className={`app${darkMode ? ' dark' : ''}`}>
        {/* Show navigation only for regular users */}
        {isUserLoggedIn && (
        <nav className="navbar">
          <div className="nav-brand">
            <Link to="/" onClick={closeMobileMenu}>FranchiseConnect</Link>
          </div>
          
          {/* Hamburger Menu Button */}
          <button 
            className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          
          <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
            <Link to="/" onClick={closeMobileMenu}>Home</Link>
            <Link to="/franchises" onClick={closeMobileMenu}>Franchises</Link>
            <Link to="/about" onClick={closeMobileMenu}>About</Link>
            <Link to="/contact" onClick={closeMobileMenu}>Contact</Link>
            <Link to="/reviews" onClick={closeMobileMenu}>Reviews</Link>
            <Link to="/submit-franchise" onClick={closeMobileMenu}>Submit Franchise</Link>
            <Link to="/dashboard" className="dashboard-link" onClick={closeMobileMenu}>Dashboard</Link>
            <button onClick={handleUserLogout} className="logout-nav-button">
              Logout
            </button>
            {/* Dark mode toggle button */}
            <button className="dark-mode-toggle" onClick={toggleDarkMode} aria-label="Toggle dark mode">
              {darkMode ? '🌙' : '☀️'}
            </button>
          </div>
        </nav>
        )}
        
        <main className="main-content">
          <Routes>
            {/* Login route - redirect to appropriate dashboard if already logged in */}
            <Route 
              path="/login" 
              element={
                isUserLoggedIn ? 
                <Navigate to="/dashboard" replace /> : 
                isAdminLoggedIn ? 
                <Navigate to="/admin" replace /> : 
                <UnifiedLogin onLogin={handleLogin} />
              } 
            />
            
            {/* Admin Dashboard Route - only accessible to admins */}
            <Route 
              path="/admin" 
              element={
                isAdminLoggedIn ? 
                <AdminDashboard onLogout={handleAdminLogout} /> : 
                <Navigate to="/login" replace />
              } 
            />
            
            {/* User Dashboard Route - only accessible to users */}
            <Route 
              path="/dashboard" 
              element={
                isUserLoggedIn ? 
                <Page><UserDashboard userData={userData} onLogout={handleUserLogout} /></Page> : 
                <Navigate to="/login" replace />
              } 
            />
            
            {/* User-only routes - redirect admins to admin dashboard */}
            <Route 
              path="/" 
              element={
                isAdminLoggedIn ? 
                <Navigate to="/admin" replace /> :
                !isUserLoggedIn ? 
                <Navigate to="/login" replace /> : 
                <Page><Home /></Page>
              } 
            />
            
            <Route 
              path="/franchises" 
              element={
                isAdminLoggedIn ? 
                <Navigate to="/admin" replace /> :
                !isUserLoggedIn ? 
                <Navigate to="/login" replace /> : 
                <Page><Franchises /></Page>
              } 
            />
            
            <Route 
              path="/about" 
              element={
                isAdminLoggedIn ? 
                <Navigate to="/admin" replace /> :
                !isUserLoggedIn ? 
                <Navigate to="/login" replace /> : 
                <Page><About /></Page>
              } 
            />
            
            <Route 
              path="/contact" 
              element={
                isAdminLoggedIn ? 
                <Navigate to="/admin" replace /> :
                !isUserLoggedIn ? 
                <Navigate to="/login" replace /> : 
                <Page><Contact /></Page>
              } 
            />
            
            <Route 
              path="/reviews" 
              element={
                isAdminLoggedIn ? 
                <Navigate to="/admin" replace /> :
                !isUserLoggedIn ? 
                <Navigate to="/login" replace /> : 
                <Page><Reviews /></Page>
              } 
            />

            <Route 
              path="/submit-franchise" 
              element={
                isAdminLoggedIn ? 
                <Navigate to="/admin" replace /> :
                !isUserLoggedIn ? 
                <Navigate to="/login" replace /> : 
                <Page><OwnerSubmit /></Page>
              } 
            />
          </Routes>
        </main>
        
        {/* Only show footer for regular users */}
        {isUserLoggedIn && (
        <footer className="footer">
          <p>&copy; 2024 FranchiseConnect. All rights reserved.</p>
        </footer>
        )}
      </div>
    </Router>
  );
}

export default App;
