import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AdminLogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simple admin authentication (in production, use proper JWT)
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      const adminData = {
        id: 1,
        username: credentials.username,
        role: 'admin',
        permissions: ['manage_inquiries', 'manage_brands', 'view_analytics']
      };
      
      localStorage.setItem('adminLoggedIn', 'true');
      localStorage.setItem('adminData', JSON.stringify(adminData));
      onLogin(adminData);
    } else {
      setError('Invalid admin credentials');
    }
    
    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="admin-login">
        <div className="login-card admin-login-card">
          <h2>Admin Access</h2>
          <p className="login-subtitle">Administrator login for franchise management</p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                placeholder="Enter admin username"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                placeholder="Enter admin password"
                required
              />
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <motion.button
              type="submit"
              className="login-button admin-login-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Admin Login'}
            </motion.button>
          </form>
          
          <div className="login-footer">
            <p className="demo-credentials">
              <strong>Demo Admin:</strong> admin / admin123
            </p>
            <p className="security-note">
              ⚠️ This is a demo environment. Use secure credentials in production.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminLogin; 