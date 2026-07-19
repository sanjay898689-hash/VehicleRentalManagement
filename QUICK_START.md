# ⚡ Quick Commands Reference

## 🚀 Start the Application (3 steps)

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

### Terminal 2 - Frontend  
```bash
cd frontend
npm run dev
```

### Then open
```
http://localhost:5173
```

---

## 📦 Installation Commands

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install --legacy-peer-deps
npm run dev
```

---

## 🔧 Useful Commands

### Backend
```bash
npm run dev          # Start development server
npm start            # Start production server
npm test             # Run tests (when configured)
```

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run linter (when configured)
```

---

## 🗄️ Database Commands

### MongoDB Local
```bash
# Start MongoDB
brew services start mongodb-community    # macOS
net start MongoDB                        # Windows (Admin)
sudo systemctl start mongod              # Linux

# Connect to MongoDB
mongosh
use vehicleRentalDB
show collections

# Stop MongoDB
brew services stop mongodb-community     # macOS
net stop MongoDB                         # Windows (Admin)
sudo systemctl stop mongod               # Linux
```

### MongoDB Atlas (Cloud)
- Visit: https://www.mongodb.com/cloud/atlas
- Connect: Copy connection string to MONGO_URI in .env

---

## 🌐 API Testing with Curl

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get Vehicles
```bash
curl http://localhost:5000/api/vehicles
```

### Get Vehicles with Filter
```bash
curl "http://localhost:5000/api/vehicles?brand=Toyota&fuelType=hybrid"
```

---

## 🔐 Authentication with Token

### Add Token to Headers
```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  http://localhost:5000/api/auth/profile
```

---

## 🐛 Debugging

### Enable Debug Logs
```javascript
// Add to backend/server.js
const morgan = require('morgan');
app.use(morgan('dev'));
```

### Clear Cache
```bash
# Frontend
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps

# Backend
rm -rf node_modules package-lock.json
npm install
```

### Kill Process Using Port
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

---

## 📁 Project Structure Quick Reference

```
VehicleRentalManagement/
├── backend/
│   ├── models/          # Database schemas
│   ├── controllers/     # Business logic
│   ├── routes/          # API endpoints
│   ├── middleware/      # Authentication
│   ├── server.js        # Main server file
│   └── .env             # Environment variables
│
└── frontend/
    ├── src/
    │   ├── components/  # Reusable UI components
    │   ├── pages/       # Page components
    │   ├── context/     # State management
    │   ├── services/    # API calls
    │   ├── utils/       # Helper functions
    │   └── styles/      # Global CSS
    └── public/          # Static files
```

---

## 🌍 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/vehicleRentalDB
JWT_SECRET=your_secret_key
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
```

### Frontend (.env.local) - Optional
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 📊 Important Endpoints

### Auth
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Get profile

### Vehicles
- `GET /api/vehicles` - List all
- `GET /api/vehicles/:id` - Get details
- `POST /api/vehicles` - Create (Admin)

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/my-bookings` - My bookings
- `GET /api/bookings/:id` - Booking details

---

## ✅ Pre-Deployment Checklist

- [ ] Backend `.env` configured
- [ ] MongoDB connection working
- [ ] Frontend dev server running
- [ ] All pages loading correctly
- [ ] Authentication working
- [ ] Can create bookings
- [ ] Can view dashboard
- [ ] No console errors

---

## 🚀 Deploy Commands

### Build Backend for Production
```bash
cd backend
npm start
```

### Build Frontend for Production
```bash
cd frontend
npm run build
# Output: dist/ folder
```

### Deploy to Heroku
```bash
heroku login
heroku create your-app-name
git push heroku main
```

### Deploy to Vercel
```bash
npm install -g vercel
cd frontend
vercel
```

---

## 📞 Troubleshooting Quick Fixes

| Problem | Solution |
|---------|----------|
| MongoDB won't connect | Check if running: `mongosh` |
| Port 5000 in use | `kill -9 $(lsof -ti:5000)` |
| CORS error | Check CORS_ORIGIN in .env |
| Tailwind not working | Rebuild: `npm run build` |
| npm install fails | Clear cache: `npm cache clean --force` |
| Component not found | Check export in index.js files |

---

## 📚 Documentation Files

- `README.md` - Project overview
- `SETUP.md` - Detailed setup guide
- `PROJECT_SUMMARY.md` - Features & status
- `backend/.env.example` - Example env file
- This file - Quick reference

---

## 🎯 Next Steps

1. **Start servers**: Run commands above
2. **Create account**: Register at /register
3. **Browse vehicles**: Go to /vehicles
4. **Make booking**: Click on vehicle card
5. **Check dashboard**: View bookings at /dashboard

---

## ❓ Need Help?

1. Check SETUP.md for detailed instructions
2. Review PROJECT_SUMMARY.md for features
3. Check console for error messages
4. Verify .env configuration
5. Ensure MongoDB is running

---

**Happy Coding! 🚗✨**
