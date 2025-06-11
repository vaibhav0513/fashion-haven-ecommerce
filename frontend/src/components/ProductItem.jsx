// import React from 'react'
// import { Link } from 'react-router-dom'

// const ProductItem = ({ id, image, name, price }) => {
//   // Defensive code: check if image is array and has at least one item
//   const imgSrc = Array.isArray(image) && image.length > 0 ? image[0] : '';

//   return (
//     <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
//       <div className="overflow-hidden w-full h-64">  {/* fix height so image shows */}
//         {imgSrc ? (
//           <img
//             className="hover:scale-110 transition ease-in-out object-cover w-full h-full"
//             src={imgSrc}
//             alt={name}
//           />
//         ) : (
//           <div className="bg-gray-200 w-full h-full flex items-center justify-center">
//             Image not available
//           </div>
//         )}
//       </div>
//       <p className="pt-3 pb-1 text-sm">{name}</p>
//       <p className="text-sm font-medium">₹{price}</p>
//     </Link>
//   )
// }

// export default ProductItem


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
