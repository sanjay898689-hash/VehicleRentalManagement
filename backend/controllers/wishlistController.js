const Wishlist = require("../models/Wishlist");

exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ userId: req.userId }).populate("vehicleId");
    res.status(200).json({ success: true, count: wishlist.length, wishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.addToWishlist = async (req, res) => {
  try {
    const { vehicleId } = req.body;
    const existing = await Wishlist.findOne({ userId: req.userId, vehicleId });
    if (existing) {
      return res.status(400).json({ success: false, message: "Vehicle already in wishlist" });
    }

    const wishlist = await Wishlist.create({ userId: req.userId, vehicleId });
    res.status(201).json({ success: true, message: "Added to wishlist", wishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOneAndDelete({ userId: req.userId, vehicleId: req.params.vehicleId });

    if (!wishlist) {
      return res.status(404).json({ success: false, message: "Wishlist item not found" });
    }

    res.status(200).json({ success: true, message: "Removed from wishlist" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
