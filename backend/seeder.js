const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Vehicle = require("./models/Vehicle");
const { MongoMemoryServer } = require('mongodb-memory-server');

dotenv.config();

const brands = [
  { brand: "Toyota", models: ["Fortuner", "Camry", "Corolla", "Yaris"] },
  { brand: "Tesla", models: ["Model 3", "Model S", "Model X", "Model Y"] },
  { brand: "Mahindra", models: ["Thar", "Scorpio", "XUV700"] },
  { brand: "Hyundai", models: ["Creta", "Verna", "Venue", "Tucson"] },
  { brand: "Honda", models: ["City", "Civic", "Accord", "CR-V"] },
  { brand: "BMW", models: ["X5", "3 Series", "5 Series", "i4"] },
  { brand: "Audi", models: ["A4", "A6", "Q5", "e-tron"] },
  { brand: "Mercedes", models: ["C-Class", "E-Class", "GLE", "S-Class"] },
  { brand: "Kia", models: ["Seltos", "Carnival", "Sonet"] },
  { brand: "Ford", models: ["Endeavour", "Mustang", "EcoSport"] }
];

const types = [
  "SUV",
  "Sedan",
  "Hatchback",
  "Coupe",
  "Convertible",
  "Pickup",
  "Luxury",
  "Sports",
  "Electric",
  "Van",
  "Minivan",
  "Crossover",
];

const fuelTypes = ["Diesel", "Petrol", "CNG", "Hybrid", "Electric"];
const transmissions = ["Automatic", "Manual"];
const driveTypes = ["FWD", "RWD", "AWD", "4WD"];
const colors = ["Midnight Black", "Pearl White", "Silver", "Royal Blue", "Crimson Red", "Gunmetal Grey"];
const locations = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad"];
const images = [
  "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1517949908111-8b4aa81a1dd6?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1459486204953-9a0942d2db40?auto=format&fit=crop&w=900&q=80"
];

const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getUniquePlate = (index) => `MH12AB${String(index).padStart(4, "0")}`;
const getVehicleId = (index) => `VH-${String(index).padStart(4, "0")}`;

const generateVehicles = (count = 50) => {
  const vehicles = [];

  for (let i = 1; i <= count; i += 1) {
    const brandItem = getRandomItem(brands);
    const model = getRandomItem(brandItem.models);
    const fuelType = getRandomItem(fuelTypes);
    const transmission = getRandomItem(transmissions);
    const vehicleType = getRandomItem(types);
    const year = getRandomNumber(2018, 2025);
    const seatingCapacity = getRandomItem([2, 4, 5, 6, 7]);
    const engineCapacity = fuelType === "Electric" ? "Electric Motor" : `${getRandomNumber(1000, 4500)} cc`;
    const horsepower = `${getRandomNumber(120, 520)} hp`;
    const mileage = fuelType === "Electric" ? `${getRandomNumber(350, 600)} km/charge` : `${getRandomNumber(8, 18)} km/l`;
    const topSpeed = `${getRandomNumber(160, 320)} km/h`;
    const driveType = getRandomItem(driveTypes);
    const color = getRandomItem(colors);
    const location = getRandomItem(locations);
    const rating = Number((3.8 + Math.random() * 1.2).toFixed(1));
    const basePrice = getRandomNumber(1500, 9000);
    const weeklyPrice = Math.round(basePrice * 6.5);
    const monthlyPrice = Math.round(basePrice * 26);
    const securityDeposit = Math.round(basePrice * 2.5);
    const isAvailable = Math.random() > 0.2;
    const status = isAvailable ? "available" : getRandomItem(["rented", "maintenance"]);
    const image = images[i % images.length];
    const galleryImages = Array.from({ length: 4 }, (_, idx) => images[(i + idx) % images.length]);

    vehicles.push({
      vehicleId: getVehicleId(i),
      name: `${brandItem.brand} ${model}`,
      brand: brandItem.brand,
      model,
      year,
      type: vehicleType,
      category: vehicleType === "Electric" ? "Electric" : i % 4 === 0 ? "Luxury" : "Premium",
      fuelType,
      transmission,
      seatingCapacity,
      engineCapacity,
      horsepower,
      mileage,
      topSpeed,
      driveType,
      color,
      registrationNumber: getUniquePlate(i),
      licensePlate: getUniquePlate(i),
      pricePerDay: basePrice,
      weeklyPrice,
      monthlyPrice,
      securityDeposit,
      location,
      insurance: "Comprehensive insurance included",
      insuranceStatus: "Active",
      gpsEnabled: true,
      airConditioning: true,
      bluetooth: true,
      androidAuto: fuelType !== "Electric",
      appleCarPlay: fuelType !== "Electric" || Math.random() > 0.5,
      reverseCamera: true,
      parkingSensors: true,
      cruiseControl: true,
      sunroof: Math.random() > 0.5,
      ABS: true,
      airbags: getRandomItem([2, 4, 6, 8]),
      fuelTankCapacity: fuelType === "Electric" ? "--" : `${getRandomNumber(45, 90)} L`,
      luggageCapacity: `${getRandomNumber(300, 850)} L`,
      rating,
      totalReviews: getRandomNumber(50, 1200),
      shortDescription: `Premium ${vehicleType.toLowerCase()} with advanced comfort, safety, and modern technology.`,
      fullDescription: `Experience the ${brandItem.brand} ${model} with ${fuelType.toLowerCase()} power, ${seatingCapacity}-seat comfort, and premium features for a smooth and luxurious drive. This vehicle is perfect for city drives, long trips, and business travel.`,
      rentalTerms: "Minimum 2-day rental. Damage waiver charges may apply.",
      cancellationPolicy: "Free cancellation with 24-hour notice before pickup.",
      image,
      galleryImages,
      features: [
        "GPS Navigation",
        "Leather Seats",
        "Bluetooth Connectivity",
        "Reverse Camera",
        "Parking Sensors",
      ],
      specifications: {
        engine: engineCapacity,
        power: horsepower,
        torque: `${getRandomNumber(180, 620)} Nm`,
        topSpeed,
        acceleration: `${getRandomNumber(5, 12)}s 0-100 km/h`,
      },
      isAvailable,
      status,
    });
  }

  return vehicles;
};

async function seedData(options = { exitAfter: true }) {
  let startedMongoServer = null;
  try {
    if (!(mongoose.connection && mongoose.connection.readyState === 1)) {
      if (process.env.MONGO_URI && process.env.MONGO_URI.trim() !== '') {
        await mongoose.connect(process.env.MONGO_URI);
      } else {
        startedMongoServer = await MongoMemoryServer.create();
        const uri = startedMongoServer.getUri();
        await mongoose.connect(uri);
      }
    }

    console.log("✅ MongoDB Connected for seeding");

    await Vehicle.deleteMany({});
    console.log("🧹 Existing vehicle data deleted");

    const vehicles = generateVehicles(50);
    await Vehicle.insertMany(vehicles);
    console.log(`🚗 Seeded ${vehicles.length} vehicle records successfully`);

    if (startedMongoServer) {
      await mongoose.disconnect();
      await startedMongoServer.stop();
    }

    if (options.exitAfter) process.exit(0);
  } catch (error) {
    console.error("❌ Seed error", error.message);
    if (options.exitAfter) process.exit(1);
    throw error;
  }
}

module.exports = seedData;

if (require.main === module) {
  seedData({ exitAfter: true });
}
