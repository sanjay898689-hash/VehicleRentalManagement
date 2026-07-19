const Razorpay = require("razorpay");
const PDFDocument = require("pdfkit");
const Booking = require("../models/Booking");
const Payment = require("../models/Payment");
const Vehicle = require("../models/Vehicle");

let razorpay = null;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
}

exports.createOrder = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const booking = await Booking.findById(bookingId).populate("vehicleId").populate("userId");

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    const options = {
      amount: Math.round(booking.totalPrice * 100),
      currency: "INR",
      receipt: `booking_${booking._id}`,
      payment_capture: 1,
    };

    if (!razorpay) {
      return res.status(503).json({
        success: false,
        message: "Payment gateway is not configured. Please set Razorpay credentials in the backend environment.",
      });
    }

    const order = await razorpay.orders.create(options);

    const payment = await Payment.create({
      userId: booking.userId._id,
      bookingId: booking._id,
      amount: booking.totalPrice,
      method: booking.paymentMethod || "upi",
      status: "pending",
      razorpayOrderId: order.id,
    });

    res.status(201).json({ success: true, order, payment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.confirmPayment = async (req, res) => {
  try {
    const { bookingId, razorpayPaymentId, razorpaySignature } = req.body;
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    booking.paymentStatus = "completed";
    booking.bookingStatus = "confirmed";
    await booking.save();

    const payment = await Payment.findOneAndUpdate(
      { bookingId: booking._id },
      {
        status: "completed",
        razorpayPaymentId,
        transactionId: razorpayPaymentId,
      },
      { new: true }
    );

    await Vehicle.findByIdAndUpdate(booking.vehicleId, { isAvailable: false, status: "rented" });

    res.status(200).json({ success: true, message: "Payment confirmed", booking, payment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.downloadInvoice = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId).populate("vehicleId").populate("userId");

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    const doc = new PDFDocument({ size: "A4", margin: 50 });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=invoice-${booking.bookingId}.pdf`);

    doc.pipe(res);

    doc.fontSize(28).fillColor("#0f172a").text("DriveHub Invoice", { align: "center" });
    doc.moveDown();

    doc.fontSize(12).fillColor("#334155");
    doc.text(`Invoice ID: ${booking.bookingId}`);
    doc.text(`Date: ${new Date().toLocaleDateString()}`);
    doc.moveDown();

    doc.text(`Customer: ${booking.userId.name}`);
    doc.text(`Email: ${booking.userId.email}`);
    doc.text(`Phone: ${booking.userId.phone}`);
    doc.moveDown();

    doc.text(`Vehicle: ${booking.vehicleId.name}`);
    doc.text(`Brand: ${booking.vehicleId.brand}`);
    doc.text(`Pickup: ${new Date(booking.pickupDate).toLocaleDateString()}`);
    doc.text(`Return: ${new Date(booking.returnDate).toLocaleDateString()}`);
    doc.moveDown();

    doc.text(`Days: ${booking.totalDays}`);
    doc.text(`Rate per day: ₹${booking.pricePerDay}`);
    doc.text(`Subtotal: ₹${booking.subtotal}`);
    doc.text(`Tax: ₹${booking.taxAmount}`);
    doc.text(`Total: ₹${booking.totalPrice}`);
    doc.moveDown();

    doc.text("Thank you for choosing DriveHub.", { align: "center" });

    doc.end();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
