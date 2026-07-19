const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide vehicle name:gtx"],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, "toyota"],
    },
    model: {
      type: String,
      required: [true, "Please provide vehicle model"],
    },
    year: {
      type: Number,
      required: [true, "Please provide vehicle year"],
    },
    type: {
      type: String,
      required: [true, "Please provide vehicle type"],
    },
    category: {
      type: String,
      trim: true,
      default: "Luxury",
    },
    fuelType: {
      type: String,
      enum: [
        "Petrol",
        "Diesel",
        "CNG",
        "Hybrid",
        "Electric",
        "petrol",
        "diesel",
        "cng",
        "hybrid",
        "electric",
      ],
      required: [true, "Please provide fuel type"],
    },
    transmission: {
      type: String,
      enum: ["Manual", "Automatic", "manual", "automatic"],
      default: "Automatic",
    },
    seatingCapacity: {
      type: Number,
      required: true,
      default: 5,
    },
    mileage: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    licensePlate: {
      type: String,
      required: true,
      unique: true,
    },
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
    },
    vehicleId: {
      type: String,
      required: true,
      unique: true,
    },
    driveType: {
      type: String,
      default: "AWD",
    },
    engineCapacity: {
      type: String,
      default: "",
    },
    horsepower: {
      type: String,
      default: "",
    },
    weeklyPrice: {
      type: Number,
      default: 0,
    },
    monthlyPrice: {
      type: Number,
      default: 0,
    },
    pricePerDay: {
      type: Number,
      required: [true, "Please provide price per day"],
    },
    securityDeposit: {
      type: Number,
      default: 0,
    },
    location: {
      type: String,
      default: "Mumbai",
    },
    insurance: {
      type: String,
      default: "Standard coverage included",
    },
    insuranceStatus: {
      type: String,
      default: "Active",
    },
    gpsEnabled: {
      type: Boolean,
      default: true,
    },
    airConditioning: {
      type: Boolean,
      default: true,
    },
    bluetooth: {
      type: Boolean,
      default: true,
    },
    androidAuto: {
      type: Boolean,
      default: true,
    },
    appleCarPlay: {
      type: Boolean,
      default: true,
    },
    reverseCamera: {
      type: Boolean,
      default: true,
    },
    parkingSensors: {
      type: Boolean,
      default: true,
    },
    cruiseControl: {
      type: Boolean,
      default: true,
    },
    sunroof: {
      type: Boolean,
      default: false,
    },
    ABS: {
      type: Boolean,
      default: true,
    },
    airbags: {
      type: Number,
      default: 4,
    },
    fuelTankCapacity: {
      type: String,
      default: "",
    },
    luggageCapacity: {
      type: String,
      default: "",
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    shortDescription: {
      type: String,
      trim: true,
    },
    fullDescription: {
      type: String,
      trim: true,
    },
    rentalTerms: {
      type: String,
      trim: true,
    },
    cancellationPolicy: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    galleryImages: [String],
    images: [String],
    features: [String],
    specifications: {
      engine: String,
      power: String,
      torque: String,
      topSpeed: String,
      acceleration: String,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ["available", "rented", "maintenance"],
      default: "available",
    },
    rentedUntil: {
      type: Date,
    },
    totalRentals: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5,
    },
    reviews: [
      {
        userId: mongoose.Schema.Types.ObjectId,
        rating: Number,
        comment: String,
        createdAt: Date,
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);
