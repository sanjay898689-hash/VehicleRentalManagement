import React from "react";
import { motion } from "framer-motion";
import { formatCurrency } from "../utils/helpers";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

export const VehicleCard = ({ vehicle, onWishlist, onAddWishlist }) => {
  const isWishlisted = onWishlist?.includes(vehicle._id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(15, 23, 42, 0.12)" }}
      transition={{ duration: 0.3 }}
      className="card group cursor-pointer overflow-hidden"
    >
      <div className="relative h-48 overflow-hidden rounded-xl mb-4 bg-gray-200">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-3">
          <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
            {vehicle.brand}
          </span>
          <button
            onClick={() => onAddWishlist(vehicle._id)}
            className="bg-white rounded-full p-2 hover:bg-gray-100 transition-smooth shadow-soft"
          >
            {isWishlisted ? (
              <FaHeart className="text-danger" size={18} />
            ) : (
              <FaRegHeart className="text-gray-400" size={18} />
            )}
          </button>
        </div>

        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs">
          {vehicle.status === "available" ? "Available" : vehicle.status === "rented" ? "Rented" : "Maintenance"}
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-montserrat font-bold text-lg text-secondary line-clamp-1">
            {vehicle.name}
          </h3>
          <span className="text-xs text-gray-500">{vehicle.driveType}</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                size={14}
                className={i < Math.floor(vehicle.rating) ? "text-warning" : "text-gray-300"}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">({vehicle.totalReviews || vehicle.reviews?.length || 0})</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
          <span>🚗 {vehicle.type}</span>
          <span>⛽ {vehicle.fuelType}</span>
          <span>👥 {vehicle.seatingCapacity} seats</span>
          <span>⚙️ {vehicle.transmission}</span>
          <span>📊 {vehicle.mileage}</span>
          <span>🏎️ {vehicle.topSpeed}</span>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200 flex flex-col gap-3">
        <div className="grid grid-cols-3 gap-2 text-center text-xs text-gray-600">
          <div className="p-2 rounded-xl bg-slate-50">Day {formatCurrency(vehicle.pricePerDay)}</div>
          <div className="p-2 rounded-xl bg-slate-50">Week {formatCurrency(vehicle.weeklyPrice)}</div>
          <div className="p-2 rounded-xl bg-slate-50">Month {formatCurrency(vehicle.monthlyPrice)}</div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm text-gray-600">Reg No.</p>
            <p className="font-semibold text-secondary text-sm">{vehicle.registrationNumber || vehicle.licensePlate}</p>
          </div>
          <Link
            to={`/vehicle/${vehicle._id}`}
            className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition-smooth"
          >
            Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
