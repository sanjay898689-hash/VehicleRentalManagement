const express = require("express");
const multer = require("multer");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");
const cloudinary = require("../config/cloudinary");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/image", authMiddleware, adminMiddleware, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const fileData = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
    const uploaded = await cloudinary.uploader.upload(fileData, {
      folder: "drivehub/vehicles",
      resource_type: "image",
    });

    res.status(201).json({ success: true, url: uploaded.secure_url });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
