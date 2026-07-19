const http = require("http");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const compression = require('compression');
const helmet = require('helmet');
const { Server } = require("socket.io");

// Load environment variables first
dotenv.config();

// Validate critical environment variables
if (!process.env.JWT_SECRET || process.env.JWT_SECRET.trim() === '') {
  console.error('❌ Missing required environment variable: JWT_SECRET');
  console.error('Please set JWT_SECRET in your environment or in backend/.env. See ../DEPLOYMENT_ENV_SETUP.md for details.');
  process.exit(1);
}

const connectDB = require("./config/db");
const seedData = require("./seeder");

const app = express();
const server = http.createServer(app);

// Socket.io
const allowedOrigins = (() => {
  if (process.env.CORS_ORIGIN) {
    const origins = process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim());
    if (origins.length === 1 && origins[0] === "*") {
      return "*";
    }
    return origins;
  }

  return [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "http://localhost:5176",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
    "http://127.0.0.1:5175",
    "http://127.0.0.1:5176",
    "http://0.0.0.0:5175",
  ];
})();

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

// Middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: allowedOrigins }));
// Allow external images and common external resources used by the frontend
app.use((req, res, next) => {
  const policy = [
    "default-src 'self' data: https:",
    "img-src 'self' data: https:",
    "script-src 'self' 'unsafe-inline' https:",
    "style-src 'self' 'unsafe-inline' https:",
    "font-src 'self' data: https:",
    "connect-src 'self' https: ws: wss:",
  ].join('; ');
  res.setHeader('Content-Security-Policy', policy);
  next();
});
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Import routes
const authRoutes = require("./routes/authRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, status: 'ok' });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/uploads", uploadRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Something went wrong!" });
});

// Server Port
const PORT = process.env.PORT || 5000;

// Start Server with Database Connection
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    
    // Start listening only after DB is connected
    // If a production build exists in ../frontend/dist, serve it as static files
    const path = require('path');
    const distPath = path.resolve(__dirname, '..', 'frontend', 'dist');
    const fs = require('fs');

    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('/', (req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
      app.get('*', (req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
      console.log('📦 Serving frontend from', distPath);
    }

    // Auto-seed sample data on first launch when configured
    if (process.env.AUTO_SEED === 'true') {
      await seedData({ exitAfter: false });
      console.log('🎯 Seed completed, continuing startup');
    }

    // Start the HTTP server so Socket.IO works correctly
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

    // Basic Socket.IO connection logging
    io.on('connection', (socket) => {
      console.log('🔌 New socket connected:', socket.id);
      socket.on('disconnect', () => {
        console.log('🔌 Socket disconnected:', socket.id);
      });
    });
  } catch (error) {
    console.error("❌ Failed to start server:");
    console.error(error);
    process.exit(1);
  }
};

startServer();