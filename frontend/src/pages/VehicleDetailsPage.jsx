import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MainLayout } from "../layouts/MainLayout";
import { vehicleService, bookingService } from "../services/api";
import { Loader } from "../components/Loader";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { formatCurrency, calculateDays } from "../utils/helpers";
import { FaStar, FaCheck, FaCalendar, FaUsers, FaGasPump, FaTachometerAlt, FaShieldAlt, FaMapSigns } from "react-icons/fa";

export const VehicleDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToast } = useToast();

  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState({
    pickupDate: "",
    returnDate: "",
    pickupLocation: "",
    returnLocation: "",
  });
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    fetchVehicle();
  }, [id]);

  const fetchVehicle = async () => {
    try {
      const { data } = await vehicleService.getVehicleById(id);
      setVehicle(data.vehicle);
    } catch (err) {
      addToast("Failed to load vehicle details", "error");
      navigate("/vehicles");
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    if (!isAuthenticated) {
      addToast("Please login to book a vehicle", "info");
      navigate("/login");
      return;
    }

    if (!bookingData.pickupDate || !bookingData.returnDate) {
      addToast("Please select pickup and return dates", "error");
      return;
    }

    try {
      setBookingLoading(true);
      await bookingService.createBooking({
        vehicleId: id,
        ...bookingData,
        paymentMethod: "credit_card",
      });
      addToast("Booking created successfully!", "success");
      navigate("/dashboard");
    } catch (err) {
      addToast(err.response?.data?.message || "Booking failed", "error");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (!vehicle) return <div className="container py-12 text-center">Vehicle not found</div>;

  const totalDays = bookingData.pickupDate && bookingData.returnDate ? calculateDays(bookingData.pickupDate, bookingData.returnDate) : 1;
  const totalPrice = totalDays * vehicle.pricePerDay;
  const galleryImages = [vehicle.image, ...(vehicle.galleryImages || [])].slice(0, 5);

  return (
    <MainLayout>
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2">
            <div className="rounded-[32px] overflow-hidden mb-6 shadow-soft">
              <img src={vehicle.image} alt={vehicle.name} className="w-full h-[420px] object-cover" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {galleryImages.map((src, index) => (
                <div key={index} className="rounded-3xl overflow-hidden bg-gray-100">
                  <img src={src} alt={`${vehicle.name} ${index + 1}`} loading="lazy" className="w-full h-40 object-cover" />
                </div>
              ))}
            </div>

            <div className="card mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="font-bold text-3xl text-secondary">{vehicle.name}</h1>
                  <p className="text-sm text-gray-500 mt-2">{vehicle.shortDescription}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Vehicle ID</p>
                  <p className="font-semibold text-secondary">{vehicle.vehicleId}</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 text-xs text-white">
                <span className="px-3 py-1 rounded-full bg-primary/90">{vehicle.status.toUpperCase()}</span>
                <span className="px-3 py-1 rounded-full bg-slate-700/90">{vehicle.insuranceStatus}</span>
                <span className="px-3 py-1 rounded-full bg-slate-700/90">{vehicle.fuelType}</span>
                <span className="px-3 py-1 rounded-full bg-slate-700/90">{vehicle.transmission}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
              <div className="card">
                <h3 className="font-bold text-xl text-secondary mb-4">Specifications</h3>
                <div className="grid gap-3">
                  {[
                    { label: "Registration", value: vehicle.registrationNumber || vehicle.licensePlate, icon: FaMapSigns },
                    { label: "Drive Type", value: vehicle.driveType, icon: FaTachometerAlt },
                    { label: "Engine", value: vehicle.engineCapacity, icon: FaGasPump },
                    { label: "Horsepower", value: vehicle.horsepower, icon: FaTachometerAlt },
                    { label: "Top Speed", value: vehicle.topSpeed, icon: FaGasPump },
                    { label: "Year", value: vehicle.year, icon: FaCalendar },
                    { label: "Seats", value: vehicle.seatingCapacity, icon: FaUsers },
                    { label: "Mileage", value: vehicle.mileage, icon: FaGasPump },
                    { label: "Fuel Tank", value: vehicle.fuelTankCapacity, icon: FaGasPump },
                    { label: "Luggage", value: vehicle.luggageCapacity, icon: FaShieldAlt },
                  ].map((spec, idx) => (
                    <div key={idx} className="p-4 rounded-3xl bg-gray-50">
                      <p className="text-xs text-gray-500 mb-1">{spec.label}</p>
                      <p className="font-semibold text-secondary">{spec.value || "—"}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <h3 className="font-bold text-xl text-secondary mb-4">Pricing</h3>
                <div className="grid gap-3">
                  {[
                    { label: "Daily", value: formatCurrency(vehicle.pricePerDay) },
                    { label: "Weekly", value: formatCurrency(vehicle.weeklyPrice) },
                    { label: "Monthly", value: formatCurrency(vehicle.monthlyPrice) },
                    { label: "Security Deposit", value: formatCurrency(vehicle.securityDeposit) },
                  ].map((item, idx) => (
                    <div key={idx} className="p-4 rounded-3xl bg-gray-50">
                      <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                      <p className="font-semibold text-secondary">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card mb-6">
              <h3 className="font-bold text-xl text-secondary mb-4">Features</h3>
              <div className="grid gap-3 md:grid-cols-2">
                {[
                  { label: "GPS", value: vehicle.gpsEnabled },
                  { label: "Air Conditioning", value: vehicle.airConditioning },
                  { label: "Bluetooth", value: vehicle.bluetooth },
                  { label: "Android Auto", value: vehicle.androidAuto },
                  { label: "Apple CarPlay", value: vehicle.appleCarPlay },
                  { label: "Reverse Camera", value: vehicle.reverseCamera },
                  { label: "Parking Sensors", value: vehicle.parkingSensors },
                  { label: "Cruise Control", value: vehicle.cruiseControl },
                  { label: "Sunroof", value: vehicle.sunroof },
                  { label: "ABS", value: vehicle.ABS },
                  { label: "Airbags", value: vehicle.airbags },
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-3 rounded-3xl bg-gray-50">
                    <FaCheck className={`text-sm ${feature.value ? "text-success" : "text-gray-300"}`} />
                    <span className="text-sm text-gray-700">{feature.label}: {feature.value ? "Yes" : "No"}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card mb-6">
              <h3 className="font-bold text-xl text-secondary mb-4">About This Vehicle</h3>
              <p className="text-gray-700 leading-relaxed">{vehicle.fullDescription || vehicle.shortDescription}</p>
            </div>

            <div className="card">
              <h3 className="font-bold text-xl text-secondary mb-4">Rental Terms</h3>
              <p className="text-gray-700 leading-relaxed">{vehicle.rentalTerms}</p>
              <h4 className="font-semibold text-secondary mt-4">Cancellation Policy</h4>
              <p className="text-gray-700 leading-relaxed">{vehicle.cancellationPolicy}</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="card sticky top-24 space-y-6">
              <div>
                <h2 className="font-montserrat font-bold text-2xl text-secondary mb-2">Book This Vehicle</h2>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} size={14} className={i < Math.floor(vehicle.rating) ? "text-warning" : "text-gray-300"} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({vehicle.totalReviews || vehicle.reviews?.length || 0} reviews)</span>
                </div>

                <div className="text-3xl font-montserrat font-bold text-primary mb-2">{formatCurrency(vehicle.pricePerDay)}<span className="text-sm text-gray-600 font-normal">/day</span></div>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>🚗 {vehicle.type}</p>
                  <p>🛞 {vehicle.brand} {vehicle.model}</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="space-y-3 mb-6">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Pickup Date</label>
                    <input type="date" value={bookingData.pickupDate} onChange={(e) => setBookingData((prev) => ({ ...prev, pickupDate: e.target.value }))} className="input-field text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Return Date</label>
                    <input type="date" value={bookingData.returnDate} onChange={(e) => setBookingData((prev) => ({ ...prev, returnDate: e.target.value }))} className="input-field text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Pickup Location</label>
                    <input type="text" value={bookingData.pickupLocation} onChange={(e) => setBookingData((prev) => ({ ...prev, pickupLocation: e.target.value }))} placeholder="Location" className="input-field text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Return Location</label>
                    <input type="text" value={bookingData.returnLocation} onChange={(e) => setBookingData((prev) => ({ ...prev, returnLocation: e.target.value }))} placeholder="Location" className="input-field text-sm" />
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
                  <div className="flex justify-between text-sm"><span className="text-gray-600">Days:</span><span className="font-semibold">{totalDays}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-600">Rate per day:</span><span className="font-semibold">{formatCurrency(vehicle.pricePerDay)}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-600">Weekly rate:</span><span className="font-semibold">{formatCurrency(vehicle.weeklyPrice)}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-600">Monthly rate:</span><span className="font-semibold">{formatCurrency(vehicle.monthlyPrice)}</span></div>
                  <div className="border-t border-gray-200 pt-2 flex justify-between"><span className="text-secondary font-semibold">Total:</span><span className="text-primary font-bold">{formatCurrency(totalPrice)}</span></div>
                </div>

                <button onClick={handleBooking} disabled={bookingLoading} className="btn-primary w-full flex items-center justify-center gap-2"> <FaCalendar /> {bookingLoading ? "Booking..." : "Book Now"} </button>
              </div>

              {vehicle.status !== "available" && (<div className="p-3 bg-warning/10 text-warning rounded-lg text-sm">⚠️ This vehicle is currently {vehicle.status}</div>)}
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};
