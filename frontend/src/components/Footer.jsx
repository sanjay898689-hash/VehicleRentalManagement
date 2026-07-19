import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-white mt-20">
      {/* Main Footer */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-montserrat font-bold text-2xl mb-4 flex items-center gap-2">
              <span>🚗</span>
              VRoom
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Premium vehicle rental service for all your transportation needs.
            </p>
            <div className="flex gap-3">
              {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2 bg-white/10 rounded-lg hover:bg-primary transition-smooth"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/" className="hover:text-white transition-smooth">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/vehicles" className="hover:text-white transition-smooth">
                  Vehicles
                </Link>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-smooth">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-smooth">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Services</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="hover:text-white transition-smooth cursor-pointer">Daily Rental</li>
              <li className="hover:text-white transition-smooth cursor-pointer">Weekly Rental</li>
              <li className="hover:text-white transition-smooth cursor-pointer">Monthly Rental</li>
              <li className="hover:text-white transition-smooth cursor-pointer">Long Term Rental</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Contact Us</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center gap-3">
                <FaPhone className="text-primary" size={16} />
                <a href="tel:+1234567890" className="hover:text-white transition-smooth">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-primary" size={16} />
                <a href="mailto:info@vroom.com" className="hover:text-white transition-smooth">
                  info@vroom.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-primary flex-shrink-0 mt-1" size={16} />
                <span>123 Main Street, New York, NY 10001</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-300">
            <p>&copy; {currentYear} VRoom. All rights reserved.</p>
            <ul className="flex gap-6 mt-4 md:mt-0">
              <li>
                <a href="#" className="hover:text-white transition-smooth">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-smooth">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-smooth">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
