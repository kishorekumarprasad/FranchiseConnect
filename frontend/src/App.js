import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './App.css';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const Page = ({ children }) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={{ duration: 0.5 }}
    className="page-container"
  >
    {children}
  </motion.div>
);

// Food brands data (fallback)
const defaultFoodBrands = [
  {
    id: 1,
    name: "Burger Palace",
    category: "Fast Food",
    investment: "$150,000 - $300,000",
    description: "Premium burger chain with fresh ingredients and unique recipes",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
    features: ["Fresh ingredients", "Quick service", "Drive-thru available", "Training provided"]
  },
  {
    id: 2,
    name: "Pizza Express",
    category: "Pizza & Italian",
    investment: "$200,000 - $400,000",
    description: "Authentic Italian pizza with wood-fired ovens and premium toppings",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
    features: ["Wood-fired ovens", "Fresh dough", "Premium toppings", "Delivery service"]
  },
  {
    id: 3,
    name: "Taco Fiesta",
    category: "Mexican Food",
    investment: "$100,000 - $250,000",
    description: "Authentic Mexican street food with fresh tortillas and bold flavors",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop",
    features: ["Fresh tortillas", "Authentic recipes", "Quick service", "Catering available"]
  },
  {
    id: 4,
    name: "Sushi Master",
    category: "Japanese Cuisine",
    investment: "$250,000 - $500,000",
    description: "Premium sushi restaurant with expert chefs and fresh fish",
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
    features: ["Expert chefs", "Fresh fish", "Omakase menu", "Private dining"]
  },
  {
    id: 5,
    name: "Coffee Haven",
    category: "Coffee & Beverages",
    investment: "$80,000 - $200,000",
    description: "Artisanal coffee shop with specialty drinks and pastries",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop",
    features: ["Artisanal coffee", "Fresh pastries", "WiFi available", "Loyalty program"]
  },
  {
    id: 6,
    name: "Ice Cream Delight",
    category: "Desserts",
    investment: "$60,000 - $150,000",
    description: "Gourmet ice cream with unique flavors and toppings",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop",
    features: ["Gourmet flavors", "Custom toppings", "Seasonal menu", "Party catering"]
  }
];

// Admin Login Component
const AdminLogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple admin authentication (in production, use proper JWT)
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      onLogin(true);
      localStorage.setItem('adminLoggedIn', 'true');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <Page>
      <div className="admin-login">
        <div className="login-card">
          <h2>Admin Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                required
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <motion.button
              type="submit"
              className="login-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>
          </form>
          <p className="login-hint">Username: admin, Password: admin123</p>
        </div>
      </div>
    </Page>
  );
};

// Admin Dashboard Component
const AdminDashboard = ({ onLogout }) => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/inquiries');
      const data = await response.json();
      setInquiries(data);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
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
    <Page>
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
        </div>

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
    </Page>
  );
};

const Home = () => {
  const [foodBrands, setFoodBrands] = useState(defaultFoodBrands);

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
    <Page>
      <div className="hero-section">
        <h1>Find Your Perfect Franchise Opportunity</h1>
        <p>Connect with top brands and discover franchise opportunities that match your goals</p>
        <motion.button 
          className="cta-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
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
    </Page>
  );
};

const Franchises = () => {
  const [foodBrands, setFoodBrands] = useState(defaultFoodBrands);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    brand: ''
  });

  useEffect(() => {
    // Fetch brands from API
    fetch('http://localhost:5000/api/brands')
      .then(response => response.json())
      .then(data => setFoodBrands(data))
      .catch(error => {
        console.log('Using default brands data:', error);
        setFoodBrands(defaultFoodBrands);
      });

    // Fetch categories
    fetch('http://localhost:5000/api/categories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.log('Error fetching categories:', error));
  }, []);

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inquiryForm),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Thank you for your inquiry! We will contact you soon.');
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
      alert('Error submitting inquiry. Please try again.');
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
    return matchesSearch && matchesCategory;
  });

  return (
    <Page>
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
        </div>

        <div className="results-info">
          <p>Showing {filteredBrands.length} of {foodBrands.length} brands</p>
        </div>
        
        <div className="franchises-grid">
          {filteredBrands.map((brand) => (
            <motion.div 
              key={brand.id}
              className="franchise-detail-card"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
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
                  onClick={() => openInquiryForm(brand)}
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
    </Page>
  );
};

const About = () => (
  <Page>
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
  </Page>
);

const Contact = () => (
  <Page>
    <div className="contact-section">
      <h1>Contact Us</h1>
      <p>Get in touch with our team for any questions about franchise opportunities</p>
      
      <div className="contact-container">
        <div className="contact-form">
          <h3>Send us a Message</h3>
          <form>
            <div className="form-group">
              <label>Name:</label>
              <input type="text" placeholder="Your full name" />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input type="email" placeholder="your.email@example.com" />
            </div>
            <div className="form-group">
              <label>Subject:</label>
              <select>
                <option>General Inquiry</option>
                <option>Franchise Information</option>
                <option>Partnership Opportunity</option>
                <option>Support Request</option>
              </select>
            </div>
            <div className="form-group">
              <label>Message:</label>
              <textarea placeholder="Tell us how we can help you..." rows="5"></textarea>
            </div>
            <motion.button 
              type="submit"
              className="submit-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </motion.button>
          </form>
        </div>
        
        <div className="contact-info">
          <h3>Get in Touch</h3>
          <div className="info-item">
            <h4>Email:</h4>
            <p>info@franchiseplatform.com</p>
          </div>
          <div className="info-item">
            <h4>Phone:</h4>
            <p>+1 (555) 123-4567</p>
          </div>
          <div className="info-item">
            <h4>Address:</h4>
            <p>123 Business Street<br />Suite 100<br />City, State 12345</p>
          </div>
        </div>
      </div>
    </div>
  </Page>
);

const Reviews = () => (
  <Page>
    <div className="reviews-section">
      <h1>Client Reviews</h1>
      <p>Hear from entrepreneurs who found their perfect franchise through our platform</p>
      
      <div className="reviews-grid">
        <div className="review-card">
          <div className="stars">★★★★★</div>
          <p>"Found my dream restaurant franchise through this platform. The process was smooth and the support was incredible!"</p>
          <div className="reviewer">
            <strong>Sarah Johnson</strong>
            <span>Restaurant Owner</span>
          </div>
        </div>
        
        <div className="review-card">
          <div className="stars">★★★★★</div>
          <p>"The platform helped me understand the franchise industry better and connected me with the right opportunity."</p>
          <div className="reviewer">
            <strong>Mike Chen</strong>
            <span>Fitness Center Owner</span>
          </div>
        </div>
        
        <div className="review-card">
          <div className="stars">★★★★★</div>
          <p>"Professional service from start to finish. I'm now running a successful retail franchise thanks to this platform."</p>
          <div className="reviewer">
            <strong>Emily Rodriguez</strong>
            <span>Retail Store Owner</span>
          </div>
        </div>
        
        <div className="review-card">
          <div className="stars">★★★★★</div>
          <p>"The team was very helpful in guiding me through the entire process. Highly recommended!"</p>
          <div className="reviewer">
            <strong>David Thompson</strong>
            <span>Service Business Owner</span>
          </div>
        </div>
      </div>
    </div>
  </Page>
);

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    const adminStatus = localStorage.getItem('adminLoggedIn');
    if (adminStatus === 'true') {
      setIsAdminLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-brand">
            <Link to="/">FranchiseHub</Link>
          </div>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/franchises">Franchises</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/reviews">Reviews</Link>
            {isAdminLoggedIn ? (
              <Link to="/admin">Admin</Link>
            ) : (
              <Link to="/admin-login">Admin Login</Link>
            )}
          </div>
        </nav>
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/franchises" element={<Franchises />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route 
              path="/admin-login" 
              element={
                isAdminLoggedIn ? 
                <Navigate to="/admin" replace /> : 
                <AdminLogin onLogin={setIsAdminLoggedIn} />
              } 
            />
            <Route 
              path="/admin" 
              element={
                isAdminLoggedIn ? 
                <AdminDashboard onLogout={() => setIsAdminLoggedIn(false)} /> : 
                <Navigate to="/admin-login" replace />
              } 
            />
          </Routes>
        </main>
        
        <footer className="footer">
          <p>&copy; 2024 FranchiseHub. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
