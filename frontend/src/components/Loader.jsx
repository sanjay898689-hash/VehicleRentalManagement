import React from "react";
import { motion } from "framer-motion";

export const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary/10 to-accent/10">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <motion.div
          className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-accent"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <p className="text-secondary font-semibold">Loading...</p>
      </motion.div>
    </div>
  );
};
