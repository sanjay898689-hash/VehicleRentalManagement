// DriveX Design System Constants

export const BRAND = {
  name: 'DriveX',
  tagline: 'Drive Beyond Limits',
  description: 'Premium vehicle rental platform for modern travelers',
};

// Color Palette
export const COLORS = {
  primary: '#2563EB',
  primaryLight: '#3B82F6',
  primaryDark: '#1D4ED8',
  
  secondary: '#0F172A',
  secondaryLight: '#1E293B',
  
  accent: '#06B6D4',
  accentLight: '#14B8A6',
  
  success: '#22C55E',
  successLight: '#4ADE80',
  
  warning: '#F59E0B',
  warningLight: '#FBBF24',
  
  danger: '#EF4444',
  dangerLight: '#F87171',
  
  background: '#F8FAFC',
  backgroundDark: '#020617',
  
  surface: '#FFFFFF',
  surfaceDark: '#1E293B',
  
  border: '#E2E8F0',
  borderDark: '#334155',
  
  text: '#0F172A',
  textLight: '#64748B',
  textMuted: '#94A3B8',
  
  textDark: '#F8FAFC',
  textLightDark: '#CBD5E1',
  textMutedDark: '#78716C',
};

// Typography
export const TYPOGRAPHY = {
  fontFamily: {
    poppins: "'Poppins', sans-serif",
    inter: "'Inter', sans-serif",
    spaceGrotesk: "'Space Grotesk', sans-serif",
  },
  
  sizes: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
    '6xl': '3.75rem',   // 60px
    '7xl': '4.5rem',    // 72px
  },
  
  weights: {
    thin: 100,
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
};

// Spacing Scale
export const SPACING = {
  xs: '0.25rem',       // 4px
  sm: '0.5rem',        // 8px
  md: '1rem',          // 16px
  lg: '1.5rem',        // 24px
  xl: '2rem',          // 32px
  '2xl': '2.5rem',     // 40px
  '3xl': '3rem',       // 48px
  '4xl': '4rem',       // 64px
};

// Border Radius
export const BORDER_RADIUS = {
  none: '0',
  sm: '0.375rem',      // 6px
  md: '0.5rem',        // 8px
  lg: '0.75rem',       // 12px
  xl: '1rem',          // 16px
  '2xl': '1.5rem',     // 24px
  '3xl': '2rem',       // 32px
  full: '9999px',
};

// Shadows
export const SHADOWS = {
  none: 'none',
  
  sm: '0 1px 2px 0 rgba(15, 23, 42, 0.05)',
  
  md: '0 4px 6px -1px rgba(15, 23, 42, 0.1), 0 2px 4px -2px rgba(15, 23, 42, 0.1)',
  
  lg: '0 10px 15px -3px rgba(15, 23, 42, 0.1), 0 4px 6px -4px rgba(15, 23, 42, 0.1)',
  
  xl: '0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.1)',
  
  '2xl': '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
  
  glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  glassLight: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
  
  hover: '0 20px 25px -5px rgba(37, 99, 235, 0.2)',
  hoverDark: '0 20px 25px -5px rgba(6, 182, 212, 0.2)',
};

// Animations
export const ANIMATIONS = {
  duration: {
    xs: '150ms',
    sm: '200ms',
    md: '300ms',
    lg: '500ms',
    xl: '700ms',
  },
  
  easing: {
    easeInOutQuad: 'cubic-bezier(0.45, 0, 0.55, 1)',
    easeOutQuad: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    easeInOutCubic: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    easeOutCubic: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
    easeInOutElastic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
};

// Breakpoints
export const BREAKPOINTS = {
  mobile: '0px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Z-Index
export const Z_INDEX = {
  hide: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
};

// Vehicle Categories
export const VEHICLE_CATEGORIES = [
  { id: 'sedan', label: 'Sedan', icon: 'sedan' },
  { id: 'suv', label: 'SUV', icon: 'suv' },
  { id: 'luxury', label: 'Luxury', icon: 'luxury' },
  { id: 'sports', label: 'Sports', icon: 'sports' },
  { id: 'electric', label: 'Electric', icon: 'electric' },
  { id: 'bike', label: 'Bike', icon: 'bike' },
];

// Popular Brands
export const POPULAR_BRANDS = [
  { id: 'bmw', label: 'BMW', logo: '🅱️' },
  { id: 'mercedes', label: 'Mercedes', logo: '🅼️' },
  { id: 'audi', label: 'Audi', logo: '🅰️' },
  { id: 'tesla', label: 'Tesla', logo: '🔌' },
  { id: 'toyota', label: 'Toyota', logo: '🚗' },
  { id: 'hyundai', label: 'Hyundai', logo: '🅷️' },
  { id: 'honda', label: 'Honda', logo: '🅷️' },
  { id: 'mahindra', label: 'Mahindra', logo: '🅼️' },
];

// Feature List
export const FEATURES = [
  {
    id: 'instant',
    title: 'Instant Booking',
    description: 'Book your vehicle in seconds with our seamless booking process',
    icon: 'FaRocket',
  },
  {
    id: 'premium',
    title: 'Premium Fleet',
    description: 'Access our curated collection of luxury and modern vehicles',
    icon: 'FaCrown',
  },
  {
    id: 'support',
    title: '24/7 Support',
    description: 'Round-the-clock customer support for your peace of mind',
    icon: 'FaHeadset',
  },
  {
    id: 'insurance',
    title: 'Full Insurance',
    description: 'Comprehensive coverage for all your journeys',
    icon: 'FaShieldAlt',
  },
  {
    id: 'flexible',
    title: 'Flexible Plans',
    description: 'Choose the rental duration that suits you best',
    icon: 'FaClock',
  },
  {
    id: 'rewards',
    title: 'Rewards Program',
    description: 'Earn points on every booking and unlock exclusive benefits',
    icon: 'FaGift',
  },
];

// Pricing Plans
export const PRICING_PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for occasional travelers',
    price: 29,
    period: 'month',
    features: [
      'Up to 10 bookings/month',
      'Basic vehicle access',
      'Email support',
      'Standard insurance',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Ideal for regular commuters',
    price: 79,
    period: 'month',
    features: [
      'Unlimited bookings',
      'Premium vehicle access',
      'Priority support',
      'Full insurance coverage',
      '10% discount on all bookings',
    ],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For businesses and teams',
    price: 199,
    period: 'month',
    features: [
      'Everything in Professional',
      'Dedicated account manager',
      'Custom vehicle requirements',
      'Advanced analytics',
      '20% discount on all bookings',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

// Stats
export const STATS = [
  { label: 'Active Users', value: '50K+', icon: 'FaUsers' },
  { label: 'Vehicles', value: '10K+', icon: 'FaCar' },
  { label: 'Bookings', value: '500K+', icon: 'FaCalendar' },
  { label: 'Cities', value: '150+', icon: 'FaMapMarkerAlt' },
];

// Testimonials
export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Business Executive',
    image: '👩‍💼',
    rating: 5,
    text: 'DriveX has transformed how I travel for business. The seamless booking and premium fleet are unmatched.',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Adventure Enthusiast',
    image: '👨‍🦱',
    rating: 5,
    text: 'Perfect for my weekend getaways. Great selection of vehicles and excellent customer support.',
  },
  {
    id: 3,
    name: 'Emma Wilson',
    role: 'Travel Blogger',
    image: '👩‍🎨',
    rating: 5,
    text: 'The app is incredibly intuitive and the variety of vehicles is fantastic. Highly recommended!',
  },
];
