import React, { useEffect, useState } from "react";
import { AdminLayout } from "../layouts/AdminLayout";
import { vehicleService } from "../services/api";
import { Loader } from "../components/Loader";
import { useToast } from "../context/ToastContext";

const getInitialVehicleState = () => ({
  name: "",
  brand: "",
  model: "",
  year: "",
  type: "",
  category: "Luxury",
  fuelType: "petrol",
  transmission: "automatic",
  seatingCapacity: "5",
  mileage: "",
  color: "",
  licensePlate: "",
  registrationNumber: "",
  vehicleId: "",
  driveType: "AWD",
  pricePerDay: "",
  weeklyPrice: "",
  monthlyPrice: "",
  securityDeposit: "0",
  location: "Mumbai",
  insurance: "Standard coverage included",
  insuranceStatus: "Active",
  description: "",
  shortDescription: "",
  fullDescription: "",
  rentalTerms: "",
  cancellationPolicy: "",
  image: "",
  galleryImages: "",
  features: "",
  engine: "",
  power: "",
  torque: "",
  topSpeed: "",
  acceleration: "",
  fuelTankCapacity: "",
  luggageCapacity: "",
  isAvailable: true,
  gpsEnabled: true,
  airConditioning: true,
  bluetooth: true,
  androidAuto: true,
  appleCarPlay: true,
  reverseCamera: true,
  parkingSensors: true,
  cruiseControl: true,
  sunroof: false,
  ABS: true,
  airbags: 4,
});

export const AdminVehiclesPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [editingVehicleId, setEditingVehicleId] = useState(null);
  const [newVehicle, setNewVehicle] = useState(getInitialVehicleState());
  const { addToast } = useToast();

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const { data } = await vehicleService.getAllVehicles({});
      setVehicles(data.vehicles);
    } catch (err) {
      addToast("Failed to load vehicles", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEditVehicle = (vehicle) => {
    setEditingVehicleId(vehicle._id);
    setNewVehicle({
      name: vehicle.name || "",
      brand: vehicle.brand || "",
      model: vehicle.model || "",
      year: vehicle.year || "",
      type: vehicle.type || "",
      category: vehicle.category || "Luxury",
      fuelType: vehicle.fuelType?.toLowerCase() || "petrol",
      transmission: vehicle.transmission?.toLowerCase() || "automatic",
      seatingCapacity: vehicle.seatingCapacity?.toString() || "5",
      mileage: vehicle.mileage || "",
      color: vehicle.color || "",
      licensePlate: vehicle.licensePlate || "",
      registrationNumber: vehicle.registrationNumber || "",
      vehicleId: vehicle.vehicleId || "",
      driveType: vehicle.driveType || "AWD",
      pricePerDay: vehicle.pricePerDay?.toString() || "",
      weeklyPrice: vehicle.weeklyPrice?.toString() || "",
      monthlyPrice: vehicle.monthlyPrice?.toString() || "",
      securityDeposit: vehicle.securityDeposit?.toString() || "0",
      location: vehicle.location || "Mumbai",
      insurance: vehicle.insurance || "Standard coverage included",
      insuranceStatus: vehicle.insuranceStatus || "Active",
      description: vehicle.description || "",
      shortDescription: vehicle.shortDescription || "",
      fullDescription: vehicle.fullDescription || "",
      rentalTerms: vehicle.rentalTerms || "",
      cancellationPolicy: vehicle.cancellationPolicy || "",
      image: vehicle.image || "",
      galleryImages: (vehicle.galleryImages || []).join(", "),
      features: (vehicle.features || []).join(", "),
      engine: vehicle.specifications?.engine || "",
      power: vehicle.specifications?.power || "",
      torque: vehicle.specifications?.torque || "",
      topSpeed: vehicle.specifications?.topSpeed || "",
      acceleration: vehicle.specifications?.acceleration || "",
      fuelTankCapacity: vehicle.fuelTankCapacity || "",
      luggageCapacity: vehicle.luggageCapacity || "",
      isAvailable: vehicle.isAvailable,
      gpsEnabled: vehicle.gpsEnabled,
      airConditioning: vehicle.airConditioning,
      bluetooth: vehicle.bluetooth,
      androidAuto: vehicle.androidAuto,
      appleCarPlay: vehicle.appleCarPlay,
      reverseCamera: vehicle.reverseCamera,
      parkingSensors: vehicle.parkingSensors,
      cruiseControl: vehicle.cruiseControl,
      sunroof: vehicle.sunroof,
      ABS: vehicle.ABS,
      airbags: vehicle.airbags,
    });
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const resetForm = () => {
    setEditingVehicleId(null);
    setNewVehicle(getInitialVehicleState());
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this vehicle?")) return;
    try {
      setRemoving(id);
      await vehicleService.deleteVehicle(id);
      addToast("Vehicle removed", "success");
      fetchVehicles();
    } catch (err) {
      addToast(err.response?.data?.message || "Delete failed", "error");
    } finally {
      setRemoving(null);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewVehicle((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const buildVehiclePayload = () => ({
    name: newVehicle.name,
    brand: newVehicle.brand,
    model: newVehicle.model,
    year: Number(newVehicle.year),
    type: newVehicle.type,
    category: newVehicle.category,
    fuelType: newVehicle.fuelType,
    transmission: newVehicle.transmission,
    seatingCapacity: Number(newVehicle.seatingCapacity),
    mileage: newVehicle.mileage,
    color: newVehicle.color,
    licensePlate: newVehicle.licensePlate,
    registrationNumber: newVehicle.registrationNumber,
    vehicleId: newVehicle.vehicleId,
    driveType: newVehicle.driveType,
    pricePerDay: Number(newVehicle.pricePerDay),
    weeklyPrice: Number(newVehicle.weeklyPrice),
    monthlyPrice: Number(newVehicle.monthlyPrice),
    securityDeposit: Number(newVehicle.securityDeposit),
    location: newVehicle.location,
    insurance: newVehicle.insurance,
    insuranceStatus: newVehicle.insuranceStatus,
    description: newVehicle.description,
    shortDescription: newVehicle.shortDescription,
    fullDescription: newVehicle.fullDescription,
    rentalTerms: newVehicle.rentalTerms,
    cancellationPolicy: newVehicle.cancellationPolicy,
    image: newVehicle.image,
    galleryImages: newVehicle.galleryImages
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    features: newVehicle.features
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    specifications: {
      engine: newVehicle.engine,
      power: newVehicle.power,
      torque: newVehicle.torque,
      topSpeed: newVehicle.topSpeed,
      acceleration: newVehicle.acceleration,
    },
    fuelTankCapacity: newVehicle.fuelTankCapacity,
    luggageCapacity: newVehicle.luggageCapacity,
    isAvailable: newVehicle.isAvailable,
    gpsEnabled: newVehicle.gpsEnabled,
    airConditioning: newVehicle.airConditioning,
    bluetooth: newVehicle.bluetooth,
    androidAuto: newVehicle.androidAuto,
    appleCarPlay: newVehicle.appleCarPlay,
    reverseCamera: newVehicle.reverseCamera,
    parkingSensors: newVehicle.parkingSensors,
    cruiseControl: newVehicle.cruiseControl,
    sunroof: newVehicle.sunroof,
    ABS: newVehicle.ABS,
    airbags: Number(newVehicle.airbags),
  });

  const handleSubmitVehicle = async (e) => {
    e.preventDefault();
    const payload = buildVehiclePayload();

    try {
      setSubmitting(true);
      if (editingVehicleId) {
        await vehicleService.updateVehicle(editingVehicleId, payload);
        addToast("Vehicle updated successfully", "success");
      } else {
        await vehicleService.createVehicle(payload);
        addToast("Vehicle added successfully", "success");
      }
      resetForm();
      fetchVehicles();
    } catch (err) {
      addToast(err.response?.data?.message || "Failed to save vehicle", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingVehicleId(null);
    setNewVehicle(getInitialVehicleState());
  };

  if (loading) return <Loader />;

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="card p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="font-bold text-3xl text-secondary">Manage Vehicles</h1>
              <p className="text-gray-600">Add new vehicles, review your fleet, and keep inventory up to date.</p>
            </div>
          </div>

          <form onSubmit={handleSubmitVehicle} className="space-y-6">
            <div className="rounded-3xl border border-gray-200 bg-gray-50 p-4">
              <h2 className="text-xl font-semibold text-secondary">
                {editingVehicleId ? "Edit Vehicle" : "Add New Vehicle"}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {editingVehicleId ? "Update the selected vehicle details and save changes." : "Create a new vehicle record to add it to the fleet."}
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">Vehicle Name</label>
                  <input
                    name="name"
                    value={newVehicle.name}
                    onChange={handleInputChange}
                    className="input-field w-full"
                    placeholder="e.g. DriveHub Lux Sedan"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">Brand</label>
                  <input
                    name="brand"
                    value={newVehicle.brand}
                    onChange={handleInputChange}
                    className="input-field w-full"
                    placeholder="e.g. Mercedes"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">Model</label>
                    <input
                      name="model"
                      value={newVehicle.model}
                      onChange={handleInputChange}
                      className="input-field w-full"
                      placeholder="e.g. S-Class"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">Year</label>
                    <input
                      type="number"
                      min="1900"
                      name="year"
                      value={newVehicle.year}
                      onChange={handleInputChange}
                      className="input-field w-full"
                      placeholder="2025"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">Vehicle Type</label>
                    <input
                      name="type"
                      value={newVehicle.type}
                      onChange={handleInputChange}
                      className="input-field w-full"
                      placeholder="e.g. sedan"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">Category</label>
                    <input
                      name="category"
                      value={newVehicle.category}
                      onChange={handleInputChange}
                      className="input-field w-full"
                      placeholder="Luxury"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">Fuel Type</label>
                    <select
                      name="fuelType"
                      value={newVehicle.fuelType}
                      onChange={handleInputChange}
                      className="input-field w-full"
                      required
                    >
                      <option value="petrol">Petrol</option>
                      <option value="diesel">Diesel</option>
                      <option value="hybrid">Hybrid</option>
                      <option value="electric">Electric</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">Transmission</label>
                    <select
                      name="transmission"
                      value={newVehicle.transmission}
                      onChange={handleInputChange}
                      className="input-field w-full"
                    >
                      <option value="automatic">Automatic</option>
                      <option value="manual">Manual</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">Seating Capacity</label>
                    <input
                      type="number"
                      name="seatingCapacity"
                      value={newVehicle.seatingCapacity}
                      onChange={handleInputChange}
                      className="input-field w-full"
                      min="1"
                      placeholder="5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">Mileage</label>
                    <input
                      name="mileage"
                      value={newVehicle.mileage}
                      onChange={handleInputChange}
                      className="input-field w-full"
                      placeholder="12 km/l"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">Color</label>
                  <input
                    name="color"
                    value={newVehicle.color}
                    onChange={handleInputChange}
                    className="input-field w-full"
                    placeholder="Midnight Black"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">Registration Number</label>
                    <input
                      name="registrationNumber"
                      value={newVehicle.registrationNumber}
                      onChange={handleInputChange}
                      className="input-field w-full"
                      placeholder="MH12AB1234"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">Vehicle ID</label>
                    <input
                      name="vehicleId"
                      value={newVehicle.vehicleId}
                      onChange={handleInputChange}
                      className="input-field w-full"
                      placeholder="VH-1029"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">License Plate</label>
                  <input
                    name="licensePlate"
                    value={newVehicle.licensePlate}
                    onChange={handleInputChange}
                    className="input-field w-full"
                    placeholder="MH12AB1234"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">Price per Day</label>
                    <input
                      type="number"
                      name="pricePerDay"
                      value={newVehicle.pricePerDay}
                      onChange={handleInputChange}
                      className="input-field w-full"
                      placeholder="250"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">Security Deposit</label>
                    <input
                      type="number"
                      name="securityDeposit"
                      value={newVehicle.securityDeposit}
                      onChange={handleInputChange}
                      className="input-field w-full"
                      placeholder="100"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">Weekly Price</label>
                    <input
                      type="number"
                      name="weeklyPrice"
                      value={newVehicle.weeklyPrice}
                      onChange={handleInputChange}
                      className="input-field w-full"
                      placeholder="1500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">Monthly Price</label>
                    <input
                      type="number"
                      name="monthlyPrice"
                      value={newVehicle.monthlyPrice}
                      onChange={handleInputChange}
                      className="input-field w-full"
                      placeholder="5800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">Location</label>
                  <input
                    name="location"
                    value={newVehicle.location}
                    onChange={handleInputChange}
                    className="input-field w-full"
                    placeholder="Mumbai"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">Insurance</label>
                  <input
                    name="insurance"
                    value={newVehicle.insurance}
                    onChange={handleInputChange}
                    className="input-field w-full"
                    placeholder="Standard coverage included"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">Insurance Status</label>
                  <select
                    name="insuranceStatus"
                    value={newVehicle.insuranceStatus}
                    onChange={handleInputChange}
                    className="input-field w-full"
                  >
                    <option value="Active">Active</option>
                    <option value="Expired">Expired</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">Image URL</label>
                  <input
                    name="image"
                    value={newVehicle.image}
                    onChange={handleInputChange}
                    className="input-field w-full"
                    placeholder="https://example.com/car.jpg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">Gallery Image URLs</label>
                  <input
                    name="galleryImages"
                    value={newVehicle.galleryImages}
                    onChange={handleInputChange}
                    className="input-field w-full"
                    placeholder="comma-separated URLs"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">Features</label>
                  <input
                    name="features"
                    value={newVehicle.features}
                    onChange={handleInputChange}
                    className="input-field w-full"
                    placeholder="GPS, Leather Seats, Bluetooth"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">Short Description</label>
                  <input
                    name="shortDescription"
                    value={newVehicle.shortDescription}
                    onChange={handleInputChange}
                    className="input-field w-full"
                    placeholder="Key highlights for the listing"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">Full Description</label>
                  <textarea
                    name="fullDescription"
                    value={newVehicle.fullDescription}
                    onChange={handleInputChange}
                    className="input-field w-full min-h-[120px] resize-none"
                    placeholder="Full vehicle description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">Rental Terms</label>
                  <textarea
                    name="rentalTerms"
                    value={newVehicle.rentalTerms}
                    onChange={handleInputChange}
                    className="input-field w-full min-h-[120px] resize-none"
                    placeholder="Rental terms and conditions"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">Cancellation Policy</label>
                  <textarea
                    name="cancellationPolicy"
                    value={newVehicle.cancellationPolicy}
                    onChange={handleInputChange}
                    className="input-field w-full min-h-[120px] resize-none"
                    placeholder="Cancellation policy details"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">Engine</label>
                    <input
                      name="engine"
                      value={newVehicle.engine}
                      onChange={handleInputChange}
                      className="input-field w-full"
                      placeholder="3.0L V6"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">Power</label>
                    <input
                      name="power"
                      value={newVehicle.power}
                      onChange={handleInputChange}
                      className="input-field w-full"
                      placeholder="362 hp"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">Torque</label>
                    <input
                      name="torque"
                      value={newVehicle.torque}
                      onChange={handleInputChange}
                      className="input-field w-full"
                      placeholder="369 lb-ft"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">Top Speed</label>
                    <input
                      name="topSpeed"
                      value={newVehicle.topSpeed}
                      onChange={handleInputChange}
                      className="input-field w-full"
                      placeholder="250 km/h"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">Acceleration</label>
                    <input
                      name="acceleration"
                      value={newVehicle.acceleration}
                      onChange={handleInputChange}
                      className="input-field w-full"
                      placeholder="0-100 km/h in 5.4s"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">Fuel Tank Capacity</label>
                    <input
                      name="fuelTankCapacity"
                      value={newVehicle.fuelTankCapacity}
                      onChange={handleInputChange}
                      className="input-field w-full"
                      placeholder="60 L"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">Luggage Capacity</label>
                    <input
                      name="luggageCapacity"
                      value={newVehicle.luggageCapacity}
                      onChange={handleInputChange}
                      className="input-field w-full"
                      placeholder="450 L"
                    />
                  </div>
                </div>

                <div>
                  <label className="inline-flex items-center gap-2 text-sm font-medium text-secondary">
                    <input
                      type="checkbox"
                      name="isAvailable"
                      checked={newVehicle.isAvailable}
                      onChange={handleInputChange}
                      className="form-checkbox h-5 w-5 text-primary"
                    />
                    Available for booking
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">Description</label>
                  <textarea
                    name="description"
                    value={newVehicle.description}
                    onChange={handleInputChange}
                    className="input-field w-full min-h-[120px] resize-none"
                    placeholder="Write a short description of the vehicle"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary flex-1 py-3 text-center"
              >
                {submitting ? (editingVehicleId ? "Saving Vehicle..." : "Adding Vehicle...") : editingVehicleId ? "Update Vehicle" : "Add Vehicle"}
              </button>
              {editingVehicleId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="btn-outline flex-1 py-3 text-center"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="card p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 uppercase tracking-widest text-[11px]">
                <tr>
                  <th className="px-3 py-3">Vehicle</th>
                  <th className="px-3 py-3">Specs</th>
                  <th className="px-3 py-3">Pricing</th>
                  <th className="px-3 py-3">Status</th>
                  <th className="px-3 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((vehicle) => (
                  <tr key={vehicle._id} className="border-t border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200">
                    <td className="px-3 py-3 align-top">
                      <div className="font-semibold">{vehicle.name}</div>
                      <div className="text-gray-500 text-[11px]">{vehicle.brand} · {vehicle.model}</div>
                    </td>
                    <td className="px-3 py-3 align-top">
                      <div className="text-gray-600 text-[11px]">{vehicle.type} · {vehicle.fuelType} · {vehicle.seatingCapacity} seats</div>
                    </td>
                    <td className="px-3 py-3 align-top">
                      <div className="font-semibold">{new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(vehicle.pricePerDay || 0)}</div>
                      <div className="text-gray-500 text-[11px]">{vehicle.weeklyPrice ? `${new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(vehicle.weeklyPrice)}/wk` : ""}{vehicle.monthlyPrice ? ` · ${new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(vehicle.monthlyPrice)}/mo` : ""}</div>
                    </td>
                    <td className="px-3 py-3 align-top capitalize">
                      <span className="inline-flex rounded-full px-2 py-1 bg-slate-100 text-[11px] text-slate-700">
                        {vehicle.status}
                      </span>
                    </td>
                    <td className="px-3 py-3 align-top">
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => handleEditVehicle(vehicle)}
                          className="px-2 py-1 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-smooth text-[11px]"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(vehicle._id)}
                          disabled={removing === vehicle._id}
                          className="px-2 py-1 bg-danger text-white rounded-lg hover:bg-red-600 transition-smooth disabled:opacity-60 text-[11px]"
                        >
                          {removing === vehicle._id ? "Removing..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
