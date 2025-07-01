import React, { useState } from 'react';
import { motion } from 'framer-motion';

const UserLogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // For demo purposes, using simple validation
      // In production, this would be an API call
      if (credentials.email === 'user@example.com' && credentials.password === 'user123') {
        const userData = {
          id: 1,
          name: 'John Doe',
          email: credentials.email,
          role: 'user'
        };
        
        localStorage.setItem('userLoggedIn', 'true');
        localStorage.setItem('userData', JSON.stringify(userData));
        onLogin(userData);
      } else {
        setError('Invalid email or password');
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
      <div className="user-login">
        <div className="login-card">
          <h2>Welcome Back</h2>
          <p className="login-subtitle">Sign in to access your franchise opportunities</p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address:</label>
              <input
                type="email"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                placeholder="Enter your email"
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
            <p>Don't have an account? <a href="#" className="signup-link">Sign up</a></p>
            <p className="demo-credentials">
              <strong>Demo User:</strong> user@example.com / user123
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserLogin; 