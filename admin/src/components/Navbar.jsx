import React, { useState } from "react";

const Navbar = ({ setToken }) => {
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    setToken("");
    setShowModal(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow px-4 py-2 flex justify-between items-center">
        {/* ... */}
        {/* </header> */}

        {/* Navbar content here */}
        {/* </header> */}
        <h1 className="text-xl ml-8 font-bold text-pink-600">
          ezy<span className="text-gray-800">Kart</span>
        </h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-pink-600 text-white px-4 py-1.5 rounded-md hover:bg-pink-700 transition"
        >
          Logout
        </button>
      </header>

      {/* Logout Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-md border text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md bg-pink-600 text-white hover:bg-pink-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
