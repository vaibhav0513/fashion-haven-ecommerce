// import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import { MdCancel } from "react-icons/md";
// import {
//   AiOutlineCheckCircle,
//   AiOutlineInfoCircle,
//   AiOutlineCloseCircle,
// } from "react-icons/ai";

// const Notification = ({ message, type = "success", onClose }) => {
//   const [fade, setFade] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => setFade(true), 2800);
//     return () => clearTimeout(timer);
//   }, []);

//   const typeStyles = {
//     success: {
//       icon: <AiOutlineCheckCircle className="text-green-500" size={22} />,
//       border: "border-green-400",
//       bg: "bg-white/70 backdrop-blur-md",
//     },
//     error: {
//       icon: <AiOutlineCloseCircle className="text-red-500" size={22} />,
//       border: "border-red-400",
//       bg: "bg-white/70 backdrop-blur-md",
//     },
//     info: {
//       icon: <AiOutlineInfoCircle className="text-blue-500" size={22} />,
//       border: "border-blue-400",
//       bg: "bg-white/70 backdrop-blur-md",
//     },
//   };

//   const { icon, border, bg } = typeStyles[type] || typeStyles.success;

//   return (
//     <div
//       className={`w-[260px] sm:w-[300px] px-4 py-3 rounded-xl border-l-4 ${border} shadow-xl ${bg}
//         text-gray-800 flex items-start gap-3 border border-red-700 transition-all duration-500 ease-in-out
//         ${fade ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"}`}
//     >
//       <div className="pt-[2px]">{icon}</div>
//       <div className="flex-1 text-sm font-medium">{message}</div>
//       {onClose && (
//         <button
//           onClick={onClose}
//           className="text-gray-500 hover:text-gray-700 transition-transform"
//           aria-label="Close"
//         >
//           <MdCancel size={18} />
//         </button>
//       )}
//     </div>
//   );
// };

// Notification.propTypes = {
//   message: PropTypes.string.isRequired,
//   type: PropTypes.oneOf(["success", "error", "info"]),
//   onClose: PropTypes.func,
// };

// export default Notification;


import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { MdCancel } from "react-icons/md";
import {
  AiOutlineCheckCircle,
  AiOutlineInfoCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";

const Notification = ({ message, type = "success", onClose }) => {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFade(true), 2800);
    return () => clearTimeout(timer);
  }, []);

  const typeStyles = {
    success: {
      icon: <AiOutlineCheckCircle className="text-green-600" size={22} />,
      border: "border-green-500",
      bg: "bg-green-50",
      text: "text-green-800",
    },
    error: {
      icon: <AiOutlineCloseCircle className="text-red-600" size={22} />,
      border: "border-red-500",
      bg: "bg-red-50",
      text: "text-red-800",
    },
    info: {
      icon: <AiOutlineInfoCircle className="text-blue-600" size={22} />,
      border: "border-blue-500",
      bg: "bg-blue-50",
      text: "text-blue-800",
    },
  };

  const { icon, border, bg, text } = typeStyles[type] || typeStyles.success;

  return (
    <div
      className={`w-fit max-w-sm px-4 py-3 rounded-xl border ${border} shadow-md ${bg} ${text}
      flex items-start gap-3 transition-all duration-500 ease-in-out
      ${fade ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}
    >
      <div className="pt-[2px]">{icon}</div>
      <div className="flex-1 text-sm font-medium">{message}</div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 transition-transform"
          aria-label="Close"
        >
          <MdCancel size={18} />
        </button>
      )}
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "error", "info"]),
  onClose: PropTypes.func,
};

export default Notification;
