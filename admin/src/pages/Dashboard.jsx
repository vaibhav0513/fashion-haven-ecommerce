import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const Dashboard = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [productStats, setProductStats] = useState({
    total: 0,
    categories: {},
  });

  const [userCount, setUserCount] = useState(0);
  const COLORS = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444"];
  useEffect(() => {
    // Product stats API
    const fetchProductStats = async () => {
      try {
        const res = await axios.get(`${backendUrl}/admin/products/stats`);
        if (res.data.success) {
          setProductStats(res.data);
        }
      } catch (error) {
        console.error("Product stats fetch error:", error);
      }
    };

    // Users API
    const fetchUserStats = async () => {
      try {
        const res = await axios.get(`${backendUrl}/admin/users`);
        if (res.data.success) {
          setUserCount(res.data.users.length);
        }
      } catch (error) {
        console.error("User stats fetch error:", error);
      }
    };

    fetchProductStats();
    fetchUserStats();
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
    {
      title: "Users",
      value: userCount,
      icon: "👥",
      color: "bg-green-500",
    },
    {
      title: "Orders",
      value: 390, // Replace with live data if available
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className={`p-4 rounded-xl shadow text-white ${stat.color}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold">{stat.title}</p>
                <h2 className="text-2xl font-bold mt-1">{stat.value}</h2>
              </div>
              <div className="text-4xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart & Placeholder Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pie Chart */}
        <div className="bg-white rounded-xl border border-gray-300 shadow p-4">
          <h3 className="text-lg font-semibold mb-4">
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
      </div>
    </div>
  );
};

export default Dashboard;
