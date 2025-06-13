import React from "react";

const NewsletterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
    // Trigger email submission logic here
  };

  return (
    <section className="0 py-12 px-4">
      <div className="max-w-2xl mx-auto border border-gray-200 bg-white shadow-xl rounded-xl p-10 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          📩 Subscribe & Get 20% Off
        </h2>
        <p className="text-gray-500 mt-3 text-sm md:text-base">
          Join our newsletter for exclusive discounts, new arrivals & more.
        </p>

        <form
          onSubmit={onSubmitHandler}
          className="mt-6 flex flex-col sm:flex-row items-center gap-4"
        >
          <input
            type="email"
            required
            placeholder="Enter your email address"
            className="w-full sm:flex-1 px-5 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
          />
          <button
            type="submit"
            className="bg-pink-600 text-white font-medium px-8 py-3 rounded-md hover:bg-pink-700 transition"
          >
            SUBSCRIBE
          </button>
        </form>

        <p className="text-xs text-gray-400 mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};

export default NewsletterBox;
