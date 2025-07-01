import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AdminDashboard = ({ onLogout }) => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      // Fetch from backend API
      const response = await fetch('http://localhost:5000/api/inquiries');
      const apiInquiries = await response.json();
      
      // Fetch from localStorage (all user inquiries)
      const localStorageInquiries = [];
      const keys = Object.keys(localStorage);
      
      keys.forEach(key => {
        if (key.startsWith('userInquiries_')) {
          try {
            const userInquiries = JSON.parse(localStorage.getItem(key));
            if (Array.isArray(userInquiries)) {
              userInquiries.forEach(inquiry => {
                localStorageInquiries.push({
                  _id: inquiry.id,
                  name: inquiry.name || 'User Inquiry',
                  email: inquiry.email || 'user@example.com',
                  phone: inquiry.phone || 'N/A',
                  brand: inquiry.brand,
                  message: inquiry.message,
                  createdAt: inquiry.date,
                  status: inquiry.status,
                  source: 'localStorage'
                });
              });
            }
          } catch (error) {
            console.error('Error parsing localStorage inquiry:', error);
          }
        }
      });
      
      // Combine and sort all inquiries by date (newest first)
      const allInquiries = [...apiInquiries, ...localStorageInquiries];
      allInquiries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      setInquiries(allInquiries);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      // If API fails, still try to get localStorage inquiries
      const localStorageInquiries = [];
      const keys = Object.keys(localStorage);
      
      keys.forEach(key => {
        if (key.startsWith('userInquiries_')) {
          try {
            const userInquiries = JSON.parse(localStorage.getItem(key));
            if (Array.isArray(userInquiries)) {
              userInquiries.forEach(inquiry => {
                localStorageInquiries.push({
                  _id: inquiry.id,
                  name: inquiry.name || 'User Inquiry',
                  email: inquiry.email || 'user@example.com',
                  phone: inquiry.phone || 'N/A',
                  brand: inquiry.brand,
                  message: inquiry.message,
                  createdAt: inquiry.date,
                  status: inquiry.status,
                  source: 'localStorage'
                });
              });
            }
          } catch (error) {
            console.error('Error parsing localStorage inquiry:', error);
          }
        }
      });
      
      localStorageInquiries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setInquiries(localStorageInquiries);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
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
      <div className="admin-dashboard">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>Total Inquiries</h3>
            <p>{inquiries.length}</p>
          </div>
          <div className="stat-card">
            <h3>This Month</h3>
            <p>{inquiries.filter(inquiry => {
              const inquiryDate = new Date(inquiry.createdAt);
              const now = new Date();
              return inquiryDate.getMonth() === now.getMonth() && 
                     inquiryDate.getFullYear() === now.getFullYear();
            }).length}</p>
          </div>
          <div className="stat-card">
            <h3>From API</h3>
            <p>{inquiries.filter(inquiry => !inquiry.source).length}</p>
          </div>
          <div className="stat-card">
            <h3>From Users</h3>
            <p>{inquiries.filter(inquiry => inquiry.source === 'localStorage').length}</p>
          </div>
        </div>

        <div className="inquiries-section">
          <h2>All Inquiries</h2>
          {loading ? (
            <div className="loading">Loading inquiries...</div>
          ) : (
            <div className="inquiries-table">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Brand</th>
                    <th>Status</th>
                    <th>Message</th>
                    <th>Source</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.map((inquiry) => (
                    <tr key={inquiry._id}>
                      <td>{formatDate(inquiry.createdAt)}</td>
                      <td>{inquiry.name}</td>
                      <td>{inquiry.email}</td>
                      <td>{inquiry.phone || 'N/A'}</td>
                      <td>{inquiry.brand}</td>
                      <td>
                        <span className={`status-badge ${inquiry.status?.toLowerCase().replace(' ', '-') || 'pending'}`}>
                          {inquiry.status || 'Pending'}
                        </span>
                      </td>
                      <td>
                        <div className="message-preview">
                          {inquiry.message ? 
                            (inquiry.message.length > 50 ? 
                              inquiry.message.substring(0, 50) + '...' : 
                              inquiry.message
                            ) : 'No message'
                          }
                        </div>
                      </td>
                      <td>
                        <span className={`source-badge ${inquiry.source === 'localStorage' ? 'user' : 'api'}`}>
                          {inquiry.source === 'localStorage' ? 'User' : 'API'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {inquiries.length === 0 && (
                <div className="no-inquiries">
                  <p>No inquiries found.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard; 