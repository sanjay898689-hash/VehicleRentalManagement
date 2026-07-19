import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MainLayout } from "../layouts/MainLayout";
import { vehicleService } from "../services/api";
import { VehicleCard } from "../components/VehicleCard";
import { Loader } from "../components/Loader";
import { FaFilter, FaSearch } from "react-icons/fa";

export const VehiclesPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    brand: "",
    fuelType: "",
    type: "",
    minPrice: "",
    maxPrice: "",
  });

  useEffect(() => {
    fetchVehicles();
  }, [filters]);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const { data } = await vehicleService.getAllVehicles(filters);
      setVehicles(data.vehicles);
    } catch (err) {
      console.error("Failed to fetch vehicles:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
    );
  };

  if (loading) return <Loader />;

  return (
    <MainLayout>
      <div className="container py-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-montserrat font-bold text-4xl text-secondary mb-8"
        >
          Available Vehicles
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Filters */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="card sticky top-24">
              <h3 className="font-bold text-lg text-secondary mb-6 flex items-center gap-2">
                <FaFilter /> Filters
              </h3>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-secondary mb-2">Search</label>
                <div className="relative">
                  <FaSearch className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    name="search"
                    value={filters.search}
                    onChange={handleFilterChange}
                    placeholder="Vehicle name..."
                    className="input-field pl-10"
                  />
                </div>
              </div>

              {/* Brand */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-secondary mb-2">Brand</label>
                <select
                  name="brand"
                  value={filters.brand}
                  onChange={handleFilterChange}
                  className="input-field"
                >
                  <option value="">All Brands</option>
                  <option value="Toyota">Toyota</option>
                  <option value="Honda">Honda</option>
                  <option value="BMW">BMW</option>
                  <option value="Mercedes">Mercedes</option>
                  <option value="Audi">Audi</option>
                </select>
              </div>

              {/* Fuel Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-secondary mb-2">Fuel Type</label>
                <select
                  name="fuelType"
                  value={filters.fuelType}
                  onChange={handleFilterChange}
                  className="input-field"
                >
                  <option value="">All Fuel Types</option>
                  <option value="petrol">Petrol</option>
                  <option value="diesel">Diesel</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="electric">Electric</option>
                </select>
              </div>

              {/* Vehicle Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-secondary mb-2">Vehicle Type</label>
                <select
                  name="type"
                  value={filters.type}
                  onChange={handleFilterChange}
                  className="input-field"
                >
                  <option value="">All Types</option>
                  <option value="sedan">Sedan</option>
                  <option value="suv">SUV</option>
                  <option value="hatchback">Hatchback</option>
                  <option value="coupe">Coupe</option>
                  <option value="van">Van</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-secondary mb-2">Price Range</label>
                <div className="space-y-2">
                  <input
                    type="number"
                    name="minPrice"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                    placeholder="Min price"
                    className="input-field"
                  />
                  <input
                    type="number"
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    placeholder="Max price"
                    className="input-field"
                  />
                </div>
              </div>

              {/* Reset Button */}
              <button
                onClick={() =>
                  setFilters({
                    search: "",
                    brand: "",
                    fuelType: "",
                    type: "",
                    minPrice: "",
                    maxPrice: "",
                  })
                }
                className="btn-outline w-full"
              >
                Reset Filters
              </button>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3"
          >
            {vehicles.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No vehicles found. Try adjusting your filters.</p>
              </div>
            ) : (
              <>
                <p className="text-gray-600 mb-6">Found {vehicles.length} vehicles</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {vehicles.map((vehicle) => (
                    <VehicleCard
                      key={vehicle._id}
                      vehicle={vehicle}
                      onWishlist={wishlist}
                      onAddWishlist={handleAddWishlist}
                    />
                  ))}
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};
