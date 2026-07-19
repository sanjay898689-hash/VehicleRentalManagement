const express = require("express");
const {
  getAllVehicles,
  getVehicleById,
  getAvailableVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  addReview,
  getVehicleStats,
} = require("../controllers/vehicleController");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes
router.get("/", getAllVehicles);
router.get("/available", getAvailableVehicles);
router.get("/admin/stats", authMiddleware, adminMiddleware, getVehicleStats);
router.get("/:id", getVehicleById);

// Protected routes
router.post("/:id/review", authMiddleware, addReview);

// Admin routes
router.post("/", authMiddleware, adminMiddleware, createVehicle);
router.put("/:id", authMiddleware, adminMiddleware, updateVehicle);
router.delete("/:id", authMiddleware, adminMiddleware, deleteVehicle);

module.exports = router;
