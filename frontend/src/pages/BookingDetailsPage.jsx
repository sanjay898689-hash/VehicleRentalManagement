import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { MainLayout } from "../layouts/MainLayout";
import { bookingService } from "../services/api";
import { Loader } from "../components/Loader";
import { formatDate, formatCurrency, getStatusBadgeColor } from "../utils/helpers";
import { FaCalendar, FaRupeeSign, FaMapMarkerAlt, FaTruck, FaUser, FaPhone, FaEnvelope } from "react-icons/fa";
import { useToast } from "../context/ToastContext";

export const BookingDetailsPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    fetchBookingDetails();
  }, [id]);

  const fetchBookingDetails = async () => {
    try {
      const { data } = await bookingService.getBookingById(id);
      setBooking(data.booking);
    } catch (err) {
      addToast("Failed to load booking details", "error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  if (!booking) return <div className="container py-12 text-center">Booking not found</div>;

  return (
    <MainLayout>
      <div className="container py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-montserrat font-bold text-4xl text-secondary mb-2">
            Booking Details
          </h1>
          <p className="text-gray-600">Booking ID: {booking.bookingId}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Status Card */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-lg text-secondary">Booking Status</h2>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusBadgeColor(booking.bookingStatus)}`}>
                  {booking.bookingStatus}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Payment Status:</span>
                  <span className={`font-semibold ${booking.paymentStatus === 'completed' ? 'text-success' : 'text-warning'}`}>
                    {booking.paymentStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* Vehicle Information */}
            <div className="card">
              <h2 className="font-bold text-lg text-secondary mb-4 flex items-center gap-2">
                <FaTruck /> Vehicle Information
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Vehicle:</span>
                  <span className="font-semibold">{booking.vehicleId?.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Brand:</span>
                  <span className="font-semibold">{booking.vehicleId?.brand}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Model:</span>
                  <span className="font-semibold">{booking.vehicleId?.model}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-semibold">{booking.vehicleId?.type}</span>
                </div>
              </div>
            </div>

            {/* Dates & Locations */}
            <div className="card">
              <h2 className="font-bold text-lg text-secondary mb-4 flex items-center gap-2">
                <FaCalendar /> Rental Period
              </h2>
              <div className="space-y-3">
                <div className="p-4 bg-primary/5 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Pickup</p>
                  <p className="font-semibold text-lg">{formatDate(booking.pickupDate)}</p>
                  <p className="text-sm text-gray-600 mt-2">
                    <FaMapMarkerAlt className="inline mr-2" />
                    {booking.pickupLocation}
                  </p>
                </div>
                <div className="p-4 bg-accent/5 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Return</p>
                  <p className="font-semibold text-lg">{formatDate(booking.returnDate)}</p>
                  <p className="text-sm text-gray-600 mt-2">
                    <FaMapMarkerAlt className="inline mr-2" />
                    {booking.returnLocation}
                  </p>
                </div>
              </div>
            </div>

            {/* User Information */}
            <div className="card">
              <h2 className="font-bold text-lg text-secondary mb-4 flex items-center gap-2">
                <FaUser /> Renter Information
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-semibold">{booking.userId?.name}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <FaEnvelope className="text-primary" />
                  <a href={`mailto:${booking.userId?.email}`} className="text-primary hover:underline">
                    {booking.userId?.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <FaPhone className="text-primary" />
                  <a href={`tel:${booking.userId?.phone}`} className="text-primary hover:underline">
                    {booking.userId?.phone}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Price Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="card sticky top-24 space-y-6">
              <h2 className="font-bold text-lg text-secondary flex items-center gap-2">
                <FaRupeeSign /> Price Summary
              </h2>

              <div className="space-y-3 pb-6 border-b border-gray-200">
                <div className="flex justify-between">
                  <span className="text-gray-600">Days:</span>
                  <span className="font-semibold">{booking.totalDays} days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rate per day:</span>
                  <span className="font-semibold">{formatCurrency(booking.pricePerDay)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold">{formatCurrency(booking.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (10%):</span>
                  <span className="font-semibold">{formatCurrency(booking.taxAmount)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-secondary font-semibold">Total Amount:</span>
                <span className="text-3xl font-bold text-primary">{formatCurrency(booking.totalPrice)}</span>
              </div>

              <div className="p-3 bg-success/10 text-success rounded-lg text-sm">
                ✓ Payment method: {booking.paymentMethod}
              </div>

              {booking.notes && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Notes:</p>
                  <p className="text-gray-700">{booking.notes}</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};
