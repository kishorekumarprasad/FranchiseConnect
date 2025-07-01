# FranchiseHub - Franchise Platform

A modern, full-stack franchise discovery platform built with React, Node.js, and MongoDB. This platform connects entrepreneurs with franchise opportunities through an intuitive interface and comprehensive admin dashboard.

## 🚀 Features

### Frontend Features
- **Modern UI/UX**: Beautiful, responsive design with smooth animations
- **Animated Testimonials**: Enhanced reviews section with animated testimonials
- **Search & Filter**: Advanced search and category filtering for franchises
- **Inquiry System**: Direct inquiry forms for franchise opportunities
- **Admin Dashboard**: Complete admin panel for managing inquiries
- **Responsive Design**: Mobile-first approach with cross-device compatibility

### Backend Features
- **RESTful API**: Complete API for brands, categories, and inquiries
- **MongoDB Integration**: Scalable database for storing franchise data
- **Admin Authentication**: Secure admin login system
- **Data Management**: CRUD operations for franchise brands and inquiries

## 📁 Project Structure

```
franchise/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   └── animated-testimonials.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Franchises.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Reviews.jsx
│   │   │   ├── AdminLogin.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   └── Page.jsx
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
├── backend/
│   ├── index.js
│   └── package.json
└── README.md
```

## 🛠️ Technology Stack

### Frontend
- **React 18**: Modern React with hooks and functional components
- **React Router**: Client-side routing
- **Framer Motion**: Smooth animations and transitions
- **CSS3**: Custom styling with responsive design

### Backend
- **Node.js**: Server-side JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kishorekumarprasad/franchise.git
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
   Create a `.env` file in the backend directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```

5. **Start the backend server**
   ```bash
   cd backend
   npm start
   ```

6. **Start the frontend development server**
   ```bash
   cd frontend
   npm start
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📱 Component Architecture

### Core Components

1. **Home.jsx**: Landing page with hero section and featured brands
2. **Franchises.jsx**: Complete franchise listing with search and filtering
3. **Reviews.jsx**: Enhanced testimonials with animated components
4. **About.jsx**: Company information and values
5. **Contact.jsx**: Contact form and company details
6. **AdminLogin.jsx**: Admin authentication interface
7. **AdminDashboard.jsx**: Admin panel for managing inquiries

### UI Components

1. **animated-testimonials.jsx**: Reusable animated testimonials component
2. **Page.jsx**: Page wrapper with consistent transitions

## 🎨 Key Features Explained

### Animated Testimonials
The enhanced reviews section features:
- Smooth entrance animations for each testimonial
- Professional profile images with circular borders
- Gradient accent bars for visual appeal
- Responsive grid layout
- Hover effects and interactions

### Admin Dashboard
Complete admin functionality including:
- Real-time inquiry management
- Statistics dashboard
- Data export capabilities
- Secure authentication
- Responsive admin interface

### Search & Filter System
Advanced franchise discovery with:
- Real-time search functionality
- Category-based filtering
- Dynamic result updates
- User-friendly interface

## 🔧 API Endpoints

### Brands
- `GET /api/brands` - Get all franchise brands
- `POST /api/brands` - Add new franchise brand
- `PUT /api/brands/:id` - Update franchise brand
- `DELETE /api/brands/:id` - Delete franchise brand

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Add new category

### Inquiries
- `GET /api/inquiries` - Get all inquiries (admin only)
- `POST /api/inquiries` - Submit new inquiry

## 🎯 Admin Access

**Default Admin Credentials:**
- Username: `admin`
- Password: `admin123`

**Note**: In production, implement proper JWT authentication and secure password management.

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first approach
- Tablet and desktop optimizations
- Touch-friendly interactions
- Adaptive layouts for all screen sizes

## 🚀 Deployment

### Frontend Deployment
```bash
cd frontend
npm run build
```

### Backend Deployment
```bash
cd backend
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Kishore Kumar Prasad**
- GitHub: [@kishorekumarprasad](https://github.com/kishorekumarprasad)

## 🙏 Acknowledgments

- Unsplash for high-quality images
- Framer Motion for smooth animations
- React community for excellent documentation 