import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  const links = [
    { to: "/dashboard", label: "Dashboard", icon: assets.order_icon },
    { to: "/users", label: "All Users", icon: assets.order_icon },
    { to: "/add", label: "Add Items", icon: assets.add_icon },
    { to: "/list", label: "List Items", icon: assets.order_icon },
    { to: "/orders", label: "Orders", icon: assets.order_icon },
  ];

  return (
    <aside className="fixed top-0  left-0 h-full w-56 bg-white border-r z-40 hidden md:flex flex-col">
      {/* Company Name */}
      <div className="h-14 flex items-center justify-center"></div>

      {/* Navigation Links */}
      <div className="px-3 py-4 space-y-2 flex-1 overflow-y-auto">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-1.5 rounded-md transition 
              ${
                isActive
                  ? "bg-pink-100 text-pink-600 font-medium"
                  : "hover:bg-gray-100 text-gray-700"
              }`
            }
          >
            <img src={link.icon} alt="" className="w-4 h-4" />
            <span>{link.label}</span>
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
