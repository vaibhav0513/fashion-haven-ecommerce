import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const Dashboard = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");

  const [productStats, setProductStats] = useState({
    total: 0,
    categories: {},
  });
  const [userCount, setUserCount] = useState(0);
  const [orders, setOrders] = useState([]);

  const COLORS = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444"];

  useEffect(() => {
    const fetchProductStats = async () => {
      try {
        const res = await axios.get(`${backendUrl}/admin/products/stats`);
        if (res.data.success) setProductStats(res.data);
      } catch (error) {
        console.error("Product stats fetch error:", error);
      }
    };

    const fetchUserStats = async () => {
      try {
        const res = await axios.get(`${backendUrl}/admin/users`);
        if (res.data.success) setUserCount(res.data.users.length);
      } catch (error) {
        console.error("User stats fetch error:", error);
      }
    };

    const fetchOrderStats = async () => {
      try {
        const res = await axios.post(
          `${backendUrl}/order/list`,
          {}, // body (if needed)
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data.success) {
          setOrders(res.data.orders);
          // console.log("Fetched orders:", res.data.orders);
        }
      } catch (error) {
        console.error("Order stats fetch error:", error);
      }
    };

    fetchProductStats();
    fetchUserStats();
    fetchOrderStats();
  }, []);

  const stats = [
    {
      title: "Total Products",
      value: productStats.total,
      icon: "📦",
      color: "bg-blue-500",
    },
    {
      title: "Categories",
      value: Object.keys(productStats.categories).length,
      icon: "📂",
      color: "bg-purple-500",
    },
    { title: "Users", value: userCount, icon: "👥", color: "bg-green-500" },
    {
      title: "Orders",
      value: orders.length,
      icon: "🧾",
      color: "bg-yellow-500",
    },
  ];

  const categoryData = Object.entries(productStats.categories).map(
    ([name, value]) => ({ name, value })
  );

  return (
    <div className="p-1">
      <p className="text-xl font-bold mb-6 text-gray-800">Admin Dashboard</p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className={`p-5 rounded-xl shadow text-white ${stat.color}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-medium">{stat.title}</p>
                <h2 className="text-3xl font-bold mt-1">{stat.value}</h2>
              </div>
              <div className="text-4xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts & Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pie Chart */}
        <div className="bg-white rounded-xl border border-gray-200 shadow p-5">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Category-wise Product Count
          </h3>
          <PieChart width={300} height={250}>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              outerRadius={90}
              fill="#8884d8"
              dataKey="value"
              label={({ name, value }) => `${name} (${value})`}
            >
              {categoryData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        {/* Orders Table */}
        <div className="col-span-2 bg-white rounded-xl border border-gray-200 shadow p-5 overflow-x-auto">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Recent Orders
          </h3>
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="py-2 px-4">User</th>
                <th className="py-2 px-4">Product</th>
                <th className="py-2 px-4">Amount</th>
                <th className="py-2 px-4">Payment</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map((order) => (
                <tr
                  key={order._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="py-2 px-4">
                    {order.address.firstName} {order.address.lastName}
                  </td>
                  <td className="py-2 px-4">{order.items[0]?.name || "-"}</td>
                  <td className="py-2 px-4">₹{order.amount}</td>
                  <td className="py-2 px-4">
                    {order.payment ? (
                      <span className="text-green-600 font-semibold">Paid</span>
                    ) : (
                      <span className="text-red-500 font-semibold">Unpaid</span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-600"
                          : order.status === "Shipped"
                          ? "bg-blue-100 text-blue-600"
                          : order.status === "Packed"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
