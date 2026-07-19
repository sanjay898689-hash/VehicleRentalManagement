const http = require("http");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const { Server } = require("socket.io");

// Load environment variables first
dotenv.config();

// Validate critical environment variables
if (!process.env.JWT_SECRET || process.env.JWT_SECRET.trim() === "") {
  console.error("❌ Missing required environment variable: JWT_SECRET");
  console.error("Please set JWT_SECRET in your environment or in backend/.env.");
  process.exit(1);
}

const connectDB = require("./config/db");
const seedData = require("./seeder");

const app = express();
const server = http.createServer(app);

const buildAllowedOrigins = () => {
  const configuredOrigins = (process.env.CORS_ORIGIN || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  return configuredOrigins.length > 0
    ? configuredOrigins
    : [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
      ];
};

const allowedOrigins = buildAllowedOrigins();

const isAllowedOrigin = (origin) => {
  if (!origin) return true;

  if (allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
    return true;
  }

  return allowedOrigins.some((allowedOrigin) => {
    if (!allowedOrigin.includes("*")) {
      return false;
    }

    const regexPattern = `^${allowedOrigin.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\\\*/g, ".*")}$`;
    return new RegExp(regexPattern, "i").test(origin);
  }) || /^(https:\/\/.*\.vercel\.app)$/i.test(origin) || /^http:\/\/localhost(:\d+)?$/i.test(origin) || /^http:\/\/127\.0\.0\.1(:\d+)?$/i.test(origin) || /^http:\/\/0\.0\.0\.0(:\d+)?$/i.test(origin);
};

const corsOptions = {
  origin: (origin, callback) => {
    if (isAllowedOrigin(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
};

const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      if (isAllowedOrigin(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by Socket.IO CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

// Middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors(corsOptions));

// Allow external images and common external resources used by the frontend
app.use((req, res, next) => {
  const policy = [
    "default-src 'self' data: https:",
    "img-src 'self' data: https:",
    "script-src 'self' 'unsafe-inline' https:",
    "style-src 'self' 'unsafe-inline' https:",
    "font-src 'self' data: https:",
    "connect-src 'self' https: ws: wss:",
  ].join("; ");
  res.setHeader("Content-Security-Policy", policy);
  next();
});

// Import routes
const authRoutes = require("./routes/authRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

// Root endpoint for Render health checks
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Vehicle Rental Management Backend Running",
    api: "/api",
    status: "online",
  });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ success: true, status: "ok" });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/uploads", uploadRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

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

    // Auto-seed sample data on first launch when configured
    if (process.env.AUTO_SEED === "true") {
      await seedData({ exitAfter: false });
      console.log("🎯 Seed completed, continuing startup");
    }

    // Start the HTTP server so Socket.IO works correctly
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

    // Basic Socket.IO connection logging
    io.on("connection", (socket) => {
      console.log("🔌 New socket connected:", socket.id);
      socket.on("disconnect", () => {
        console.log("🔌 Socket disconnected:", socket.id);
      });
    });
  } catch (error) {
    console.error("❌ Failed to start server:");
    console.error(error);
    process.exit(1);
  }
};

startServer();