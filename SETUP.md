# 🚀 Setup & Deployment Guide

## Quick Start Guide

### Prerequisites
- Node.js v14+ installed
- MongoDB running locally or MongoDB Atlas account
- npm or yarn package manager
- Git (optional)

---

## Backend Setup (5 minutes)

### Step 1: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 2: Configure Environment Variables
Create a `.env` file in the backend directory:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb://127.0.0.1:27017/vehicleRentalDB

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# CORS
CORS_ORIGIN=http://localhost:5173
```

**For MongoDB Atlas (Cloud):**
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/vehicleRentalDB?retryWrites=true&w=majority
```

### Step 3: Start Backend Server
```bash
npm run dev
```

Expected output:
```
✅ MongoDB Connected
🚀 Server running on port 5000
```

---

## Frontend Setup (5 minutes)

### Step 1: Install Frontend Dependencies
```bash
cd frontend
npm install --legacy-peer-deps
```

### Step 2: Update API Configuration
Edit `src/services/api.js` if needed:
```javascript
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});
```

### Step 3: Start Development Server
```bash
npm run dev
```

Application will automatically open at: `http://localhost:5173`

---

## First Time Setup - Creating Initial Data

### 1. Register Admin User
1. Visit: `http://localhost:5173/register`
2. Create account with admin details
3. Note: First user should be admin (update manually in database if needed)

### 2. Add Sample Vehicles
Use Postman or API client to add vehicles:

```bash
POST http://localhost:5000/api/vehicles
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "name": "Toyota Camry 2024",
  "brand": "Toyota",
  "model": "Camry",
  "year": 2024,
  "type": "sedan",
  "fuelType": "hybrid",
  "transmission": "automatic",
  "seatingCapacity": 5,
  "mileage": "10 km/l",
  "color": "Silver",
  "licensePlate": "ABC123XYZ",
  "pricePerDay": 80,
  "image": "https://via.placeholder.com/500x300",
  "features": [
    "Air Conditioning",
    "Power Steering",
    "ABS",
    "Airbags",
    "Bluetooth",
    "Backup Camera"
  ]
}
```

---

## Database Setup

### Local MongoDB Installation

#### Windows
```bash
# Using Homebrew (macOS)
brew tap mongodb/brew
brew install mongodb-community

# Or download from: https://www.mongodb.com/try/download/community
```

#### Start MongoDB Service
```bash
# macOS
brew services start mongodb-community

# Windows (Command Prompt as Admin)
net start MongoDB

# Linux
sudo systemctl start mongod
```

#### Verify MongoDB is Running
```bash
mongo
# or for newer versions
mongosh
```

### MongoDB Atlas (Cloud Setup)

1. Go to: https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster
4. Add a database user
5. Get connection string
6. Update `.env` file with connection string

---

## Running the Application

### Development Mode
```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd frontend
npm run dev
```

### Production Mode

#### Backend
```bash
cd backend
npm start
```

#### Frontend
```bash
cd frontend
npm run build
npm run preview
```

---

## Common Issues & Solutions

### Issue: MongoDB Connection Failed
**Solution:**
```bash
# Check if MongoDB is running
mongosh

# If not running, start it
# macOS: brew services start mongodb-community
# Windows: net start MongoDB (as Admin)
# Linux: sudo systemctl start mongod
```

### Issue: CORS Error in Frontend
**Solution:**
```bash
# Check backend .env has correct CORS_ORIGIN
CORS_ORIGIN=http://localhost:5173

# Restart backend server
npm run dev
```

### Issue: Port Already in Use
**Solution:**
```bash
# Change ports in vite.config.js or .env
# Kill process using the port
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

### Issue: npm Install Fails
**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm install --legacy-peer-deps
```

### Issue: Tailwind CSS Not Working
**Solution:**
```bash
# Rebuild Tailwind
npm run build

# Check tailwind.config.js paths are correct
```

---

## Testing the Application

### Test User Registration
```bash
1. Go to http://localhost:5173/register
2. Fill in details
3. Submit
4. Check console for success message
```

### Test Vehicle Browsing
```bash
1. Go to http://localhost:5173/vehicles
2. Apply filters
3. Click on vehicle card
4. View details
```

### Test Booking Flow
```bash
1. Login to account
2. Browse vehicles
3. Click "Book Now"
4. Select dates
5. Complete booking
6. View in dashboard
```

---

## Deployment Guide

### Deploy Backend (Heroku)

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Create Heroku App**
   ```bash
   heroku create your-app-name
   ```

3. **Add Environment Variables**
   ```bash
   heroku config:set MONGO_URI=<your_mongodb_uri>
   heroku config:set JWT_SECRET=<your_secret>
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

### Deploy Frontend (Vercel)

1. **Build Frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Update Backend URL in .env**
   ```
   VITE_API_URL=https://your-backend.herokuapp.com/api
   ```

---

## Performance Optimization

### Frontend Optimizations
- Lazy load components
- Compress images
- Enable gzip compression
- Use CDN for assets

### Backend Optimizations
- Add caching headers
- Use pagination
- Add database indexes
- Optimize queries

---

## Security Checklist

- [ ] Change JWT_SECRET in production
- [ ] Use HTTPS URLs
- [ ] Enable MongoDB authentication
- [ ] Add rate limiting
- [ ] Validate all inputs
- [ ] Use environment variables
- [ ] Remove console.log in production
- [ ] Add CSRF protection
- [ ] Implement proper CORS

---

## Monitoring & Debugging

### Enable Debug Logging
```javascript
// backend/server.js
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
```

### Check Logs
```bash
# Backend logs
npm run dev

# Frontend console
Open Developer Tools (F12)
```

---

## Getting Help

If you encounter issues:
1. Check the troubleshooting section above
2. Review console/terminal for error messages
3. Check GitHub issues
4. Consult documentation:
   - Express.js: https://expressjs.com
   - MongoDB: https://docs.mongodb.com
   - React: https://react.dev
   - Vite: https://vitejs.dev

---

## Success! 🎉

Your Vehicle Rental Management System is now ready!

**Access Points:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api
- Database: mongodb://127.0.0.1:27017/vehicleRentalDB
