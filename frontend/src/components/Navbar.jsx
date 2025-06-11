// import React, { useContext, useState } from "react";
// import { assets } from "../assets/assets";
// import { Link, NavLink, useLocation } from "react-router-dom";
// import { ShopContext } from "../context/ShopContext";

// const Navbar = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [profileOpen, setProfileOpen] = useState(false);

//   const {
//     setShowSearch,
//     getCartCount,
//     navigate,
//     token,
//     setToken,
//     setCartItems,
//   } = useContext(ShopContext);

//   const logout = () => {
//     navigate("/login");
//     localStorage.removeItem("token");
//     setToken("");
//     setCartItems({});
//   };

//   const navLinks = [
//     { path: "/", name: "Home" },
//     { path: "/collection", name: "Collection" },
//     { path: "/about", name: "About" },
//     { path: "/contact", name: "Contact" },
//   ];

//   const location = useLocation();

//   return (
//     <header className="sticky top-0 z-50 bg-white shadow-md">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
//         {/* Logo */}
//         <Link to="/" className="text-3xl font-extrabold text-pink-600">
//           ezy<span className="text-gray-900">Kart</span>
//         </Link>

//         {/* Nav Links - Desktop */}
//         <nav className="hidden md:flex gap-8 items-center text-gray-700 text-sm font-semibold">
//           {navLinks.map((link) => (
//             <NavLink
//               key={link.path}
//               to={link.path}
//               className={`hover:text-pink-600 transition duration-200 ${
//                 location.pathname === link.path
//                   ? "text-pink-600 border-b-2 border-pink-600 pb-1"
//                   : ""
//               }`}
//             >
//               {link.name}
//             </NavLink>
//           ))}
//         </nav>

//         {/* Icons */}
//         <div className="flex items-center gap-5">
//           <img
//             onClick={() => setShowSearch(true)}
//             src={assets.search_icon}
//             className="w-5 cursor-pointer hover:scale-110 transition"
//             alt="search"
//             title="Search"
//           />

//           {/* Profile */}
//           <div className="relative">
//             <img
//               onClick={() => {
//                 if (token) setProfileOpen((prev) => !prev);
//                 else navigate("/login");
//               }}
//               src={assets.profile_icon}
//               className="w-5 cursor-pointer hover:scale-110 transition"
//               alt="profile"
//             />
//             {token && profileOpen && (
//               <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50 p-3 text-sm font-medium text-gray-700 animate-fadeIn">
//                 <p className="hover:text-pink-600 cursor-pointer">My Profile</p>
//                 <p
//                   onClick={() => navigate("/orders")}
//                   className="hover:text-pink-600 cursor-pointer"
//                 >
//                   Orders
//                 </p>
//                 <p onClick={logout} className="hover:text-pink-600 cursor-pointer">
//                   Log Out
//                 </p>
//               </div>
//             )}
//           </div>

//           {/* Cart */}
//           <Link to="/cart" className="relative">
//             <img src={assets.cart_icon} className="w-5" alt="cart" />
//             <span className="absolute -top-1 -right-2 bg-pink-600 text-white text-[10px] rounded-full px-1.5 py-[1px]">
//               {getCartCount()}
//             </span>
//           </Link>

//           {/* Mobile Hamburger */}
//           <img
//             src={assets.menu_icon}
//             className="w-5 cursor-pointer md:hidden"
//             alt="menu"
//             onClick={() => setSidebarOpen(true)}
//           />
//         </div>
//       </div>

//       {/* Mobile Sidebar */}
//       <div
//         className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
//           sidebarOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         <div className="p-5 space-y-4">
//           <div
//             className="flex items-center gap-2 text-pink-600 cursor-pointer"
//             onClick={() => setSidebarOpen(false)}
//           >
//             <img
//               className="h-4 rotate-180"
//               src={assets.dropdown_icon}
//               alt="back"
//             />
//             <span className="text-sm font-medium">Close</span>
//           </div>
//           <hr />
//           {navLinks.map((link) => (
//             <NavLink
//               key={link.path}
//               to={link.path}
//               onClick={() => setSidebarOpen(false)}
//               className={`block py-2 pl-2 text-gray-700 font-semibold rounded hover:bg-pink-50 hover:text-pink-600 transition ${
//                 location.pathname === link.path ? "text-pink-600" : ""
//               }`}
//             >
//               {link.name}
//             </NavLink>
//           ))}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;

import React, { useContext, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  const navLinks = [
    { path: "/", name: "Home" },
    { path: "/collection", name: "Shop" },
    { path: "/about", name: "About" },
    { path: "/contact", name: "Contact" },
  ];

  const location = useLocation();

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-white/50 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="text-3xl font-black text-pink-600 tracking-tight"
          >
            ezy<span className="text-gray-500">Kart</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-10 items-center text-sm font-semibold text-gray-800">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative group transition ${
                    isActive ? "text-pink-600" : "hover:text-pink-600"
                  }`
                }
              >
                {link.name}
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 group-hover:w-full transition-all bg-pink-600 duration-300"></span>
              </NavLink>
            ))}
          </nav>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center gap-5">
            {/* Search Icon */}
            <img
              src={assets.search_icon}
              onClick={() => setShowSearch(true)}
              className="w-4 h-4 cursor-pointer hover:scale-110 transition-transform"
              alt="search"
            />

            {/* Profile Icon */}
            <div className="relative">
              <img
                src={assets.profile_icon}
                onClick={() =>
                  token ? setProfileOpen((prev) => !prev) : navigate("/login")
                }
                className="w-4 h-4 cursor-pointer hover:scale-110 transition-transform"
                alt="profile"
              />
              {token && profileOpen && (
                <div className="absolute right-0 mt-2 w-44 p-4 bg-white shadow-xl rounded-md text-sm font-medium space-y-2 z-50 animate-fadeIn">
                  <p className="hover:text-pink-600 cursor-pointer">
                    My Profile
                  </p>
                  <p
                    onClick={() => navigate("/orders")}
                    className="hover:text-pink-600 cursor-pointer"
                  >
                    Orders
                  </p>
                  <p
                    onClick={logout}
                    className="hover:text-pink-600 cursor-pointer"
                  >
                    Log Out
                  </p>
                </div>
              )}
            </div>

            {/* Cart Icon */}
            <Link to="/cart" className="relative">
              <img src={assets.cart_icon} className="w-4 h-4" alt="cart" />
              <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-[9px] rounded-full px-1.5 py-[1px] font-bold animate-pulse">
                {getCartCount()}
              </span>
            </Link>
          </div>

          {/* Mobile Menu Icon */}
          <img
            src={assets.menu_icon}
            className="w-4 h-4 md:hidden cursor-pointer hover:scale-110 transition-transform"
            alt="menu"
            onClick={() => setSidebarOpen(true)}
          />
        </div>
      </header>

      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-64 bg-white z-50 p-5 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <span className="text-lg font-semibold text-pink-600">Menu</span>
          <button onClick={() => setSidebarOpen(false)}>
            <img
              src={assets.dropdown_icon}
              className="w-4 rotate-180"
              alt="close"
            />
          </button>
        </div>
        <hr />
        <div className="space-y-4 mt-4">
          {/* Nav Links */}
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setSidebarOpen(false)}
              className={`block py-2 px-3 rounded-md text-gray-800 font-semibold hover:bg-pink-50 hover:text-pink-600 ${
                location.pathname === link.path
                  ? "text-pink-600 bg-pink-100"
                  : ""
              }`}
            >
              {link.name}
            </NavLink>
          ))}

          {/* Divider */}
          <hr className="my-4" />

          {/* Mobile Icons */}
          <div className="flex gap-5 items-center px-3">
            {/* Search */}
            <img
              src={assets.search_icon}
              onClick={() => {
                setShowSearch(true);
                setSidebarOpen(false);
              }}
              className="w-4 h-4 cursor-pointer hover:scale-110 transition-transform"
              alt="search"
            />

            {/* Profile or Login */}
            <img
              src={assets.profile_icon}
              onClick={() => {
                setSidebarOpen(false);
                token ? setProfileOpen((prev) => !prev) : navigate("/login");
              }}
              className="w-4 h-4 cursor-pointer hover:scale-110 transition-transform"
              alt="profile"
            />

            {/* Cart */}
            <Link
              to="/cart"
              onClick={() => setSidebarOpen(false)}
              className="relative"
            >
              <img src={assets.cart_icon} className="w-4 h-4" alt="cart" />
              <span className="absolute -top-1 -right-2 bg-pink-600 text-white text-[9px] rounded-full px-1.5 py-[1px] font-bold animate-pulse">
                {getCartCount()}
              </span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
