import React, { useEffect, useState } from "react";
import { AdminLayout } from "../layouts/AdminLayout";
import { bookingService } from "../services/api";
import { Loader } from "../components/Loader";
import { useToast } from "../context/ToastContext";

export const AdminBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const { data } = await bookingService.getAllBookings({});
      setBookings(data.bookings);
    } catch (err) {
      addToast("Failed to load bookings", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) return <Loader />;

  return (
    <AdminLayout>
      <div className="card p-8">
        <h1 className="font-bold text-3xl text-secondary mb-4">Manage Bookings</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
              <tr>
                <th className="px-4 py-3">Booking ID</th>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Vehicle</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="border-t border-slate-200 dark:border-slate-700">
                  <td className="px-4 py-4">{booking.bookingId}</td>
                  <td className="px-4 py-4">{booking.userId?.name || "-"}</td>
                  <td className="px-4 py-4">{booking.vehicleId?.name || "-"}</td>
                  <td className="px-4 py-4 capitalize">{booking.bookingStatus}</td>
                  <td className="px-4 py-4 capitalize">{booking.paymentStatus}</td>
                  <td className="px-4 py-4">{booking.totalPrice ? new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(booking.totalPrice) : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};
