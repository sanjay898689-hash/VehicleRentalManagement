/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#2563EB',
          600: '#1D4ED8',
          700: '#1E40AF',
          800: '#1E3A8A',
          900: '#172554',
        },
        secondary: '#0F172A',
        accent: {
          50: '#F0F9FA',
          100: '#CFFAFE',
          200: '#A5F3FC',
          300: '#67E8F9',
          400: '#22D3EE',
          500: '#06B6D4',
          600: '#0891B2',
          700: '#0E7490',
          800: '#155E75',
          900: '#164E63',
        },
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#EF4444',
        background: {
          light: '#F8FAFC',
          dark: '#020617',
        },
        surface: {
          light: '#FFFFFF',
          dark: '#1E293B',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-light': '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
        soft: '0 10px 15px -3px rgba(15, 23, 42, 0.1)',
        hover: '0 20px 25px -5px rgba(37, 99, 235, 0.2)',
        'hover-dark': '0 20px 25px -5px rgba(6, 182, 212, 0.2)',
        glow: '0 0 20px rgba(37, 99, 235, 0.4)',
      },
      backdropBlur: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out',
        slideUp: 'slideUp 0.4s ease-out',
        slideDown: 'slideDown 0.4s ease-out',
        slideLeft: 'slideLeft 0.4s ease-out',
        slideRight: 'slideRight 0.4s ease-out',
        scaleIn: 'scaleIn 0.3s ease-out',
        float: 'float 3s ease-in-out infinite',
        pulse: 'pulse 2s ease-in-out infinite',
        shimmer: 'shimmer 2s infinite',
        glow: 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(37, 99, 235, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(37, 99, 235, 0.8)' },
        },
      },
    },
  },
  plugins: [
    function ({ addComponents, theme }) {
      addComponents({
        '.glass': {
          '@apply backdrop-blur-md bg-white/20 border border-white/30 dark:bg-slate-900/20 dark:border-slate-700/30': {},
        },
        '.glass-md': {
          '@apply backdrop-blur-lg bg-white/30 border border-white/40 dark:bg-slate-900/30 dark:border-slate-700/40': {},
        },
        '.btn-primary': {
          '@apply px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-lg hover:shadow-hover transition-all duration-300 active:scale-95': {},
        },
        '.btn-secondary': {
          '@apply px-6 py-3 bg-slate-900/10 dark:bg-white/10 text-slate-900 dark:text-white font-semibold rounded-lg hover:bg-slate-900/20 dark:hover:bg-white/20 transition-all duration-300': {},
        },
        '.input-field': {
          '@apply w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:text-white transition-all duration-300': {},
        },
        '.card': {
          '@apply bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-soft hover:shadow-lg transition-all duration-300': {},
        },
        '.card-glass': {
          '@apply glass rounded-2xl p-6 backdrop-blur-xl': {},
        },
      });
    },
  ],
};
