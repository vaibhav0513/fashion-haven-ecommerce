import React from "react";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const imgSrc = Array.isArray(image) && image.length > 0 ? image[0] : "";

  return (
    <Link
      to={`/product/${id}`}
      className="group bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition duration-300 overflow-hidden"
    >
      <div className="relative w-full h-64 overflow-hidden rounded-t-xl">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-sm text-gray-400">
            Image not available
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-800 truncate">
          {name}
        </h3>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-pink-600 font-bold text-base">₹{price}</span>
          <span className="text-xs px-2 py-1 rounded-full bg-pink-50 text-pink-600 font-medium">
            View
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
