import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Food brands data (fallback)
const defaultFoodBrands = [
  {
    id: 1,
    name: "Burger Palace",
    category: "Fast Food",
    investment: "₹1.2 Cr - ₹2.5 Cr",
    investmentMin: 12000000,
    investmentMax: 25000000,
    description: "Premium burger chain with fresh ingredients and unique recipes",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    features: ["Fresh ingredients", "Quick service", "Drive-thru available", "Training provided"]
  },
  {
    id: 2,
    name: "Pizza Express",
    category: "Pizza & Italian",
    investment: "₹1.6 Cr - ₹3.2 Cr",
    investmentMin: 16000000,
    investmentMax: 32000000,
    description: "Authentic Italian pizza with wood-fired ovens and premium toppings",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
    features: ["Wood-fired ovens", "Fresh dough", "Premium toppings", "Delivery service"]
  },
  {
    id: 3,
    name: "Taco Fiesta",
    category: "Mexican Food",
    investment: "₹80 Lakh - ₹2 Cr",
    investmentMin: 8000000,
    investmentMax: 20000000,
    description: "Authentic Mexican street food with fresh tortillas and bold flavors",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop",
    features: ["Fresh tortillas", "Authentic recipes", "Quick service", "Catering available"]
  },
  {
    id: 4,
    name: "Sushi Master",
    category: "Japanese Cuisine",
    investment: "₹2 Cr - ₹4 Cr",
    investmentMin: 20000000,
    investmentMax: 40000000,
    description: "Premium sushi restaurant with expert chefs and fresh fish",
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
    features: ["Expert chefs", "Fresh fish", "Omakase menu", "Private dining"]
  },
  {
    id: 5,
    name: "Coffee Haven",
    category: "Coffee & Beverages",
    investment: "₹65 Lakh - ₹1.6 Cr",
    investmentMin: 6500000,
    investmentMax: 16000000,
    description: "Artisanal coffee shop with specialty drinks and pastries",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop",
    features: ["Artisanal coffee", "Fresh pastries", "WiFi available", "Loyalty program"]
  },
  {
    id: 6,
    name: "Ice Cream Delight",
    category: "Desserts",
    investment: "₹50 Lakh - ₹1.2 Cr",
    investmentMin: 5000000,
    investmentMax: 12000000,
    description: "Gourmet ice cream with unique flavors and toppings",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop",
    features: ["Gourmet flavors", "Custom toppings", "Seasonal menu", "Party catering"]
  }
];

const Franchises = () => {
  const [foodBrands, setFoodBrands] = useState(defaultFoodBrands);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [categories, setCategories] = useState([]);
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    brand: ''
  });

  // Price range options
  const priceRanges = [
    { value: '', label: 'All Prices' },
    { value: 'under-1cr', label: 'Under ₹1 Cr', max: 10000000 },
    { value: '1cr-2cr', label: '₹1 Cr - ₹2 Cr', min: 10000000, max: 20000000 },
    { value: '2cr-3cr', label: '₹2 Cr - ₹3 Cr', min: 20000000, max: 30000000 },
    { value: '3cr-4cr', label: '₹3 Cr - ₹4 Cr', min: 30000000, max: 40000000 },
    { value: 'above-4cr', label: 'Above ₹4 Cr', min: 40000000 }
  ];

  useEffect(() => {
    // Fetch brands from API
    fetch('http://localhost:5000/api/brands')
      .then(response => response.json())
      .then(data => setFoodBrands(data))
      .catch(error => {
        console.log('Using default brands data:', error);
        setFoodBrands(defaultFoodBrands);
      });

    // Fetch categories from API or use fallback
    fetch('http://localhost:5000/api/categories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => {
        console.log('Using fallback categories:', error);
        // Extract unique categories from the default brands data
        const uniqueCategories = [...new Set(defaultFoodBrands.map(brand => brand.category))];
        setCategories(uniqueCategories);
      });
  }, []);

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
        name: inquiryData.name,
        email: inquiryData.email,
        phone: inquiryData.phone,
        brand: inquiryData.brand,
        date: new Date().toISOString(),
        status: 'Pending',
        message: inquiryData.message || `Inquiry about ${inquiryData.brand} franchise opportunity.`
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

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save to backend API
      const response = await fetch('http://localhost:5000/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inquiryForm),
      });

      const data = await response.json();

      if (response.ok) {
        // Save to localStorage for user dashboard
        const savedToLocal = saveUserInquiry(inquiryForm);
        
        if (savedToLocal) {
          alert('Thank you for your inquiry! We will contact you soon.');
        } else {
          alert('Inquiry submitted successfully, but there was an issue updating your dashboard.');
        }
        
        setShowInquiryForm(false);
        setInquiryForm({
          name: '',
          email: '',
          phone: '',
          message: '',
          brand: ''
        });
      } else {
        alert('Error submitting inquiry: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      
      // Even if backend fails, save to localStorage for demo purposes
      const savedToLocal = saveUserInquiry(inquiryForm);
      
      if (savedToLocal) {
        alert('Inquiry saved to your dashboard. We will contact you soon.');
        setShowInquiryForm(false);
        setInquiryForm({
          name: '',
          email: '',
          phone: '',
          message: '',
          brand: ''
        });
      } else {
        alert('Error submitting inquiry. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const openInquiryForm = (brand) => {
    setSelectedBrand(brand);
    setInquiryForm(prev => ({ ...prev, brand: brand.name }));
    setShowInquiryForm(true);
  };

  const filteredBrands = foodBrands.filter(brand => {
    const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         brand.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || brand.category === selectedCategory;
    
    // Price range filtering
    let matchesPrice = true;
    if (selectedPriceRange) {
      const selectedRange = priceRanges.find(range => range.value === selectedPriceRange);
      if (selectedRange) {
        if (selectedRange.max && selectedRange.min) {
          // Range with both min and max - check for overlap
          matchesPrice = brand.investmentMin <= selectedRange.max && brand.investmentMax >= selectedRange.min;
        } else if (selectedRange.max) {
          // Under a certain amount
          matchesPrice = brand.investmentMin <= selectedRange.max;
        } else if (selectedRange.min) {
          // Above a certain amount
          matchesPrice = brand.investmentMax >= selectedRange.min;
        }
      }
    }
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="franchises-section">
        <h1>Food Franchise Opportunities</h1>
        <p>Explore our curated selection of food and beverage franchise opportunities</p>
        
        {/* Search and Filter Section */}
        <div className="search-filter-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search brands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="filter-box">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-filter"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="filter-box">
            <select
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
              className="price-filter"
            >
              {priceRanges.map(range => (
                <option key={range.value} value={range.value}>{range.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="results-info">
          <p>Showing {filteredBrands.length} of {foodBrands.length} brands</p>
        </div>
        
        <div className={`franchises-grid ${filteredBrands.length === 1 ? 'single-card' : ''}`}>
          {filteredBrands.map((brand) => (
            <motion.div 
              key={brand.id}
              className="franchise-detail-card"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              onClick={() => openInquiryForm(brand)}
              style={{ cursor: 'pointer' }}
            >
              <div className="franchise-image">
                <img src={brand.image} alt={brand.name} />
              </div>
              <div className="franchise-content">
                <h3>{brand.name}</h3>
                <p className="franchise-category">{brand.category}</p>
                <p className="franchise-investment">
                  <strong>Investment:</strong> {brand.investment}
                </p>
                <p className="franchise-description">{brand.description}</p>
                
                <div className="franchise-features">
                  <h4>Key Features:</h4>
                  <ul>
                    {brand.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                
                <motion.button
                  className="inquiry-button"
                  onClick={e => { e.stopPropagation(); openInquiryForm(brand); }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Enquire About This Brand
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredBrands.length === 0 && (
          <div className="no-results">
            <p>No brands found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Inquiry Modal */}
      {showInquiryForm && (
        <div className="modal-overlay" onClick={() => setShowInquiryForm(false)}>
          <motion.div 
            className="inquiry-modal"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Enquire About {selectedBrand?.name}</h3>
              <button 
                className="close-button"
                onClick={() => setShowInquiryForm(false)}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleInquirySubmit} className="inquiry-form">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  value={inquiryForm.name}
                  onChange={(e) => setInquiryForm(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  value={inquiryForm.email}
                  onChange={(e) => setInquiryForm(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  value={inquiryForm.phone}
                  onChange={(e) => setInquiryForm(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
              
              <div className="form-group">
                <label>Message</label>
                <textarea
                  value={inquiryForm.message}
                  onChange={(e) => setInquiryForm(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Tell us about your interest in this franchise opportunity..."
                  rows="4"
                />
              </div>
              
              <div className="form-actions">
                <motion.button
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowInquiryForm(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isSubmitting}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  className="submit-inquiry-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default Franchises; 