const express = require("express");
const {
  createBooking,
  getUserBookings,
  getBookingById,
  cancelBooking,
  getAllBookings,
  updateBookingStatus,
  confirmPayment,
  getBookingStats,
} = require("../controllers/bookingController");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// Protected routes
router.post("/", authMiddleware, createBooking);
router.get("/my-bookings", authMiddleware, getUserBookings);
router.put("/:id/cancel", authMiddleware, cancelBooking);
router.put("/:id/confirm-payment", authMiddleware, confirmPayment);

// Admin routes
router.get("/admin/stats", authMiddleware, adminMiddleware, getBookingStats);
router.get("/", authMiddleware, adminMiddleware, getAllBookings);
router.put("/:id/status", authMiddleware, adminMiddleware, updateBookingStatus);
router.get("/:id", authMiddleware, getBookingById);

module.exports = router;
