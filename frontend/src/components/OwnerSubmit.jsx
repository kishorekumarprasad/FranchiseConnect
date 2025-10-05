import React, { useState } from 'react';
import { motion } from 'framer-motion';

const OwnerSubmit = () => {
  const [form, setForm] = useState({
    name: '',
    category: '',
    investmentMin: '',
    investmentMax: '',
    description: '',
    image: '',
    features: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    try {
      const payload = {
        ...form,
        investmentMin: Number(form.investmentMin),
        investmentMax: Number(form.investmentMax),
      };
      const res = await fetch('http://localhost:5001/api/owner-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Submission failed');
      
      // Save submission to localStorage for owner dashboard
      const submission = {
        id: Date.now().toString(),
        name: form.name,
        category: form.category,
        investmentMin: Number(form.investmentMin),
        investmentMax: Number(form.investmentMax),
        description: form.description,
        image: form.image,
        features: form.features,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      
      const ownerId = JSON.parse(sessionStorage.getItem('userData') || '{}').id;
      if (ownerId) {
        const existingSubmissions = JSON.parse(localStorage.getItem(`ownerSubmissions_${ownerId}`) || '[]');
        existingSubmissions.unshift(submission);
        localStorage.setItem(`ownerSubmissions_${ownerId}`, JSON.stringify(existingSubmissions));
      }
      
      setMessage('Submitted! Admin will review your franchise.');
      setForm({ name: '', category: '', investmentMin: '', investmentMax: '', description: '', image: '', features: '' });
    } catch (err) {
      setMessage(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.4 }}
    >
      <div className="owner-submit-container">
        <div className="submit-header">
          <h2>Submit Your Franchise</h2>
          <p>Share your franchise opportunity with potential investors</p>
        </div>
        
        <form onSubmit={handleSubmit} className="owner-submit-form">
          <div className="form-section">
            <h3>Basic Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Franchise Name *</label>
                <input 
                  id="name"
                  name="name" 
                  value={form.name} 
                  onChange={handleChange} 
                  placeholder="Enter your franchise name"
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category *</label>
                <select 
                  id="category"
                  name="category" 
                  value={form.category} 
                  onChange={handleChange} 
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Fast Food">Fast Food</option>
                  <option value="Pizza & Italian">Pizza & Italian</option>
                  <option value="Mexican Food">Mexican Food</option>
                  <option value="Japanese Cuisine">Japanese Cuisine</option>
                  <option value="Coffee & Beverages">Coffee & Beverages</option>
                  <option value="Desserts">Desserts</option>
                  <option value="Asian Cuisine">Asian Cuisine</option>
                  <option value="Mediterranean">Mediterranean</option>
                  <option value="Barbecue">Barbecue</option>
                  <option value="Healthy Food">Healthy Food</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Investment Details</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="investmentMin">Minimum Investment (₹) *</label>
                <input 
                  id="investmentMin"
                  type="number" 
                  name="investmentMin" 
                  value={form.investmentMin} 
                  onChange={handleChange} 
                  min="50000" 
                  placeholder="50000"
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="investmentMax">Maximum Investment (₹) *</label>
                <input 
                  id="investmentMax"
                  type="number" 
                  name="investmentMax" 
                  value={form.investmentMax} 
                  onChange={handleChange} 
                  min="100000" 
                  placeholder="500000"
                  required 
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Franchise Details</h3>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea 
                id="description"
                name="description" 
                value={form.description} 
                onChange={handleChange} 
                rows="4" 
                placeholder="Describe your franchise opportunity, what makes it unique, target market, etc."
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="image">Image URL</label>
              <input 
                id="image"
                name="image" 
                value={form.image} 
                onChange={handleChange} 
                placeholder="https://example.com/your-franchise-image.jpg"
              />
              <small>Add a high-quality image URL to showcase your franchise</small>
            </div>
            
            <div className="form-group">
              <label htmlFor="features">Key Features</label>
              <input 
                id="features"
                name="features" 
                value={form.features} 
                onChange={handleChange} 
                placeholder="Training provided, Marketing support, Equipment included, etc."
              />
              <small>Separate multiple features with commas</small>
            </div>
          </div>

          {message && (
            <div className={`form-message ${message.includes('Submitted') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}
          
          <motion.button 
            type="submit" 
            className="submit-button" 
            whileHover={{ scale: 1.02 }} 
            whileTap={{ scale: 0.98 }} 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                Submitting...
              </>
            ) : (
              'Submit for Review'
            )}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default OwnerSubmit;


