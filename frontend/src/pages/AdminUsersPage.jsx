import React, { useEffect, useState } from "react";
import { AdminLayout } from "../layouts/AdminLayout";
import { authService } from "../services/api";
import { Loader } from "../components/Loader";
import { useToast } from "../context/ToastContext";

export const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const { addToast } = useToast();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await authService.getAllUsers();
      setUsers(data.users);
    } catch (err) {
      addToast("Failed to load users", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      setDeleting(id);
      await authService.deleteUser(id);
      addToast("User removed", "success");
      fetchUsers();
    } catch (err) {
      addToast(err.response?.data?.message || "Delete failed", "error");
    } finally {
      setDeleting(null);
    }
  };

  if (loading) return <Loader />;

  return (
    <AdminLayout>
      <div className="card p-8">
        <h1 className="font-bold text-3xl text-secondary mb-4">Manage Users</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-t border-slate-200 dark:border-slate-700">
                  <td className="px-4 py-4">{user.name}</td>
                  <td className="px-4 py-4">{user.email}</td>
                  <td className="px-4 py-4">{user.phone}</td>
                  <td className="px-4 py-4 capitalize">{user.role}</td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => handleDelete(user._id)}
                      disabled={deleting === user._id}
                      className="px-3 py-2 bg-danger text-white rounded-lg hover:bg-red-600 transition-smooth disabled:opacity-60"
                    >
                      {deleting === user._id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};
