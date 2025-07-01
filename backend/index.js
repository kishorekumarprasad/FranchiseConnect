const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for inquiries (for demo purposes)
let inquiries = [];

// Routes
app.get('/', (req, res) => {
  res.send('API is running');
});

// Get all inquiries (for admin)
app.get('/api/inquiries', async (req, res) => {
  try {
    res.json(inquiries);
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

    const inquiry = {
      _id: Date.now().toString(),
      name,
      email,
      phone,
      message,
      brand,
      createdAt: new Date()
    };

    inquiries.push(inquiry);
    
    res.status(201).json({ 
      message: 'Inquiry submitted successfully',
      inquiry 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting inquiry', error: error.message });
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
      investment: "₹1.2 Cr - ₹2.5 Cr",
      investmentMin: 12000000,
      investmentMax: 25000000,
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
      investment: "₹1.6 Cr - ₹3.2 Cr",
      investmentMin: 16000000,
      investmentMax: 32000000,
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
      investment: "₹80 Lakh - ₹2 Cr",
      investmentMin: 8000000,
      investmentMax: 20000000,
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
      investment: "₹2 Cr - ₹4 Cr",
      investmentMin: 20000000,
      investmentMax: 40000000,
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
      investment: "₹65 Lakh - ₹1.6 Cr",
      investmentMin: 6500000,
      investmentMax: 16000000,
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
      investment: "₹50 Lakh - ₹1.2 Cr",
      investmentMin: 5000000,
      investmentMax: 12000000,
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
      investment: "₹1.4 Cr - ₹2.8 Cr",
      investmentMin: 14000000,
      investmentMax: 28000000,
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
      investment: "₹95 Lakh - ₹2.2 Cr",
      investmentMin: 9500000,
      investmentMax: 22000000,
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
      investment: "₹1.6 Cr - ₹3.5 Cr",
      investmentMin: 16000000,
      investmentMax: 35000000,
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
      investment: "₹60 Lakh - ₹1.4 Cr",
      investmentMin: 6000000,
      investmentMax: 14000000,
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
      investment: "₹70 Lakh - ₹1.7 Cr",
      investmentMin: 7000000,
      investmentMax: 17000000,
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
      investment: "₹45 Lakh - ₹1.1 Cr",
      investmentMin: 4500000,
      investmentMax: 11000000,
      description: "Gourmet desserts and pastries with premium ingredients",
      image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop",
      features: ["Gourmet desserts", "Premium ingredients", "Custom cakes", "Catering"],
      location: "Urban Areas",
      established: "2018"
    }
  ];

  // Apply search filter
  if (search) {
    const searchLower = search.toLowerCase();
    foodBrands = foodBrands.filter(brand => 
      brand.name.toLowerCase().includes(searchLower) ||
      brand.category.toLowerCase().includes(searchLower) ||
      brand.description.toLowerCase().includes(searchLower)
    );
  }

  // Apply category filter
  if (category) {
    foodBrands = foodBrands.filter(brand => brand.category === category);
  }

  // Apply investment range filter
  if (minInvestment) {
    foodBrands = foodBrands.filter(brand => brand.investmentMax >= parseInt(minInvestment));
  }
  if (maxInvestment) {
    foodBrands = foodBrands.filter(brand => brand.investmentMin <= parseInt(maxInvestment));
  }
  
  res.json(foodBrands);
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Using in-memory storage for inquiries (MongoDB not connected)');
}); 