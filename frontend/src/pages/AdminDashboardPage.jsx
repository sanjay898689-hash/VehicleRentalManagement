import React, { useEffect, useState } from "react";
import { AdminLayout } from "../layouts/AdminLayout";
import { vehicleService, bookingService, authService } from "../services/api";
import { DashboardCard } from "../components/DashboardCard";
import { Loader } from "../components/Loader";
import { FaCar, FaCalendar, FaUsers, FaDollarSign } from "react-icons/fa";
import { useToast } from "../context/ToastContext";

export const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [vehicleRes, bookingRes, usersRes] = await Promise.all([
          vehicleService.getVehicleStats(),
          bookingService.getBookingStats(),
          authService.getAllUsers(),
        ]);

        setStats({
          vehicles: vehicleRes.data.stats,
          bookings: bookingRes.data.stats,
          users: usersRes.data.count,
          revenue: bookingRes.data.stats.revenue,
        });
      } catch (err) {
        addToast("Failed to load admin dashboard", "error");
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [addToast]);

  if (loading) return <Loader />;

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <DashboardCard icon={FaCar} title="Total Vehicles" value={stats.vehicles.total} color="primary" />
        <DashboardCard icon={FaCalendar} title="Total Bookings" value={stats.bookings.total} color="accent" />
        <DashboardCard icon={FaUsers} title="Total Users" value={stats.users} color="success" />
        <DashboardCard icon={FaDollarSign} title="Total Revenue" value={`$${stats.revenue.toLocaleString()}`} color="warning" />
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card p-6">
          <h2 className="font-bold text-xl text-secondary mb-4">Vehicle Status</h2>
          <div className="space-y-3 text-sm text-gray-700">
            <p>Total: {stats.vehicles.total}</p>
            <p>Available: {stats.vehicles.available}</p>
            <p>Rented: {stats.vehicles.rented}</p>
            <p>Maintenance: {stats.vehicles.maintenance}</p>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="font-bold text-xl text-secondary mb-4">Booking Overview</h2>
          <div className="space-y-3 text-sm text-gray-700">
            <p>Pending: {stats.bookings.pending}</p>
            <p>Confirmed: {stats.bookings.confirmed}</p>
            <p>Active: {stats.bookings.active}</p>
            <p>Completed: {stats.bookings.completed}</p>
            <p>Cancelled: {stats.bookings.cancelled}</p>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="font-bold text-xl text-secondary mb-4">Quick Actions</h2>
          <div className="space-y-3 text-sm text-gray-700">
            <p>Use the sidebar to manage vehicles, bookings and users.</p>
            <p>All admin actions are protected by your account role.</p>
            <p>Live updates will appear when bookings change.</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
