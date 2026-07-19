const Booking = require("../models/Booking");
const Vehicle = require("../models/Vehicle");
const User = require("../models/User");

// Create Booking
exports.createBooking = async (req, res) => {
  try {
    const { vehicleId, pickupDate, returnDate, pickupLocation, returnLocation, paymentMethod } = req.body;

    // Validate dates
    if (new Date(pickupDate) >= new Date(returnDate)) {
      return res.status(400).json({ success: false, message: "Return date must be after pickup date" });
    }

    // Get vehicle details
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ success: false, message: "Vehicle not found" });
    }

    // Calculate days and price
    const totalDays = Math.ceil((new Date(returnDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24));
    const subtotal = vehicle.pricePerDay * totalDays;
    const taxAmount = subtotal * 0.1; // 10% tax
    const totalPrice = subtotal + taxAmount;

    // Create booking
    const booking = await Booking.create({
      userId: req.userId,
      vehicleId,
      pickupDate,
      returnDate,
      pickupLocation,
      returnLocation,
      pricePerDay: vehicle.pricePerDay,
      totalDays,
      subtotal,
      taxAmount,
      totalPrice,
      paymentMethod,
    });

    req.app.get("io")?.emit("bookingCreated", booking);

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Bookings (User's bookings)
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.userId })
      .populate("vehicleId", "name brand model image pricePerDay")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Booking Details
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("userId", "name email phone")
      .populate("vehicleId");

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    // Check if user is owner or admin
    if (booking.userId._id.toString() !== req.userId && req.userRole !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    res.status(200).json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Cancel Booking
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    if (booking.userId.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    if (new Date(booking.pickupDate) <= new Date()) {
      return res.status(400).json({ success: false, message: "Cannot cancel past bookings" });
    }

    booking.bookingStatus = "cancelled";
    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Bookings (Admin)
exports.getAllBookings = async (req, res) => {
  try {
    const { status, userId } = req.query;
    let filter = {};

    if (status) filter.bookingStatus = status;
    if (userId) filter.userId = userId;

    const bookings = await Booking.find(filter)
      .populate("userId", "name email phone")
      .populate("vehicleId", "name brand model")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Booking Status (Admin)
exports.updateBookingStatus = async (req, res) => {
  try {
    const { bookingStatus } = req.body;

    let booking = await Booking.findByIdAndUpdate(req.params.id, { bookingStatus }, { new: true });

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    // Update vehicle status
    if (bookingStatus === "active") {
      await Vehicle.findByIdAndUpdate(booking.vehicleId, {
        status: "rented",
        rentedUntil: booking.returnDate,
      });
    } else if (bookingStatus === "completed") {
      await Vehicle.findByIdAndUpdate(booking.vehicleId, {
        status: "available",
        rentedUntil: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking status updated",
      booking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Confirm Payment
exports.confirmPayment = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    booking.paymentStatus = "completed";
    booking.bookingStatus = "confirmed";
    await booking.save();

    await Vehicle.findByIdAndUpdate(booking.vehicleId, {
      isAvailable: false,
    });

    req.app.get("io")?.emit("bookingPaymentConfirmed", booking);

    res.status(200).json({
      success: true,
      message: "Payment confirmed successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Booking Statistics (Admin)
exports.getBookingStats = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const pendingBookings = await Booking.countDocuments({ bookingStatus: "pending" });
    const confirmedBookings = await Booking.countDocuments({ bookingStatus: "confirmed" });
    const activeBookings = await Booking.countDocuments({ bookingStatus: "active" });
    const completedBookings = await Booking.countDocuments({ bookingStatus: "completed" });
    const cancelledBookings = await Booking.countDocuments({ bookingStatus: "cancelled" });

    const totalRevenue = await Booking.aggregate([
      { $match: { bookingStatus: "completed" } },
      { $group: { _id: null, total: { $sum: "$totalPrice" } } },
    ]);

    res.status(200).json({
      success: true,
      stats: {
        total: totalBookings,
        pending: pendingBookings,
        confirmed: confirmedBookings,
        active: activeBookings,
        completed: completedBookings,
        cancelled: cancelledBookings,
        revenue: totalRevenue[0]?.total || 0,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
