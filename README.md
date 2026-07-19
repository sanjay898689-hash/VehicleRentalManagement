# 🚗 Vehicle Rental Management System

A modern, full-stack Vehicle Rental Management application built with MERN (MongoDB, Express, React, Node.js) and featuring a premium, responsive UI inspired by leading rental platforms like Uber, Zoomcar, and Enterprise.

## 📋 Features

### Backend Features
- ✅ User Authentication & Authorization (JWT)
- ✅ Vehicle Management (CRUD operations)
- ✅ Booking Management System
- ✅ Payment Integration Ready
- ✅ Admin Dashboard
- ✅ Advanced Filtering & Search
- ✅ Rating & Reviews System
- ✅ Comprehensive Error Handling
- ✅ RESTful API Architecture

### Frontend Features
- ✅ Modern Glassmorphism Design
- ✅ Responsive Layout (Mobile, Tablet, Desktop)
- ✅ Advanced Filtering & Search
- ✅ Real-time Booking System
- ✅ User Dashboard
- ✅ Admin Dashboard
- ✅ Smooth Animations (Framer Motion)
- ✅ Toast Notifications
- ✅ Protected Routes
- ✅ Context API for State Management

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests
- **Multer** - File uploads

### Frontend
- **React 18** - UI Library
- **Vite** - Build tool
- **React Router DOM** - Routing
- **Axios** - HTTP Client
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Icons** - Icon Library
- **Context API** - State Management

## 📁 Project Structure

```
├── backend/
│   ├── config/
│   │   └── db.js
│   │   └── Booking.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── vehicleController.js
│   │   └── bookingController.js
│   │   ├── authRoutes.js
│   │   ├── vehicleRoutes.js
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   ├── VehicleCard.jsx
    │   │   ├── BookingCard.jsx
    │   │   ├── DashboardCard.jsx
    │   │   ├── Loader.jsx
    │   │   ├── Modal.jsx
    │   │   └── Toast.jsx
    │   ├── pages/
    │   │   ├── LandingPage.jsx
    │   │   ├── LoginPage.jsx
    │   │   ├── RegisterPage.jsx
    │   │   ├── VehiclesPage.jsx
    │   │   ├── VehicleDetailsPage.jsx
    │   │   ├── DashboardPage.jsx
    │   │   └── BookingDetailsPage.jsx
    │   ├── layouts/
    │   │   ├── MainLayout.jsx
    │   │   └── AdminLayout.jsx
    │   ├── context/
    │   │   ├── AuthContext.jsx
    │   │   └── ToastContext.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── utils/
    │   │   ├── helpers.js
    │   │   └── ProtectedRoute.jsx
    │   ├── styles/
    │   │   └── index.css
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── package.json
    └── vite.config.js
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file**
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/vehicleRentalDB
   JWT_SECRET=your_jwt_secret_key_here
   ```

4. **Start the server**
   ```bash
   npm run dev
   ```
   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   Application will open on `http://localhost:5173`

   ### Local Troubleshooting & Windows PowerShell

   If `npm` or project scripts are blocked on Windows PowerShell due to execution policy, run PowerShell as Administrator and set a relaxed policy for the current user:

   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ``` 

   Typical full local start sequence (PowerShell):

   ```powershell
   # Backend
   cd C:\VehicleRentalManagement\backend
   npm install
   Copy-Item .env.example .env
   # edit C:\VehicleRentalManagement\backend\.env and set credentials
   npm run dev

   # Frontend (in a new terminal)
   cd C:\VehicleRentalManagement\frontend
   npm install
   npm run dev
   ```

   If you prefer npm to ignore peer dependency conflicts during install, run `npm install --legacy-peer-deps` in the `frontend` folder.

## 🔧 Deployment Environment Variables

When deploying the backend and frontend, set these environment variables in your hosting provider (Render, Vercel, Railway, etc.):

- `MONGO_URI` — MongoDB connection string (Atlas or hosted DB).
- `JWT_SECRET` — Secret used for signing JWT tokens.
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` — Cloudinary image uploads.
- `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` — (Optional) Razorpay credentials for payments.
- `CORS_ORIGIN` — (Optional) Comma-separated allowed origins for frontend.
- `VITE_API_URL` (frontend) — Full backend API base URL, e.g. `https://your-backend.onrender.com/api`.

Set `VITE_API_URL` in the frontend deploy environment so the compiled app talks to the correct backend URL.

## ✅ Quick Public Frontend (GitHub Pages)

I added a GitHub Actions workflow to automatically build the frontend and publish it to GitHub Pages whenever you push to `main`.

- Workflow file: `.github/workflows/deploy-frontend-ghpages.yml`
- The site will be available at: `https://<your-github-username>.github.io/DriveHub` after the first successful workflow run.
- No extra tokens required — the action uses the built-in `GITHUB_TOKEN`.

If you prefer `Vercel` or `Cloudflare Pages`, follow the earlier instructions — GitHub Pages is an immediate, safe option that gets your front-end live quickly.

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Vehicles
- `GET /api/vehicles` - Get all vehicles (with filters)
- `GET /api/vehicles/:id` - Get vehicle details
- `POST /api/vehicles` - Create vehicle (Admin)
- `PUT /api/vehicles/:id` - Update vehicle (Admin)
- `DELETE /api/vehicles/:id` - Delete vehicle (Admin)
- `POST /api/vehicles/:id/review` - Add review

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/my-bookings` - Get user bookings
- `GET /api/bookings/:id` - Get booking details
- `PUT /api/bookings/:id/cancel` - Cancel booking
- `PUT /api/bookings/:id/confirm-payment` - Confirm payment

## 🎨 Design System

### Colors
- **Primary**: #2563EB (Blue)
- **Secondary**: #0F172A (Dark Blue)
- **Accent**: #14B8A6 (Teal)
- **Success**: #22C55E (Green)
- **Danger**: #EF4444 (Red)
- **Warning**: #F59E0B (Amber)

### Fonts
- **Poppins** - Bold titles
- **Inter** - Body text
- **Montserrat** - Headers

### Effects
- Glassmorphism cards
- Soft shadows
- Smooth transitions
- Framer Motion animations

## 📱 Responsive Design

- **Mobile**: 320px - 480px
- **Tablet**: 481px - 1024px
- **Desktop**: 1025px and above

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Protected routes
- CORS enabled
- Input validation
- Role-based access control

## 🎯 Usage Examples

### Register a New User
```javascript
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "password": "password123",
  "confirmPassword": "password123"
}
```

### Create a Booking
```javascript
POST /api/bookings
{
  "vehicleId": "vehicle_id",
  "pickupDate": "2024-01-15",
  "returnDate": "2024-01-20",
  "pickupLocation": "Main Street",
  "returnLocation": "Main Street",
  "paymentMethod": "credit_card"
}
```

## 🐛 Troubleshooting

### MongoDB Connection Failed
- Ensure MongoDB is running
- Check MONGO_URI in .env file
- Verify network connectivity

### Frontend won't load
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear browser cache
- Check if backend server is running

### CORS Errors
- Ensure backend CORS is properly configured
- Check API base URL in frontend/src/services/api.js

## 📦 Build for Production

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
```
Build files will be in `dist/` folder

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the ISC License

## 👥 Authors

- Developed as a complete Vehicle Rental Management System

## 🙏 Acknowledgments

- Inspired by Uber, Zoomcar, Ola Drive, and Enterprise Rent-A-Car
- Modern UI/UX design principles
- MERN stack best practices

## 📞 Support

For support, please open an issue in the GitHub repository or contact us through the application.

---

**Happy coding! 🚗✨**
