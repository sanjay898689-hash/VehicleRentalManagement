const Vehicle = require("../models/Vehicle");

// Get All Vehicles
exports.getAllVehicles = async (req, res) => {
  try {
    const { brand, fuelType, type, minPrice, maxPrice, search } = req.query;

    let filter = {};

    if (brand) filter.brand = brand;
    if (fuelType) filter.fuelType = fuelType;
    if (type) filter.type = type;
    if (minPrice || maxPrice) {
      filter.pricePerDay = {};
      if (minPrice) filter.pricePerDay.$gte = minPrice;
      if (maxPrice) filter.pricePerDay.$lte = maxPrice;
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
        { model: { $regex: search, $options: "i" } },
      ];
    }

    const vehicles = await Vehicle.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: vehicles.length,
      vehicles,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Single Vehicle
exports.getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ success: false, message: "Vehicle not found" });
    }

    res.status(200).json({ success: true, vehicle });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Available Vehicles
exports.getAvailableVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ isAvailable: true, status: "available" });

    res.status(200).json({
      success: true,
      count: vehicles.length,
      vehicles,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create Vehicle (Admin)
exports.createVehicle = async (req, res) => {
  try {
    const {
      vehicleId,
      name,
      brand,
      model,
      year,
      type,
      category,
      fuelType,
      transmission,
      seatingCapacity,
      engineCapacity,
      horsepower,
      mileage,
      topSpeed,
      driveType,
      color,
      licensePlate,
      registrationNumber,
      pricePerDay,
      weeklyPrice,
      monthlyPrice,
      securityDeposit,
      location,
      insurance,
      insuranceStatus,
      gpsEnabled,
      airConditioning,
      bluetooth,
      androidAuto,
      appleCarPlay,
      reverseCamera,
      parkingSensors,
      cruiseControl,
      sunroof,
      ABS,
      airbags,
      fuelTankCapacity,
      luggageCapacity,
      shortDescription,
      fullDescription,
      rentalTerms,
      cancellationPolicy,
      image,
      galleryImages,
      features,
      specifications,
      isAvailable,
    } = req.body;

    const vehicle = await Vehicle.create({
      vehicleId,
      name,
      brand,
      model,
      year,
      type,
      category,
      fuelType,
      transmission,
      seatingCapacity,
      engineCapacity,
      horsepower,
      mileage,
      topSpeed,
      driveType,
      color,
      licensePlate,
      registrationNumber,
      pricePerDay,
      weeklyPrice,
      monthlyPrice,
      securityDeposit,
      location,
      insurance,
      insuranceStatus,
      gpsEnabled,
      airConditioning,
      bluetooth,
      androidAuto,
      appleCarPlay,
      reverseCamera,
      parkingSensors,
      cruiseControl,
      sunroof,
      ABS,
      airbags,
      fuelTankCapacity,
      luggageCapacity,
      shortDescription,
      fullDescription,
      rentalTerms,
      cancellationPolicy,
      image,
      galleryImages: galleryImages || (image ? [image] : []),
      images: galleryImages || (image ? [image] : []),
      features: features || [],
      specifications: specifications || {},
      isAvailable: isAvailable ?? true,
      status: isAvailable ? "available" : "maintenance",
    });

    req.app.get("io")?.emit("vehicleCreated", vehicle);

    res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      vehicle,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Vehicle (Admin)
exports.updateVehicle = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.body.isAvailable !== undefined) {
      updateData.status = req.body.isAvailable ? "available" : "maintenance";
    }

    let vehicle = await Vehicle.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!vehicle) {
      return res.status(404).json({ success: false, message: "Vehicle not found" });
    }

    req.app.get("io")?.emit("vehicleUpdated", vehicle);

    res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
      vehicle,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Vehicle (Admin)
exports.deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ success: false, message: "Vehicle not found" });
    }

    res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add Review to Vehicle
exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ success: false, message: "Vehicle not found" });
    }

    vehicle.reviews.push({
      userId: req.userId,
      rating,
      comment,
      createdAt: new Date(),
    });

    // Update average rating
    const avgRating = vehicle.reviews.reduce((acc, review) => acc + review.rating, 0) / vehicle.reviews.length;
    vehicle.rating = avgRating;

    await vehicle.save();

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      vehicle,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Vehicle Statistics (Admin)
exports.getVehicleStats = async (req, res) => {
  try {
    const totalVehicles = await Vehicle.countDocuments();
    const availableVehicles = await Vehicle.countDocuments({ status: "available" });
    const rentedVehicles = await Vehicle.countDocuments({ status: "rented" });
    const maintenanceVehicles = await Vehicle.countDocuments({ status: "maintenance" });

    res.status(200).json({
      success: true,
      stats: {
        total: totalVehicles,
        available: availableVehicles,
        rented: rentedVehicles,
        maintenance: maintenanceVehicles,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
