import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import Title from "./Title";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);

  return (
    <section className="bg-gray-50 py-10 px-6 md:px-12">
      <div className="text-center mb-5">
        {/* <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
          Best Sellers
        </h2> */}
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className=" text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
          Discover the all-time favorites that our customers can’t get enough
          of!
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {bestSeller.map((item) => (
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
                  onClick={() => navigate(`/product/${item._id}`)}
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

export default BestSeller;
