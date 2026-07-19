import React from 'react';
import { motion } from 'framer-motion';

export const Card = ({ children, className = '', hover = true, ...props }) => (
  <motion.div
    whileHover={hover ? { y: -5 } : {}}
    className={`card ${className}`}
    {...props}
  >
    {children}
  </motion.div>
);

export const CardGlass = ({ children, className = '', ...props }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className={`card-glass ${className}`}
    {...props}
  >
    {children}
  </motion.div>
);

export const FeatureCard = ({ icon: Icon, title, description, className = '' }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className={`p-6 card cursor-pointer ${className}`}
  >
    <div className="mb-4 w-12 h-12 rounded-lg bg-gradient-to-r from-primary-500/20 to-accent-500/20 flex items-center justify-center">
      {Icon && <Icon className="text-primary-500" size={24} />}
    </div>
    <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">{title}</h3>
    <p className="text-slate-600 dark:text-slate-400 text-sm">{description}</p>
  </motion.div>
);

export const StatCard = ({ label, value, icon: Icon, trend = null, className = '' }) => (
  <motion.div
    whileHover={{ y: -8 }}
    className={`p-6 card ${className}`}
  >
    <div className="flex items-start justify-between mb-4">
      {Icon && (
        <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-primary-500/10 to-accent-500/10 flex items-center justify-center">
          <Icon className="text-primary-500" size={24} />
        </div>
      )}
      {trend && (
        <div className={`text-sm font-semibold ${trend > 0 ? 'text-success' : 'text-danger'}`}>
          {trend > 0 ? '+' : ''}{trend}%
        </div>
      )}
    </div>
    <h4 className="text-sm text-slate-600 dark:text-slate-400 mb-1">{label}</h4>
    <p className="text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
  </motion.div>
);

export default Card;
