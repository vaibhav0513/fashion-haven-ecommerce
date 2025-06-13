import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom"; // ✅ Import navigate
import Title from "./Title";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <section className="bg-white py-10 px-6 md:px-12">
      <div className="text-center mb-14">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className=" text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
          Unwrap the season’s most stylish picks, hand-curated just for you.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {latestProducts.map((item) => (
          <div
            key={item._id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 group"
          >
            <div className="overflow-hidden rounded-t-xl">
              <img
                src={item.images[0]}
                alt={item.name}
                className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <h3 className="text-base font-medium text-gray-900 truncate">
                {item.name}
              </h3>
              <div className="flex items-center justify-between mt-2">
                <span className="text-pink-600 font-semibold text-lg">
                  ₹{item.price}
                </span>
                <button
                  onClick={() => navigate(`/product/${item._id}`)} // ✅ Navigate on click
                  className="text-xs px-3 py-1 border border-pink-600 text-pink-600 rounded-full hover:bg-pink-600 hover:text-white transition-all"
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestCollection;
