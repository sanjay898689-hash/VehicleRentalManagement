import axios from "axios";

const baseURL = import.meta?.env?.VITE_API_URL || "http://localhost:5000/api";

const API = axios.create({
  baseURL,
});

// Add token to requests
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth Service
export const authService = {
  register: (data) => API.post("/auth/register", data),
  login: (data) => API.post("/auth/login", data),
  getProfile: () => API.get("/auth/profile"),
  updateProfile: (data) => API.put("/auth/profile", data),
  getAllUsers: () => API.get("/auth/users"),
  deleteUser: (id) => API.delete(`/auth/users/${id}`),
};

// Vehicle Service
export const vehicleService = {
  getAllVehicles: (filters) => API.get("/vehicles", { params: filters }),
  getAvailableVehicles: () => API.get("/vehicles/available"),
  getVehicleById: (id) => API.get(`/vehicles/${id}`),
  createVehicle: (data) => API.post("/vehicles", data),
  updateVehicle: (id, data) => API.put(`/vehicles/${id}`, data),
  deleteVehicle: (id) => API.delete(`/vehicles/${id}`),
  addReview: (id, data) => API.post(`/vehicles/${id}/review`, data),
  getVehicleStats: () => API.get("/vehicles/admin/stats"),
};

// Booking Service
export const bookingService = {
  createBooking: (data) => API.post("/bookings", data),
  getUserBookings: () => API.get("/bookings/my-bookings"),
  getBookingById: (id) => API.get(`/bookings/${id}`),
  cancelBooking: (id) => API.put(`/bookings/${id}/cancel`),
  confirmPayment: (id) => API.put(`/bookings/${id}/confirm-payment`),
  getAllBookings: (filters) => API.get("/bookings", { params: filters }),
  updateBookingStatus: (id, data) => API.put(`/bookings/${id}/status`, data),
  getBookingStats: () => API.get("/bookings/admin/stats"),
};

export default API;
