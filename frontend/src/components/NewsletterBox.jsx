// import React from "react";

// const NewsletterBox = () => {
//   const onSubmitHandler = (event) => {
//     event.preventDefault();
//   };

//   return (
//     <div className="text-center">
//       <p className="text-2xl font-medium text-gray-800">
//         Subscribe now & get 20% off
//       </p>
//       <p className="text-gray-400 mt-3">
//         Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos, alias
//         praesentium illo animi impedit error.
//       </p>

//       <form
//         onSubmit={onSubmitHandler}
//         className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3"
//       >
//         <input
//           className="w-full sm:flex-1 outline-none"
//           type="email"
//           placeholder="Enter your email"
//           required
//         />
//         <button
//           type="submit"
//           className="bg-black text-white text-xs px-10 py-4"
//         >
//           SUSCRIBE
//         </button>
//       </form>
//     </div>
//   );
// };

// export default NewsletterBox;

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
