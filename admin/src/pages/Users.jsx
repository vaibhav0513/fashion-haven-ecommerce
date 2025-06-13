import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUser } from "react-icons/fa";
// import { toast } from "react-toastify";
import { useNotification } from "../context/NotificationProvider";

const Users = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { triggerNotification } = useNotification();
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${backendUrl}/admin/users`);
      if (res.data.success) {
        setUsers(res.data.users);
      } else {
        // toast.error("Failed to fetch users");
        triggerNotification("Failed to fetch users", "error");
      }
    } catch (err) {
      // toast.error("Something went wrong");
      triggerNotification("Something went wrong", "error");
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-1">
      <p className="text-xl font-bold mb-6 text-gray-800">
        All Registered Users
      </p>

      <div className="overflow-x-auto bg-white  rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-700">
          <thead className="bg-pink-100">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">User ID</th>
              <th className="px-6 py-3 text-left font-semibold">Name</th>
              <th className="px-6 py-3 text-left font-semibold">Email</th>
              <th className="px-6 py-3 text-left font-semibold">Joined On</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-all">
                <td className="px-6 py-3">{user.userId}</td>
                <td className="px-6 py-3">{user.name}</td>
                <td className="px-6 py-3">{user.email}</td>
                <td className="px-6 py-3">
                  {new Date(user.createdAt).toLocaleDateString("en-GB")}
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
