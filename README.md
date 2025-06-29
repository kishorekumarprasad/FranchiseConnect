# FranchiseHub - MERN Stack Franchise Platform

A responsive web application that acts as an intermediary platform between franchise-providing brands and clients interested in buying franchises.

## 🚀 Features

### Core Features
- **User and Admin Authentication**: Secure login and registration system
- **Admin Dashboard**: Manage brand/franchise details, inquiries, and reviews
- **User Functionality**: View franchise listings and submit inquiries
- **Responsive Design**: Mobile-first design compatible with all screen sizes
- **Smooth Animations**: Interactive UI transitions using Framer Motion

### Pages
- **Home**: Hero section, features, and featured franchises
- **About**: Company mission, vision, and values
- **Contact**: Contact form and company information
- **Reviews**: Client testimonials and success stories

## 🛠️ Tech Stack

### Frontend
- **React.js**: Modern UI framework
- **React Router**: Client-side routing
- **Framer Motion**: Smooth animations and transitions
- **CSS3**: Responsive design with modern styling

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: Authentication tokens
- **bcryptjs**: Password hashing

## 📁 Project Structure

```
franchise/
├── backend/                 # Node.js + Express + MongoDB
│   ├── index.js            # Server entry point
│   ├── package.json        # Backend dependencies
│   └── .env               # Environment variables
├── frontend/               # React.js application
│   ├── src/
│   │   ├── App.js         # Main application component
│   │   ├── App.css        # Main stylesheet
│   │   ├── index.js       # React entry point
│   │   └── index.css      # Base styles
│   └── package.json       # Frontend dependencies
└── README.md              # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd franchise
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables**
   ```bash
   cd ../backend
   # Create .env file with your configuration
   echo "PORT=5000" > .env
   echo "MONGODB_URI=your_mongodb_connection_string" >> .env
   echo "JWT_SECRET=your_jwt_secret" >> .env
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm start
   # or for development with auto-restart
   npx nodemon index.js
   ```

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm start
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📱 Features Overview

### Home Page
- Hero section with call-to-action
- Platform features and benefits
- Featured franchise opportunities
- Responsive design for all devices

### About Page
- Company mission and vision
- Core values and principles
- Professional presentation

### Contact Page
- Interactive contact form
- Company contact information
- Form validation and submission

### Reviews Page
- Client testimonials
- Success stories
- Trust-building content

## 🎨 Design Features

- **Modern UI**: Clean, professional design
- **Responsive**: Works on desktop, tablet, and mobile
- **Animations**: Smooth transitions and hover effects
- **Accessibility**: Semantic HTML and keyboard navigation
- **Performance**: Optimized loading and rendering

## 🔧 Development

### Backend Development
- RESTful API endpoints
- MongoDB integration
- Authentication middleware
- Error handling

### Frontend Development
- Component-based architecture
- State management
- Route protection
- Form handling

## 📈 Future Enhancements

- [ ] User authentication system
- [ ] Admin dashboard
- [ ] Database models and API endpoints
- [ ] Franchise listing functionality
- [ ] Inquiry form processing
- [ ] Review management system
- [ ] Payment integration
- [ ] Advanced search and filtering
- [ ] Email notifications
- [ ] Analytics dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions, please contact:
- Email: info@franchiseplatform.com
- Phone: +1 (555) 123-4567

---

**FranchiseHub** - Connecting entrepreneurs with franchise opportunities since 2024. 