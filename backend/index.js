const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const Inquiry = require('./models/Inquiry');

const app = express();
const PORT = process.env.PORT || 5001;

// In-memory storage for owner-submitted franchises
let ownerSubmissions = [];
let approvedOwnerBrands = [];

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/franchise', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('API is running');
});

// In-memory inquiry status overlay (since DB schema may not have status)
const inquiryStatusById = {};

// Get all inquiries (for admin)
app.get('/api/inquiries', async (req, res) => {
  try {
    const allInquiries = await Inquiry.find().sort({ createdAt: -1 });
    const withStatus = allInquiries.map(i => ({
      ...i.toObject(),
      status: inquiryStatusById[i._id] || 'Pending'
    }));
    res.json(withStatus);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching inquiries', error: error.message });
  }
});

// Submit new inquiry
app.post('/api/inquiries', async (req, res) => {
  try {
    const { name, email, phone, message, brand } = req.body;
    // Validate required fields
    if (!name || !email || !brand) {
      return res.status(400).json({ message: 'Name, email, and brand are required' });
    }
    const inquiry = new Inquiry({ name, email, phone, message, brand });
    await inquiry.save();
    // Default status in memory
    inquiryStatusById[inquiry._id] = 'Pending';
    res.status(201).json({ 
      message: 'Inquiry submitted successfully',
      inquiry: { ...inquiry.toObject(), status: 'Pending' } 
    });
  } catch (error) {
    console.error('Error saving inquiry:', error);
    res.status(500).json({ message: 'Error saving inquiry', error: error.message });
  }
});

// Update inquiry status (approve/reject)
app.patch('/api/inquiries/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body || {};
    const inquiry = await Inquiry.findById(id);
    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }
    if (action === 'approve') inquiryStatusById[id] = 'Approved';
    else if (action === 'reject') inquiryStatusById[id] = 'Rejected';
    else return res.status(400).json({ message: 'Invalid action. Use approve or reject.' });
    res.json({ message: 'Updated', inquiry: { ...inquiry.toObject(), status: inquiryStatusById[id] } });
  } catch (error) {
    res.status(500).json({ message: 'Error updating inquiry', error: error.message });
  }
});

// Get food brands data with search and filtering
app.get('/api/brands', (req, res) => {
  const { search, category, minInvestment, maxInvestment } = req.query;
  
  let foodBrands = [
    {
      id: 1,
      name: "Burger Palace",
      category: "Fast Food",
      investment: "₹80 Thousand - ₹2.5 Lakh",
      investmentMin: 80000,
      investmentMax: 250000,
      description: "Premium burger chain with fresh ingredients and unique recipes",
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
      features: ["Fresh ingredients", "Quick service", "Drive-thru available", "Training provided"],
      location: "Nationwide",
      established: "2015"
    },
    {
      id: 2,
      name: "Pizza Express",
      category: "Pizza & Italian",
      investment: "₹1 Lakh - ₹3 Lakh",
      investmentMin: 100000,
      investmentMax: 300000,
      description: "Authentic Italian pizza with wood-fired ovens and premium toppings",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
      features: ["Wood-fired ovens", "Fresh dough", "Premium toppings", "Delivery service"],
      location: "Nationwide",
      established: "2010"
    },
    {
      id: 3,
      name: "Taco Fiesta",
      category: "Mexican Food",
      investment: "₹60 Thousand - ₹2 Lakh",
      investmentMin: 60000,
      investmentMax: 200000,
      description: "Authentic Mexican street food with fresh tortillas and bold flavors",
      image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop",
      features: ["Fresh tortillas", "Authentic recipes", "Quick service", "Catering available"],
      location: "Southwest US",
      established: "2018"
    },
    {
      id: 4,
      name: "Sushi Master",
      category: "Japanese Cuisine",
      investment: "₹1.5 Lakh - ₹4 Lakh",
      investmentMin: 150000,
      investmentMax: 400000,
      description: "Premium sushi restaurant with expert chefs and fresh fish",
      image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
      features: ["Expert chefs", "Fresh fish", "Omakase menu", "Private dining"],
      location: "Coastal Cities",
      established: "2012"
    },
    {
      id: 5,
      name: "Coffee Haven",
      category: "Coffee & Beverages",
      investment: "₹80 Thousand - ₹1.6 Lakh",
      investmentMin: 80000,
      investmentMax: 160000,
      description: "Artisanal coffee shop with specialty drinks and pastries",
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop",
      features: ["Artisanal coffee", "Fresh pastries", "WiFi available", "Loyalty program"],
      location: "Urban Areas",
      established: "2016"
    },
    {
      id: 6,
      name: "Ice Cream Delight",
      category: "Desserts",
      investment: "₹80 Thousand - ₹1.2 Lakh",
      investmentMin: 80000,
      investmentMax: 120000,
      description: "Gourmet ice cream with unique flavors and toppings",
      image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop",
      features: ["Gourmet flavors", "Custom toppings", "Seasonal menu", "Party catering"],
      location: "Nationwide",
      established: "2019"
    },
    {
      id: 7,
      name: "Thai Spice",
      category: "Asian Cuisine",
      investment: "₹1.2 Lakh - ₹2.8 Lakh",
      investmentMin: 120000,
      investmentMax: 280000,
      description: "Authentic Thai cuisine with fresh herbs and spices",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
      features: ["Fresh herbs", "Authentic recipes", "Takeout service", "Catering"],
      location: "Metropolitan Areas",
      established: "2014"
    },
    {
      id: 8,
      name: "Mediterranean Grill",
      category: "Mediterranean",
      investment: "₹95 Thousand - ₹2.2 Lakh",
      investmentMin: 95000,
      investmentMax: 220000,
      description: "Healthy Mediterranean cuisine with fresh ingredients",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
      features: ["Fresh ingredients", "Healthy options", "Catering service", "Delivery"],
      location: "Nationwide",
      established: "2017"
    },
    {
      id: 9,
      name: "BBQ Smokehouse",
      category: "Barbecue",
      investment: "₹1.6 Lakh - ₹3.5 Lakh",
      investmentMin: 160000,
      investmentMax: 350000,
      description: "Traditional BBQ with smoked meats and homemade sauces",
      image: "https://images.unsplash.com/photo-1558030006-450675393462?w=400&h=300&fit=crop",
      features: ["Smoked meats", "Homemade sauces", "Catering", "Outdoor seating"],
      location: "Southern US",
      established: "2011"
    },
    {
      id: 10,
      name: "Fresh Salad Bar",
      category: "Healthy Food",
      investment: "₹60 Thousand - ₹1.4 Lakh",
      investmentMin: 60000,
      investmentMax: 140000,
      description: "Fresh salads and healthy bowls with organic ingredients",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
      features: ["Organic ingredients", "Custom bowls", "Quick service", "Health-focused"],
      location: "Urban Areas",
      established: "2020"
    },
    {
      id: 11,
      name: "Wing Zone",
      category: "Fast Food",
      investment: "₹70 Thousand - ₹1.7 Lakh",
      investmentMin: 70000,
      investmentMax: 170000,
      description: "Specialty chicken wings with unique sauces and flavors",
      image: "https://images.unsplash.com/photo-1567620832904-9d64b45c9a3a?w=400&h=300&fit=crop",
      features: ["Unique sauces", "Quick service", "Delivery", "Sports bar atmosphere"],
      location: "Nationwide",
      established: "2013"
    },
    {
      id: 12,
      name: "Dessert Paradise",
      category: "Desserts",
      investment: "₹45 Thousand - ₹1.1 Lakh",
      investmentMin: 45000,
      investmentMax: 110000,
      description: "Gourmet desserts and pastries with premium ingredients",
      image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop",
      features: ["Gourmet desserts", "Premium ingredients", "Custom cakes", "Catering"],
      location: "Urban Areas",
      established: "2018"
    }
  ];

  // Include approved owner submissions in the brand list
  const allBrands = foodBrands.concat(approvedOwnerBrands);

  // Apply search filter
  if (search) {
    const searchLower = search.toLowerCase();
    allBrandsCopy = allBrands.filter(brand => 
      brand.name.toLowerCase().includes(searchLower) ||
      brand.category.toLowerCase().includes(searchLower) ||
      brand.description.toLowerCase().includes(searchLower)
    );
  }

  // Apply category filter
  if (category) {
    allBrandsCopy = (typeof allBrandsCopy !== 'undefined' ? allBrandsCopy : allBrands)
      .filter(brand => brand.category === category);
  }

  // Apply investment range filter
  const baseList = typeof allBrandsCopy !== 'undefined' ? allBrandsCopy : allBrands;
  let filtered = baseList;
  if (minInvestment) {
    filtered = filtered.filter(brand => brand.investmentMax >= parseInt(minInvestment));
  }
  if (maxInvestment) {
    filtered = filtered.filter(brand => brand.investmentMin <= parseInt(maxInvestment));
  }
  
  res.json(filtered);
});

// Get unique categories for filtering
app.get('/api/categories', (req, res) => {
  const categories = [
    "Fast Food",
    "Pizza & Italian",
    "Mexican Food",
    "Japanese Cuisine",
    "Coffee & Beverages",
    "Desserts",
    "Asian Cuisine",
    "Mediterranean",
    "Barbecue",
    "Healthy Food"
  ];
  res.json(categories);
});

// Owner submissions APIs (in-memory)
app.post('/api/owner-submissions', (req, res) => {
  const { name, category, investmentMin, investmentMax, description, image, features } = req.body || {};
  if (!name || !category || !investmentMin || !investmentMax) {
    return res.status(400).json({ message: 'name, category, investmentMin, investmentMax are required' });
  }
  const submission = {
    id: Date.now().toString(),
    name,
    category,
    investmentMin: parseInt(investmentMin),
    investmentMax: parseInt(investmentMax),
    description: description || '',
    image: image || 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop',
    features: Array.isArray(features) ? features : (features ? String(features).split(',').map(f => f.trim()).filter(Boolean) : []),
    location: 'Submitted by owner',
    established: new Date().getFullYear().toString(),
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  ownerSubmissions.unshift(submission);
  res.status(201).json({ message: 'Submission received', submission });
});

// List all owner submissions (admin)
app.get('/api/owner-submissions', (req, res) => {
  res.json(ownerSubmissions);
});

// Approve or reject a submission (admin)
app.patch('/api/owner-submissions/:id', (req, res) => {
  const { id } = req.params;
  const { action } = req.body || {};
  const idx = ownerSubmissions.findIndex(s => s.id === id);
  if (idx === -1) {
    return res.status(404).json({ message: 'Submission not found' });
  }
  if (action === 'approve') {
    ownerSubmissions[idx].status = 'approved';
    const s = ownerSubmissions[idx];
    const brand = {
      id: Date.now(),
      name: s.name,
      category: s.category,
      investment: '', // UI formats from numeric values
      investmentMin: s.investmentMin,
      investmentMax: s.investmentMax,
      description: s.description,
      image: s.image,
      features: s.features,
      location: s.location,
      established: s.established
    };
    approvedOwnerBrands.unshift(brand);
  } else if (action === 'reject') {
    ownerSubmissions[idx].status = 'rejected';
  } else {
    return res.status(400).json({ message: 'Invalid action. Use approve or reject.' });
  }
  res.json({ message: 'Updated', submission: ownerSubmissions[idx] });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Using in-memory storage for inquiries (MongoDB not connected)');
}); 