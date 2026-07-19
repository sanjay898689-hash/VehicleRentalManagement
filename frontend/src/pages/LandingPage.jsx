import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MainLayout } from "../layouts/MainLayout";
import { FaArrowRight, FaClock, FaShieldAlt, FaTrophy, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { vehicleService } from "../services/api";
import { VehicleCard } from "../components/VehicleCard";
import { Loader } from "../components/Loader";
import HeroSection from "../components/HeroSection";

export const LandingPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const { data } = await vehicleService.getAllVehicles({});
        setVehicles(data.vehicles.slice(0, 6));
      } catch (err) {
        console.error("Failed to fetch vehicles:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  const handleAddWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
    );
  };

  if (loading) return <Loader />;

  return (
    <MainLayout>
      <HeroSection />

      {/* Featured Vehicles */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-montserrat font-bold text-4xl text-secondary mb-4">
              Popular Vehicles
            </h2>
            <p className="text-gray-600">Choose from our wide range of premium vehicles</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle._id}
                vehicle={vehicle}
                onWishlist={wishlist}
                onAddWishlist={handleAddWishlist}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/vehicles" className="btn-primary inline-flex items-center gap-2">
              View All Vehicles <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="about" className="py-20 bg-secondary/5">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-montserrat font-bold text-4xl text-secondary mb-4">
              Why Choose VRoom?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: FaClock,
                title: "24/7 Support",
                desc: "Round-the-clock customer service for all your needs",
              },
              {
                icon: FaShieldAlt,
                title: "Secure Booking",
                desc: "Your data is safe with our advanced security",
              },
              {
                icon: FaTrophy,
                title: "Best Rates",
                desc: "Competitive pricing without compromising quality",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="card text-center"
              >
                <div className="text-5xl mb-4 text-primary">
                  <item.icon className="mx-auto" />
                </div>
                <h3 className="font-bold text-lg text-secondary mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-montserrat font-bold text-4xl text-secondary mb-4">
              Customer Reviews
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "John Doe",
                rating: 5,
                text: "Excellent service! Will definitely book again.",
                avatar: "👨",
              },
              {
                name: "Jane Smith",
                rating: 5,
                text: "Best rental experience I've had!",
                avatar: "👩",
              },
              {
                name: "Mike Johnson",
                rating: 4,
                text: "Great vehicles and smooth process.",
                avatar: "👨‍💼",
              },
            ].map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="card"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-3xl">{review.avatar}</span>
                  <div>
                    <p className="font-semibold text-secondary">{review.name}</p>
                    <div className="flex gap-1">
                      {[...Array(review.rating)].map((_, j) => (
                        <FaStar key={j} className="text-warning" size={14} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{review.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-montserrat font-bold text-4xl text-white mb-4">
              Ready to Book Your Vehicle?
            </h2>
            <p className="text-white/90 mb-8 text-lg">
              Join thousands of happy customers today
            </p>
            <Link to="/vehicles" className="inline-flex gap-2 bg-white text-primary px-8 py-3 rounded-lg font-bold hover:shadow-lg transition-smooth">
              Get Started Now <FaArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
};
