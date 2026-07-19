import React from "react";
import { motion } from "framer-motion";
import { formatCurrency, formatDate, getStatusBadgeColor } from "../utils/helpers";
import { FaCalendar, FaCar, FaDollarSign } from "react-icons/fa";

export const BookingCard = ({ booking, onCancel, onViewDetails }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="card"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">Booking ID</p>
          <p className="font-semibold text-secondary">{booking.bookingId}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(booking.bookingStatus)}`}>
          {booking.bookingStatus}
        </span>
      </div>

      <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
        {/* Vehicle Info */}
        <div className="flex items-center gap-3 text-sm">
          <FaCar className="text-primary" />
          <span className="text-secondary font-medium">{booking.vehicleId?.name || "Vehicle"}</span>
        </div>

        {/* Dates */}
        <div className="flex items-center gap-3 text-sm">
          <FaCalendar className="text-accent" />
          <span className="text-gray-700">
            {formatDate(booking.pickupDate)} - {formatDate(booking.returnDate)}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3 text-sm">
          <FaDollarSign className="text-success" />
          <span className="text-secondary font-semibold">{formatCurrency(booking.totalPrice)}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onViewDetails(booking._id)}
          className="flex-1 px-4 py-2 border border-primary text-primary rounded-lg text-sm font-semibold hover:bg-primary/10 transition-smooth"
        >
          View Details
        </button>
        {booking.bookingStatus === "pending" && (
          <button
            onClick={() => onCancel(booking._id)}
            className="flex-1 px-4 py-2 bg-danger/10 text-danger rounded-lg text-sm font-semibold hover:bg-danger/20 transition-smooth"
          >
            Cancel
          </button>
        )}
      </div>
    </motion.div>
  );
};
