import React from 'react';
import { motion } from 'framer-motion';

const variantStyles = {
  primary: 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:shadow-hover hover:from-primary-600 hover:to-primary-700',
  secondary: 'bg-slate-900/10 dark:bg-white/10 text-slate-900 dark:text-white hover:bg-slate-900/20 dark:hover:bg-white/20',
  outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20',
  ghost: 'text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800',
  danger: 'bg-danger text-white hover:bg-red-600 hover:shadow-hover',
  success: 'bg-success text-white hover:bg-green-600 hover:shadow-hover',
};

const sizeStyles = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-3 text-base',
  lg: 'px-6 py-3 text-base',
  xl: 'px-8 py-4 text-lg',
};

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  icon: Icon = null,
  iconPosition = 'left',
  fullWidth = false,
  ...props
}) => {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      disabled={disabled || loading}
      className={`
        font-semibold rounded-lg transition-all duration-300
        flex items-center justify-center gap-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }}>
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full" />
        </motion.div>
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon size={20} />}
          {children}
          {Icon && iconPosition === 'right' && <Icon size={20} />}
        </>
      )}
    </motion.button>
  );
};

export default Button;
