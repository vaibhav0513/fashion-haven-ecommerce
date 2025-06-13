import React from "react";
import { FiArrowRight } from "react-icons/fi";

const Hero = () => {
  return (
    <section className="relative bg-white mt-14 text-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-6 z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="text-pink-600">ezy<span className="text-gray-500">Kart</span> </span> – Your Style, Your Way.
          </h1>
          <p className="text-gray-600 text-lg">
            Shop trending outfits, handpicked collections & exclusive deals. Style made simple, just for you.
          </p>
          <div>
            <button className="group inline-flex items-center gap-2 bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700 transition-all">
              Start Shopping <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative">
          <img
            src="/hero.png"
            alt="Fashion Highlight"
            className="rounded-3xl w-full shadow-lg border border-pink-100"
          />
          <div className="absolute -bottom-6 -right-6 bg-pink-100 p-4 rounded-xl text-pink-700 font-semibold text-sm shadow">
            ⭐ Featured Bestseller
          </div>
        </div>
      </div>

      {/* Decorative Gradient Blobs */}
      <div className="absolute w-60 h-60 bg-pink-200 rounded-full top-10 left-[-80px] blur-3xl opacity-40 animate-pulse" />
      <div className="absolute w-40 h-40 bg-pink-300 rounded-full bottom-10 right-[-60px] blur-2xl opacity-30 animate-ping" />
    </section>
  );
};

export default Hero;
