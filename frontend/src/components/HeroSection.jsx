import React from "react";
import { motion } from "framer-motion";
import { FaRocket, FaPlay } from "react-icons/fa";
import Button from "./Button";

export const HeroSection = ({ onExplore, onBook, onWatch }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const heroBackground = "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1600&q=80";

  return (
    <div
      className="relative min-h-screen pt-20 overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.92) 100%), url('${heroBackground}')`,
      }}
    >
      <div className="absolute inset-0 bg-slate-950/75" />
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-14 left-10 w-72 h-72 bg-primary-500/15 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, delay: 5 }}
          className="absolute bottom-16 right-10 w-80 h-80 bg-accent-500/15 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="z-10"
          >
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full glass dark:glass-md"
            >
              <FaRocket className="text-primary-400" />
              <span className="text-sm font-semibold text-white">TOP RATED CAR RENTAL</span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Drive Beyond <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">Limits</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              className="text-xl text-slate-300 mb-8 leading-relaxed"
            >
              Book premium cars, bikes, SUVs, luxury vehicles and electric vehicles with one click. Fast, reliable and affordable.
            </motion.p>

            {/* Features */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 mb-8"
            >
              {[
                { label: "Best Prices", desc: "Guaranteed" },
                { label: "Wide Selection", desc: "500+ Vehicles" },
                { label: "Easy Booking", desc: "In Just 2 Mins" },
              ].map((feature, i) => (
                <div key={i} className="space-y-1">
                  <div className="text-sm font-semibold text-primary-400">{feature.label}</div>
                  <div className="text-xs text-slate-400">{feature.desc}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <Button
                variant="primary"
                size="lg"
                icon={FaRocket}
                onClick={onExplore}
              >
                Explore Fleet
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={onBook}
              >
                Book Now
              </Button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onWatch}
                className="px-6 py-3 rounded-lg font-semibold text-white flex items-center gap-2 hover:bg-white/10 transition-all duration-300"
              >
                <FaPlay className="text-primary-400" />
                Watch Demo
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Side - Car Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative h-[520px] lg:h-[720px]"
          >
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="relative h-full flex items-center justify-center"
            >
              <img
                src="https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=900&q=80"
                alt="Luxury sports car"
                className="w-full h-full object-cover rounded-[36px] shadow-2xl border border-white/10"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent rounded-[36px]" />
            </motion.div>

            {/* Floating Cards */}
            <motion.div
              animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
              className="absolute top-16 right-5 glass dark:glass-md rounded-3xl p-5 w-64"
            >
              <p className="text-white text-sm font-semibold mb-3">⭐ Customer Rating</p>
              <div className="flex items-center gap-2 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-slate-300 text-xs">4.9 out of 5 from 10K+ reviews</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
