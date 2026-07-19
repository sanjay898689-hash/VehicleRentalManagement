import React, { useState, useEffect } from "react";
import { MainLayout } from "../layouts/MainLayout";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { Button } from "../components/Button";
import { Loader } from "../components/Loader";

export const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const { addToast } = useToast();
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    address: "",
    licenseNumber: "",
    profileImage: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setFormState({
        name: user.name || "",
        phone: user.phone || "",
        address: user.address || "",
        licenseNumber: user.licenseNumber || "",
        profileImage: user.profileImage || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await updateProfile(formState);
      addToast("Profile updated successfully", "success");
    } catch (err) {
      addToast(err.response?.data?.message || "Failed to update profile", "error");
    } finally {
      setSaving(false);
    }
  };

  if (!user) return <Loader />;

  return (
    <MainLayout>
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="card p-8 text-center">
            <div className="mx-auto w-32 h-32 rounded-full overflow-hidden mb-5 bg-slate-100">
              <img
                src={formState.profileImage || "/placeholder-profile.png"}
                alt={formState.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="font-bold text-2xl text-secondary mb-2">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-600 mt-2">Role: {user.role}</p>
          </div>

          <div className="lg:col-span-2 card p-8">
            <h1 className="font-bold text-3xl text-secondary mb-6">Your Profile</h1>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">License Number</label>
                  <input
                    type="text"
                    name="licenseNumber"
                    value={formState.licenseNumber}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Profile Image URL</label>
                  <input
                    type="text"
                    name="profileImage"
                    value={formState.profileImage}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Address</label>
                <textarea
                  name="address"
                  value={formState.address}
                  onChange={handleChange}
                  rows={4}
                  className="input-field"
                />
              </div>

              <Button type="submit" loading={saving} fullWidth>
                Save Changes
              </Button>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
