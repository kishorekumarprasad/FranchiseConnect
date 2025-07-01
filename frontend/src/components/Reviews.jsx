import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AnimatedTestimonials } from './ui/animated-testimonials';

const Reviews = () => {
  const navigate = useNavigate();
  
  const franchiseTestimonials = [
    {
      quote: "Found my dream restaurant franchise through this platform. The process was smooth and the support was incredible! I'm now running a successful Burger Palace location.",
      name: "Sarah Chen",
      designation: "Restaurant Owner at Burger Palace",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote: "The platform helped me understand the franchise industry better and connected me with the right opportunity. I'm now a proud Pizza Express franchisee.",
      name: "Michael Rodriguez",
      designation: "Franchise Owner at Pizza Express",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote: "Professional service from start to finish. The team guided me through every step of the franchise acquisition process. Highly recommended!",
      name: "Emily Watson",
      designation: "Coffee Haven Franchisee",
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote: "Outstanding support and robust features. The platform made it easy to compare different franchise opportunities and make an informed decision.",
      name: "James Kim",
      designation: "Sushi Master Franchise Owner",
      src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote: "The scalability and performance have been game-changing for our franchise network. This platform is essential for any aspiring entrepreneur.",
      name: "Lisa Thompson",
      designation: "Taco Fiesta Multi-Unit Owner",
      src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const stats = [
    { number: "500+", label: "Successful Franchises" },
    { number: "98%", label: "Satisfaction Rate" },
    { number: "50+", label: "Brand Partners" },
    { number: "24/7", label: "Support Available" },
  ];

  return (
    <motion.div 
      className="reviews-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="reviews-header">
        <h1>Client Success Stories</h1>
        <p>Hear from entrepreneurs who found their perfect franchise through our platform</p>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="stat-number">{stat.number}</h3>
              <p className="stat-label">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Animated Testimonials */}
      <div className="testimonials-section">
        <h2>What Our Franchisees Say</h2>
        <AnimatedTestimonials testimonials={franchiseTestimonials} />
      </div>

      {/* Call to Action */}
      <div className="reviews-cta">
        <motion.div
          className="cta-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3>Ready to Start Your Franchise Journey?</h3>
          <p>Join hundreds of successful entrepreneurs who found their perfect franchise opportunity</p>
          <motion.button
            className="cta-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/franchises')}
          >
            Explore Franchise Opportunities
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Reviews; 