import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Food brands data (fallback)
const defaultFoodBrands = [
  {
    id: 1,
    name: "Burger Palace",
    category: "Fast Food",
    investment: "₹1.2 Cr - ₹2.5 Cr",
    description: "Premium burger chain with fresh ingredients and unique recipes",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    features: ["Fresh ingredients", "Quick service", "Drive-thru available", "Training provided"]
  },
  {
    id: 2,
    name: "Pizza Express",
    category: "Pizza & Italian",
    investment: "₹1.6 Cr - ₹3.2 Cr",
    description: "Authentic Italian pizza with wood-fired ovens and premium toppings",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
    features: ["Wood-fired ovens", "Fresh dough", "Premium toppings", "Delivery service"]
  },
  {
    id: 3,
    name: "Taco Fiesta",
    category: "Mexican Food",
    investment: "₹80 Lakh - ₹2 Cr",
    description: "Authentic Mexican street food with fresh tortillas and bold flavors",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop",
    features: ["Fresh tortillas", "Authentic recipes", "Quick service", "Catering available"]
  },
  {
    id: 4,
    name: "Sushi Master",
    category: "Japanese Cuisine",
    investment: "₹2 Cr - ₹4 Cr",
    description: "Premium sushi restaurant with expert chefs and fresh fish",
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
    features: ["Expert chefs", "Fresh fish", "Omakase menu", "Private dining"]
  },
  {
    id: 5,
    name: "Coffee Haven",
    category: "Coffee & Beverages",
    investment: "₹65 Lakh - ₹1.6 Cr",
    description: "Artisanal coffee shop with specialty drinks and pastries",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop",
    features: ["Artisanal coffee", "Fresh pastries", "WiFi available", "Loyalty program"]
  },
  {
    id: 6,
    name: "Ice Cream Delight",
    category: "Desserts",
    investment: "₹50 Lakh - ₹1.2 Cr",
    description: "Gourmet ice cream with unique flavors and toppings",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop",
    features: ["Gourmet flavors", "Custom toppings", "Seasonal menu", "Party catering"]
  }
];

const Home = () => {
  const [foodBrands, setFoodBrands] = useState(defaultFoodBrands);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch brands from API
    fetch('http://localhost:5000/api/brands')
      .then(response => response.json())
      .then(data => setFoodBrands(data))
      .catch(error => {
        console.log('Using default brands data:', error);
        setFoodBrands(defaultFoodBrands);
      });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="hero-section">
        <h1>Find Your Perfect Franchise Opportunity</h1>
        <p>Connect with top brands and discover franchise opportunities that match your goals</p>
        <motion.button 
          className="cta-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/franchises')}
        >
          Explore Franchises
        </motion.button>
      </div>
      
      <div className="features-section">
        <h2>Why Choose Our Platform?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Verified Brands</h3>
            <p>All franchises are thoroughly vetted and verified for your peace of mind</p>
          </div>
          <div className="feature-card">
            <h3>Expert Guidance</h3>
            <p>Get professional advice and support throughout your franchise journey</p>
          </div>
          <div className="feature-card">
            <h3>Easy Process</h3>
            <p>Simple inquiry process to connect you directly with franchise opportunities</p>
          </div>
        </div>
      </div>

      <div className="food-brands-section">
        <h2>Featured Food Brands</h2>
        <p>Discover exciting opportunities in the food industry</p>
        <div className="food-brands-grid">
          {foodBrands.slice(0, 3).map((brand) => (
            <motion.div 
              key={brand.id}
              className="food-brand-card"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="brand-image">
                <img src={brand.image} alt={brand.name} />
              </div>
              <div className="brand-info">
                <h3>{brand.name}</h3>
                <p className="brand-category">{brand.category}</p>
                <p className="brand-investment">{brand.investment}</p>
                <p className="brand-description">{brand.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="view-all-container">
          <Link to="/franchises" className="view-all-button">
            View All Food Brands
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Home; 