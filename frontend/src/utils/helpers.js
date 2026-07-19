// Format date
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Format time
export const formatTime = (date) => {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

// Calculate days between dates
export const calculateDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Get status badge color
export const getStatusBadgeColor = (status) => {
  const statusColors = {
    available: "bg-success/20 text-success",
    rented: "bg-warning/20 text-warning",
    maintenance: "bg-danger/20 text-danger",
    pending: "bg-warning/20 text-warning",
    confirmed: "bg-success/20 text-success",
    active: "bg-primary/20 text-primary",
    completed: "bg-success/20 text-success",
    cancelled: "bg-danger/20 text-danger",
  };
  return statusColors[status] || "bg-gray-200 text-gray-700";
};

// Validation helpers
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const re = /^[0-9]{10}$/;
  return re.test(phone);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};
