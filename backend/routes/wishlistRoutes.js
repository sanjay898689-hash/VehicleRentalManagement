const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const { getWishlist, addToWishlist, removeFromWishlist } = require("../controllers/wishlistController");

const router = express.Router();

router.get("/", authMiddleware, getWishlist);
router.post("/", authMiddleware, addToWishlist);
router.delete("/:vehicleId", authMiddleware, removeFromWishlist);

module.exports = router;
