import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="about-section">
        <h1>About Our Platform</h1>
        <p>We are the leading intermediary platform connecting ambitious entrepreneurs with established franchise brands.</p>
        
        <div className="about-content">
          <div className="about-card">
            <h3>Our Mission</h3>
            <p>To simplify the franchise discovery process and help entrepreneurs find the perfect business opportunity that aligns with their goals and investment capacity.</p>
          </div>
          
          <div className="about-card">
            <h3>Our Vision</h3>
            <p>To become the most trusted platform for franchise opportunities, fostering successful partnerships between brands and franchisees.</p>
          </div>
          
          <div className="about-card">
            <h3>Our Values</h3>
            <ul>
              <li>Transparency in all dealings</li>
              <li>Quality assurance for all brands</li>
              <li>Customer satisfaction as priority</li>
              <li>Continuous improvement and innovation</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About; 