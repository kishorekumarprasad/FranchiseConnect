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
      setMessage('Submitted! Admin will review your franchise.');
      setForm({ name: '', category: '', investmentMin: '', investmentMax: '', description: '', image: '', features: '' });
    } catch (err) {
      setMessage(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <div className="owner-submit">
        <h2>Submit Your Franchise</h2>
        <p>Provide your franchise details for admin approval.</p>
        <form onSubmit={handleSubmit} className="owner-submit-form">
          <div className="form-group">
            <label>Name *</label>
            <input name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Category *</label>
            <input name="category" value={form.category} onChange={handleChange} required />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Investment Min (₹) *</label>
              <input type="number" name="investmentMin" value={form.investmentMin} onChange={handleChange} min={80000} required />
            </div>
            <div className="form-group">
              <label>Investment Max (₹) *</label>
              <input type="number" name="investmentMax" value={form.investmentMax} onChange={handleChange} max={1000000} required />
            </div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows="4" />
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input name="image" value={form.image} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Features (comma-separated)</label>
            <input name="features" value={form.features} onChange={handleChange} placeholder="Delivery, Training, ..." />
          </div>
          {message && <div className="form-message">{message}</div>}
          <motion.button type="submit" className="submit-button" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit for Review'}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default OwnerSubmit;


