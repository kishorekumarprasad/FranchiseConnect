import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const UnifiedLogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [role, setRole] = useState('user'); // user | owner | admin
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Check for admin credentials first
      if (role === 'admin' && credentials.email === 'admin' && credentials.password === 'admin123') {
        const adminData = {
          id: 1,
          username: credentials.email,
          role: 'admin',
          permissions: ['manage_inquiries', 'manage_brands', 'view_analytics']
        };
        
        localStorage.setItem('adminLoggedIn', 'true');
        localStorage.setItem('adminData', JSON.stringify(adminData));
        onLogin(adminData, 'admin');
        navigate('/admin-dashboard');
      }
      // Check for alternative admin credentials
      else if (role === 'admin' && credentials.email === 'admin@example.com' && credentials.password === 'admin123') {
        const adminData = {
          id: 1,
          username: credentials.email,
          role: 'admin',
          permissions: ['manage_inquiries', 'manage_brands', 'view_analytics']
        };
        
        localStorage.setItem('adminLoggedIn', 'true');
        localStorage.setItem('adminData', JSON.stringify(adminData));
        onLogin(adminData, 'admin');
        navigate('/admin-dashboard');
      }
      // Owner route: direct to submission form after lightweight auth
      else if (role === 'owner' && credentials.email && credentials.password) {
        const ownerData = { id: Date.now(), email: credentials.email, role: 'owner' };
        sessionStorage.setItem('userLoggedIn', 'true');
        sessionStorage.setItem('userData', JSON.stringify(ownerData));
        onLogin(ownerData, 'user');
        navigate('/submit-franchise');
      }
      // Regular user route
      else if (role === 'user' && credentials.email && credentials.password) {
        // Check if this is a returning user
        const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const existingUser = existingUsers.find(user => user.email === credentials.email);
        
        if (existingUser && existingUser.password === credentials.password) {
          // Returning user login
          const userData = {
            id: existingUser.id,
            name: existingUser.name,
            email: existingUser.email,
            role: 'user'
          };
          
          sessionStorage.setItem('userLoggedIn', 'true');
          sessionStorage.setItem('userData', JSON.stringify(userData));
          onLogin(userData, 'user');
          navigate('/');
        } else if (!existingUser) {
          // New user registration
          const newUser = {
            id: Date.now(),
            name: credentials.email.split('@')[0], // Use email prefix as name
            email: credentials.email,
            password: credentials.password,
            role: 'user'
          };
          
          // Save new user to localStorage
          existingUsers.push(newUser);
          localStorage.setItem('users', JSON.stringify(existingUsers));
          
          const userData = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: 'user'
          };
          
          sessionStorage.setItem('userLoggedIn', 'true');
          sessionStorage.setItem('userData', JSON.stringify(userData));
          onLogin(userData, 'user');
          navigate('/');
        } else {
          setError('Invalid password for this email address');
        }
      } else {
        setError('Please enter both email and password');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="unified-login">
        <div className="login-card">
          <div className="login-header">
            <h2>Welcome to FranchiseConnect</h2>
            <p className="login-subtitle">Sign in to access your account</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Login as:</label>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="user">User</option>
                <option value="owner">Owner</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="form-group">
              <label>Email or Username:</label>
              <input
                type="text"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                placeholder="Enter your email or username"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                placeholder="Enter your password"
                required
              />
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <motion.button
              type="submit"
              className="login-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </motion.button>
          </form>
          
          <div className="login-footer">
            <p>New users can sign in with any email and password combination</p>
            <p className="security-note">
              ⚠️ This is a demo environment. Use secure authentication in production.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UnifiedLogin; 