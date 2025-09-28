import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AdminDashboard = ({ onLogout }) => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ownerSubmissions, setOwnerSubmissions] = useState([]);
  const [activeTab, setActiveTab] = useState('inquiries');

  useEffect(() => {
    fetchInquiries();
    fetchOwnerSubmissions();
  }, []);

  const fetchInquiries = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/inquiries');
      const data = await response.json();
      setInquiries(data);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOwnerSubmissions = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/owner-submissions');
      const data = await res.json();
      setOwnerSubmissions(data);
    } catch (e) {
      console.error('Error fetching submissions', e);
    }
  };

  const updateInquiry = async (id, action) => {
    try {
      await fetch(`http://localhost:5001/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      });
      await fetchInquiries();
    } catch (e) {
      console.error('Update inquiry failed', e);
    }
  };

  const updateSubmission = async (id, action) => {
    try {
      const res = await fetch(`http://localhost:5001/api/owner-submissions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      });
      await res.json();
      await fetchOwnerSubmissions();
    } catch (e) {
      console.error('Update failed', e);
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
        <div className="admin-tabs">
          <button className={activeTab==='inquiries' ? 'active' : ''} onClick={() => setActiveTab('inquiries')}>Inquiries</button>
          <button className={activeTab==='submissions' ? 'active' : ''} onClick={() => setActiveTab('submissions')}>Owner Submissions</button>
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
        </div>

        {activeTab === 'inquiries' && (
          <div className="inquiries-section">
            <h2>Recent Inquiries</h2>
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
                      <th>Message</th>
                      <th>Status</th>
                      <th>Actions</th>
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
                          <div className="message-preview">
                            {inquiry.message ? 
                              (inquiry.message.length > 50 ? 
                                inquiry.message.substring(0, 50) + '...' : 
                                inquiry.message
                              ) : 'No message'
                            }
                          </div>
                        </td>
                        <td>{inquiry.status || 'Pending'}</td>
                        <td>
                          <button onClick={() => updateInquiry(inquiry._id, 'approve')} disabled={inquiry.status==='Approved'}>Approve</button>
                          <button onClick={() => updateInquiry(inquiry._id, 'reject')} disabled={inquiry.status==='Rejected'}>Reject</button>
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
        )}

        {activeTab === 'submissions' && (
          <div className="submissions-section">
            <h2>Owner Submissions</h2>
            <div className="inquiries-table">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Investment</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {ownerSubmissions.map(s => (
                    <tr key={s.id}>
                      <td>{s.name}</td>
                      <td>{s.category}</td>
                      <td>₹{s.investmentMin.toLocaleString()} - ₹{s.investmentMax.toLocaleString()}</td>
                      <td>{s.status}</td>
                      <td>
                        <button onClick={() => updateSubmission(s.id, 'approve')} disabled={s.status==='approved'}>Approve</button>
                        <button onClick={() => updateSubmission(s.id, 'reject')} disabled={s.status==='rejected'}>Reject</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {ownerSubmissions.length === 0 && (
                <div className="no-inquiries">
                  <p>No submissions yet.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AdminDashboard; 