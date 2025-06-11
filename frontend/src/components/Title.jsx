// import React from "react";

// const Title = ({ text1, text2 }) => {
//   return (
//     <div className="inline-flex gap-2 items-center mb-3">
//       <p className="text-gray-500">
//         {text1} <span className="text-pink-600 font-medium">{text2}</span>
//       </p>
//       <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
//     </div>
//   );
// };

// export default Title;

import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <div className="inline-flex items-center gap-4 mb-6 group">
      {/* Main Text */}
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 tracking-tight">
        {text1}{" "}
        <span className="bg-gradient-to-r from-pink-500 to-pink-700 bg-clip-text text-transparent font-bold">
          {text2}
        </span>
      </h2>

      {/* Animated Line */}
      <div className="relative w-12 sm:w-20 h-[2px] bg-gray-300 overflow-hidden">
        <span className="absolute left-0 top-0 w-full h-full bg-pink-600 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
      </div>
    </div>
  );
};

export default Title;
