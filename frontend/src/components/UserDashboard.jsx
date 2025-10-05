import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

const UserDashboard = ({ userData, onLogout }) => {
  const [userInquiries, setUserInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch user-specific inquiries from sessionStorage
  const fetchUserInquiries = useCallback(() => {
    try {
      const userId = userData?.id;
      if (!userId) {
        setUserInquiries([]);
        setLoading(false);
        return;
      }

      const storedInquiries = sessionStorage.getItem(`userInquiries_${userId}`);
      if (storedInquiries) {
        setUserInquiries(JSON.parse(storedInquiries));
      } else {
        // Initialize with empty array for new users
        setUserInquiries([]);
        sessionStorage.setItem(`userInquiries_${userId}`, JSON.stringify([]));
      }
    } catch (error) {
      console.error('Error fetching user inquiries:', error);
      setUserInquiries([]);
    } finally {
      setLoading(false);
    }
  }, [userData?.id]);

  useEffect(() => {
    fetchUserInquiries();
    
    // Listen for storage changes to update inquiries in real-time
    const handleStorageChange = (e) => {
      const userId = userData?.id;
      if (e.key === `userInquiries_${userId}`) {
        fetchUserInquiries();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events for same-tab updates
    const handleInquiryUpdate = (event) => {
      if (event.detail?.userId === userData?.id) {
        fetchUserInquiries();
      }
    };

    window.addEventListener('inquirySubmitted', handleInquiryUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('inquirySubmitted', handleInquiryUpdate);
    };
  }, [userData?.id, fetchUserInquiries]);

  const handleLogout = () => {
    sessionStorage.removeItem('userLoggedIn');
    sessionStorage.removeItem('userData');
    onLogout();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="user-dashboard">
        <div className="dashboard-header">
          <div className="user-info">
            <h1>Welcome, {userData?.name}!</h1>
            <p>Manage your franchise opportunities and inquiries</p>
            <p className="user-email">Email: {userData?.email}</p>
          </div>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>Total Inquiries</h3>
            <p>{userInquiries.length}</p>
          </div>
          <div className="stat-card">
            <h3>Pending</h3>
            <p>{userInquiries.filter(inquiry => inquiry.status === 'Pending').length}</p>
          </div>
          <div className="stat-card">
            <h3>In Progress</h3>
            <p>{userInquiries.filter(inquiry => inquiry.status === 'In Progress').length}</p>
          </div>
          <div className="stat-card">
            <h3>Completed</h3>
            <p>{userInquiries.filter(inquiry => inquiry.status === 'Completed').length}</p>
          </div>
        </div>

        <div className="user-inquiries-section">
          <h2>My Franchise Inquiries</h2>
          {loading ? (
            <div className="loading">Loading your inquiries...</div>
          ) : (
            <div className="inquiries-list">
              {userInquiries.map((inquiry) => (
                <motion.div
                  key={inquiry.id}
                  className="inquiry-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="inquiry-header">
                    <h3>{inquiry.brand}</h3>
                    <span className={`status-badge ${inquiry.status.toLowerCase().replace(' ', '-')}`}>
                      {inquiry.status}
                    </span>
                  </div>
                  <p className="inquiry-date">Submitted: {formatDate(inquiry.date)}</p>
                  <p className="inquiry-message">{inquiry.message}</p>
                </motion.div>
              ))}
              
              {userInquiries.length === 0 && (
                <div className="no-inquiries">
                  <p>You haven't submitted any inquiries yet.</p>
                  <motion.button
                    className="explore-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.href = '/franchises'}
                  >
                    Explore Franchises
                  </motion.button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <motion.button
              className="action-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/franchises'}
            >
              Browse New Franchises
            </motion.button>
            <motion.button
              className="action-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/contact'}
            >
              Contact Support
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserDashboard; 