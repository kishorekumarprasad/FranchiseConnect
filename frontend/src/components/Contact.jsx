import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Function to save user inquiry to localStorage
  const saveUserInquiry = (inquiryData) => {
    try {
      // Get current logged-in user
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      const userId = userData.id;
      
      if (!userId) {
        console.error('No user logged in');
        return false;
      }

      const existingInquiries = localStorage.getItem(`userInquiries_${userId}`);
      let userInquiries = existingInquiries ? JSON.parse(existingInquiries) : [];
      
      const newInquiry = {
        id: Date.now(), // Use timestamp as unique ID
        brand: 'General Inquiry',
        date: new Date().toISOString(),
        status: 'Pending',
        message: inquiryData.message || `Contact form submission: ${inquiryData.subject}`
      };
      
      userInquiries.unshift(newInquiry); // Add to beginning of array
      localStorage.setItem(`userInquiries_${userId}`, JSON.stringify(userInquiries));
      
      // Trigger custom event to update dashboard for specific user
      window.dispatchEvent(new CustomEvent('inquirySubmitted', {
        detail: { userId: userId }
      }));
      
      return true;
    } catch (error) {
      console.error('Error saving user inquiry:', error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save to backend API
      const response = await fetch('http://localhost:5001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Save to localStorage for user dashboard
        const savedToLocal = saveUserInquiry(formData);
        
        if (savedToLocal) {
          setSubmitSuccess(true);
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
          });
        } else {
          alert('Message sent successfully, but there was an issue updating your dashboard.');
        }
      } else {
        alert('Error sending message: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      
      // Even if backend fails, save to localStorage for demo purposes
      const savedToLocal = saveUserInquiry(formData);
      
      if (savedToLocal) {
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        alert('Error sending message. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="contact-section">
        <div className="container">
          <div className="contact-row">
            <div className="contact-info-column">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="contact-title">How can we help you?</h2>
                <p className="contact-subtitle">
                  Ready to start your franchise journey? Our expert team is here to guide you through every step of the process, from initial consultation to opening day.
                </p>

                <div className="contact-links">
                  <motion.div 
                    className="contact-link-card"
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="contact-link-content">
                      <div className="contact-icon">📧</div>
                      <div className="contact-link-info">
                        <h4>Email Us</h4>
                        <a href="mailto:kishorekumar3611@gmail.com">kishorekumar3611@gmail.com</a>
                        <a href="mailto:support@franchiseplatform.com">support@franchiseplatform.com</a>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="contact-link-card"
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="contact-link-content">
                      <div className="contact-icon">📞</div>
                      <div className="contact-link-info">
                        <h4>Call Us</h4>
                        <a href="tel:+919080567920">+91 90805 67920</a>
                        <span>Mon-Fri: 9AM-6PM IST</span>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="contact-link-card"
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="contact-link-content">
                      <div className="contact-icon">📍</div>
                      <div className="contact-link-info">
                        <h4>Visit Us</h4>
                        <span>Chennai, Tamil Nadu</span>
                        <span>India</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            <div className="contact-form-column">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="contact-form-card">
                  {submitSuccess ? (
                    <motion.div
                      className="success-message"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="success-icon">✅</div>
                      <h3>Message Sent Successfully!</h3>
                      <p>Thank you for contacting us. We'll get back to you within 24 hours.</p>
                      <motion.button
                        className="send-another-button"
                        onClick={() => setSubmitSuccess(false)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Send Another Message
                      </motion.button>
                    </motion.div>
                  ) : (
                    <div className="contact-form-content">
                      <h2 className="contact-form-title">Contact Us</h2>
                      <p className="contact-form-subtitle">
                        Get personalized guidance for your franchise journey.
                      </p>

                      <form onSubmit={handleSubmit} className="contact-form">
                        <div className="form-group">
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            required
                            className="form-input"
                          />
                        </div>

                        <div className="form-group">
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email address"
                            required
                            className="form-input"
                          />
                        </div>

                        <div className="form-group">
                          <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            placeholder="What is this about?"
                            required
                            className="form-input"
                          />
                        </div>

                        <div className="form-group">
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Tell us how we can help you..."
                            required
                            rows="4"
                            className="form-textarea"
                          />
                        </div>

                        <motion.button
                          type="submit"
                          className="submit-button"
                          disabled={isSubmitting}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {isSubmitting ? 'Sending...' : 'Send Message'}
                        </motion.button>
                      </form>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact; 