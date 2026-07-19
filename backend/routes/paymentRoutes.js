const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const { createOrder, confirmPayment, downloadInvoice } = require("../controllers/paymentController");

const router = express.Router();

router.post("/order", authMiddleware, createOrder);
router.post("/confirm", authMiddleware, confirmPayment);
router.get("/invoice/:bookingId", authMiddleware, downloadInvoice);

module.exports = router;
