import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setVisible(location.pathname.includes("collection"));
  }, [location]);

  if (!showSearch || !visible) return null;

  return (
    <div className="fixed top-16 left-0 w-full z-50 bg-white/30 backdrop-blur-xl shadow-md border-y border-gray-200">
      <div className="max-w-3xl mx-auto px-4 py-6 relative">
        {/* Search container */}
        <div className="relative w-full">
          <div className="flex items-center px-5 py-3 bg-white rounded-full shadow-2xl border border-gray-300 focus-within:ring-2 focus-within:ring-pink-500 transition">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search for products, categories, brands..."
              className="flex-1 bg-transparent text-gray-800 text-base placeholder-gray-400 focus:outline-none"
            />
            <img
              src={assets.search_icon}
              alt="search"
              className="w-5 h-5 ml-3 opacity-70 hover:opacity-100 transition"
            />
          </div>

          {/* Close button */}
          <button
            onClick={() => setShowSearch(false)}
            className="absolute -right-4 -top-4 bg-white p-2 rounded-full shadow-md border border-gray-200 hover:bg-pink-500 group transition"
          >
            <img
              src={assets.cross_icon}
              alt="close"
              className="w-3 h-3 group-hover:invert"
            />
          </button>
        </div>

        {/* Optional Suggestions */}
        <div className="mt-4 text-left text-sm text-gray-500">
          <p className="mb-1">Trending:</p>
          <div className="flex flex-wrap gap-2">
            {["Shoes", "T-shirts", "Headphones", "Perfumes"].map((item) => (
              <span
                key={item}
                onClick={() => setSearch(item)}
                className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-xs cursor-pointer hover:bg-pink-200 transition"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
