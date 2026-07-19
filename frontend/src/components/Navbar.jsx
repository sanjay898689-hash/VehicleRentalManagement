import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaMoon, FaSun, FaBell, FaUser, FaChevronDown, FaRocket, FaHeadset, FaShieldAlt, FaClock, FaGift, FaCrown } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("system");
    } else {
      setTheme("dark");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setUserMenuOpen(false);
  };

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Vehicles", path: "/vehicles" },
    { label: "Services", path: "/#services" },
    { label: "About", path: "/#about" },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass dark:glass-md shadow-glass"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center shadow-glow">
              <span className="text-white font-bold text-lg">⚡</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-slate-900 dark:text-white">Drive<span className="text-primary-500">X</span></span>
              <span className="text-xs text-slate-600 dark:text-slate-400 hidden sm:block">Drive Beyond Limits</span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`relative text-sm font-medium transition-colors duration-300 ${
                  location.pathname === link.path
                    ? "text-primary-500"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
                whileHover={{ y: -2 }}
              >
                {link.label}
                {location.pathname === link.path && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500"
                    layoutId="underline"
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 md:gap-6">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-slate-900/10 dark:hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isDark ? <FaSun className="text-yellow-400 text-lg" /> : <FaMoon className="text-slate-900 text-lg" />}
            </motion.button>

            {/* Notifications */}
            {isAuthenticated && (
              <motion.button
                className="p-2 rounded-lg hover:bg-slate-900/10 dark:hover:bg-white/10 relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaBell className="text-slate-900 dark:text-white text-lg" />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full"
                />
              </motion.button>
            )}

            {/* User Menu or Auth Buttons */}
            {isAuthenticated ? (
              <div className="relative hidden sm:block">
                <motion.button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-900/10 dark:hover:bg-white/10"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                    <FaUser className="text-white text-sm" />
                  </div>
                  <FaChevronDown className="text-slate-600 dark:text-slate-400 text-xs" />
                </motion.button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className="absolute right-0 mt-2 w-48 glass dark:glass-md rounded-xl overflow-hidden shadow-hover"
                    >
                      <div className="p-4 border-b border-white/10">
                        <p className="text-sm text-slate-900 dark:text-white font-semibold">{user?.name || "User"}</p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">{user?.email}</p>
                      </div>
                      <div className="p-2">
                        <button
                          onClick={() => { navigate("/dashboard"); setUserMenuOpen(false); }}
                          className="w-full text-left px-4 py-2 text-sm text-slate-900 dark:text-white hover:bg-primary-500/10 rounded-lg transition-colors"
                        >
                          Dashboard
                        </button>
                        <button
                          onClick={() => { navigate("/profile"); setUserMenuOpen(false); }}
                          className="w-full text-left px-4 py-2 text-sm text-slate-900 dark:text-white hover:bg-primary-500/10 rounded-lg transition-colors"
                        >
                          Profile
                        </button>
                        {user?.role === "admin" && (
                          <button
                            onClick={() => { navigate("/admin"); setUserMenuOpen(false); }}
                            className="w-full text-left px-4 py-2 text-sm text-slate-900 dark:text-white hover:bg-primary-500/10 rounded-lg transition-colors"
                          >
                            Admin Panel
                          </button>
                        )}
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-danger hover:bg-danger/10 rounded-lg transition-colors"
                        >
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="md"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => navigate("/register")}
                >
                  Sign Up
                </Button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-900/10 dark:hover:bg-white/10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {mobileMenuOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/10 overflow-hidden"
            >
              <div className="p-4 space-y-3">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.path}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => { navigate(link.path); setMobileMenuOpen(false); }}
                    className="w-full text-left px-4 py-2 text-slate-900 dark:text-white hover:bg-primary-500/10 rounded-lg transition-colors"
                  >
                    {link.label}
                  </motion.button>
                ))}
                {!isAuthenticated && (
                  <>
                    <Button
                      variant="secondary"
                      size="md"
                      fullWidth
                      onClick={() => { navigate("/login"); setMobileMenuOpen(false); }}
                    >
                      Login
                    </Button>
                    <Button
                      variant="primary"
                      size="md"
                      fullWidth
                      onClick={() => { navigate("/register"); setMobileMenuOpen(false); }}
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
