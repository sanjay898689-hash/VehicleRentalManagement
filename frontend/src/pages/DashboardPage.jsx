import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MainLayout } from "../layouts/MainLayout";
import { bookingService } from "../services/api";
import { BookingCard } from "../components/BookingCard";
import { DashboardCard } from "../components/DashboardCard";
import { Loader } from "../components/Loader";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaCalendar, FaCar, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useToast } from "../context/ToastContext";

export const DashboardPage = () => {
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({ pending: 0, confirmed: 0, active: 0, completed: 0 });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { addToast } = useToast();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const { data } = await bookingService.getUserBookings();
      setBookings(data.bookings);

      // Calculate stats
      const bookingStats = {
        pending: data.bookings.filter((b) => b.bookingStatus === "pending").length,
        confirmed: data.bookings.filter((b) => b.bookingStatus === "confirmed").length,
        active: data.bookings.filter((b) => b.bookingStatus === "active").length,
        completed: data.bookings.filter((b) => b.bookingStatus === "completed").length,
      };
      setStats(bookingStats);
    } catch (err) {
      addToast("Failed to load dashboard", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        await bookingService.cancelBooking(id);
        addToast("Booking cancelled successfully", "success");
        fetchDashboardData();
      } catch (err) {
        addToast(err.response?.data?.message || "Failed to cancel booking", "error");
      }
    }
  };

  const handleViewDetails = (id) => {
    navigate(`/booking/${id}`);
  };

  if (loading) return <Loader />;

  return (
    <MainLayout>
      <div className="container py-12">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="font-montserrat font-bold text-4xl text-secondary mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600">Here's your booking overview</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <DashboardCard
            icon={FaCalendar}
            title="Pending Bookings"
            value={stats.pending}
            color="warning"
          />
          <DashboardCard
            icon={FaCheckCircle}
            title="Confirmed"
            value={stats.confirmed}
            color="primary"
          />
          <DashboardCard
            icon={FaCar}
            title="Active Rentals"
            value={stats.active}
            color="accent"
          />
          <DashboardCard
            icon={FaCheckCircle}
            title="Completed"
            value={stats.completed}
            color="success"
          />
        </div>

        {/* Bookings Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="font-montserrat font-bold text-2xl text-secondary mb-6">
            Your Bookings
          </h2>

          {bookings.length === 0 ? (
            <div className="card text-center py-12">
              <FaCar className="text-6xl text-gray-300 mx-auto mb-4" />
              <h3 className="font-bold text-lg text-secondary mb-2">No bookings yet</h3>
              <p className="text-gray-600 mb-6">Start exploring vehicles and make your first booking</p>
              <button
                onClick={() => navigate("/vehicles")}
                className="btn-primary inline-block"
              >
                Explore Vehicles
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bookings.map((booking) => (
                <BookingCard
                  key={booking._id}
                  booking={booking}
                  onCancel={handleCancelBooking}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </MainLayout>
  );
};
