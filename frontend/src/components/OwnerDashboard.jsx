import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import OwnerSubmit from './OwnerSubmit';

const OwnerDashboard = ({ userData, onLogout }) => {
  const [activeTab, setActiveTab] = useState('submit');
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    // Load owner's previous submissions from localStorage
    const ownerSubmissions = JSON.parse(localStorage.getItem(`ownerSubmissions_${userData?.id}`) || '[]');
    setSubmissions(ownerSubmissions);
  }, [userData?.id]);

  const handleLogout = () => {
    sessionStorage.removeItem('userLoggedIn');
    sessionStorage.removeItem('userData');
    onLogout();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="owner-dashboard">
        <div className="owner-header">
          <div className="owner-brand">
            <h1>FranchiseConnect</h1>
            <span className="owner-badge">Owner Portal</span>
          </div>
          <div className="owner-actions">
            <span className="owner-welcome">Welcome, {userData?.name}!</span>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>

        <div className="owner-tabs">
          <button 
            className={`tab-button ${activeTab === 'submit' ? 'active' : ''}`}
            onClick={() => setActiveTab('submit')}
          >
            Submit New Franchise
          </button>
          <button 
            className={`tab-button ${activeTab === 'submissions' ? 'active' : ''}`}
            onClick={() => setActiveTab('submissions')}
          >
            My Submissions ({submissions.length})
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'submit' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <OwnerSubmit />
            </motion.div>
          )}

          {activeTab === 'submissions' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="submissions-section"
            >
              <h2>Your Franchise Submissions</h2>
              {submissions.length === 0 ? (
                <div className="no-submissions">
                  <p>You haven't submitted any franchises yet.</p>
                  <motion.button
                    className="submit-new-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab('submit')}
                  >
                    Submit Your First Franchise
                  </motion.button>
                </div>
              ) : (
                <div className="submissions-list">
                  {submissions.map((submission) => (
                    <motion.div
                      key={submission.id}
                      className="submission-card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="submission-header">
                        <h3>{submission.name}</h3>
                        <span className={`status-badge ${submission.status}`}>
                          {submission.status}
                        </span>
                      </div>
                      <div className="submission-details">
                        <p><strong>Category:</strong> {submission.category}</p>
                        <p><strong>Investment:</strong> ₹{submission.investmentMin?.toLocaleString()} - ₹{submission.investmentMax?.toLocaleString()}</p>
                        <p><strong>Submitted:</strong> {formatDate(submission.createdAt)}</p>
                        {submission.description && (
                          <p><strong>Description:</strong> {submission.description}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default OwnerDashboard;
