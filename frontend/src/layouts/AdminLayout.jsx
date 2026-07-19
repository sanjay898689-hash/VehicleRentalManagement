import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "../components/Navbar";
import { FaHome, FaUsers, FaCar, FaCalendar, FaChartBar, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menuItems = [
    { icon: FaChartBar, label: "Dashboard", path: "/admin" },
    { icon: FaCar, label: "Vehicles", path: "/admin/vehicles" },
    { icon: FaCalendar, label: "Bookings", path: "/admin/bookings" },
    { icon: FaUsers, label: "Users", path: "/admin/users" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="flex">
        {/* Sidebar */}
        <motion.aside
          initial={false}
          animate={{ width: sidebarOpen ? 280 : 80 }}
          transition={{ duration: 0.3 }}
          className="bg-secondary text-white overflow-hidden"
        >
          <div className="p-4">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <span className="text-2xl">🚗</span>
              {sidebarOpen && <span className="font-bold text-lg">VRoom</span>}
            </div>

            {/* Menu Items */}
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <motion.button
                  key={item.label}
                  type="button"
                  onClick={() => navigate(item.path)}
                  whileHover={{ paddingLeft: sidebarOpen ? 12 : 0 }}
                  className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-smooth"
                >
                  <item.icon size={20} />
                  {sidebarOpen && <span>{item.label}</span>}
                </motion.button>
              ))}
            </nav>

            {/* Divider */}
            <div className="border-t border-white/20 my-6"></div>

            {/* User Profile */}
            {sidebarOpen && (
              <div className="px-4 py-3 rounded-lg bg-white/5 mb-4">
                <p className="text-xs text-gray-400">Logged in as</p>
                <p className="font-semibold text-sm line-clamp-1">{user?.name}</p>
                <p className="text-xs text-gray-400">{user?.role}</p>
              </div>
            )}

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-danger/20 hover:text-danger transition-smooth"
            >
              <FaSignOutAlt size={20} />
              {sidebarOpen && <span>Logout</span>}
            </button>
          </div>
        </motion.aside>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">{children}</div>
        </div>
      </div>
    </div>
  );
};
