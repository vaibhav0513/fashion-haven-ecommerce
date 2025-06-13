import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { currency } from "../App";
// import { toast } from "react-toastify";
import { debounce } from "lodash";
import { useNotification } from "../context/NotificationProvider";

const List = ({ token }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { triggerNotification } = useNotification();
  const [list, setList] = useState([]);
  const [editData, setEditData] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // Products per page
  const [totalCount, setTotalCount] = useState(0);

  const totalPages = Math.ceil(totalCount / limit);

  // Fetch products with pagination and search
  const fetchList = async (query = "", pageNumber = 1) => {
    try {
      const response = await axios.get(`${backendUrl}/admin/products`, {
        params: { query, page: pageNumber, limit },
      });

      if (response.data.success) {
        setList(response.data.products);
        setTotalCount(
          response.data.totalCount || response.data.products.length
        ); // Adjust based on backend response
      } else {
        triggerNotification(response.data.message, "error");
        // toast.error(response.data.message);
      }
    } catch (error) {
      // toast.error(error.message);
      triggerNotification(response.message, "error");
    }
  };

  const searchProducts = async (query, pageNumber = 1) => {
    try {
      if (!query) {
        fetchList("", pageNumber);
        return;
      }

      const response = await axios.get(`${backendUrl}/admin/search`, {
        params: { query, page: pageNumber, limit },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setList(response.data.products);
        setTotalCount(response.data.products.length); // Adjust if backend provides totalCount
      } else {
        // toast.error("Search failed: " + response.data.message);
        triggerNotification("Search failed: " + response.data.message, "error");
      }
    } catch (err) {
      console.error("Search error:", err);
      // toast.error("Search failed");
      triggerNotification("Search failed", "error");
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    if (searchQuery) {
      searchProducts(searchQuery, newPage);
    } else {
      fetchList("", newPage);
    }
  };

  // Debounced search
  const debouncedSearch = useCallback(
    debounce((value) => {
      setPage(1);
      searchProducts(value); // Use search API
    }, 500),
    []
  );

  // Search input change
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  const removeProduct = async () => {
    try {
      const response = await axios.delete(
        `${backendUrl}/admin/products/${deleteProductId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        triggerNotification(response.data.message, "success");
        // toast.success(response.data.message);
        setIsDeleteModalOpen(false);
        setDeleteProductId(null);
        fetchList(searchQuery, page);
      } else {
        // toast.error(response.data.message);
        triggerNotification(response.data.message, "error");
      }
    } catch (error) {
      // toast.error(error.response?.data?.message || error.message);
      triggerNotification(
        error.response?.data?.message || error.message,
        "error"
      );
    }
  };

  const updateProduct = async () => {
    try {
      const { _id, ...updatedFields } = editData;

      const response = await axios.put(
        `${backendUrl}/admin/products/${_id}`,
        updatedFields,
        { headers: { token } }
      );

      if (response.data.success) {
        triggerNotification(response.data.message, "success");
        // toast.success(response.data.message);
        setIsEditOpen(false);
        fetchList(searchQuery, page);
      } else {
        // toast.error(response.data.message);
        triggerNotification(response.data.message, "error");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList(searchQuery, page);
  }, [page]);

  return (
    <>
      <p className="text-xl font-bold mb-6 text-gray-800">All Products List</p>

      <div className="flex flex-wrap items-center gap-4 mb-4 text-sm md:text-base">
        <div className="flex items-center gap-1">
          <span className="font-medium text-gray-700">Total Products:</span>
          <span className="text-pink-600 font-semibold">{totalCount}</span>
        </div>

        <div className="flex items-center gap-1">
          <span className="font-medium text-gray-700">Bestsellers:</span>
          <span className="text-yellow-500 font-semibold">
            {list.filter((p) => p.bestseller).length}
          </span>
        </div>

        {/* Right-aligned search bar */}
        <div className="ml-auto">
          <input
            type="text"
            placeholder="🔍 Search by name or ID"
            onChange={handleSearch}
            value={searchQuery}
            className="border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all w-64"
          />
        </div>
      </div>

      {/* Table Header */}
      <div className="w-full min-h-screen flex justify-center bg-gray-50 py-1 px-2">
        <div className="w-full max-w-6xl">
          <div className="hidden md:grid grid-cols-[40px_120px_100px_1fr_120px_100px_100px_100px] items-center bg-pink-100 text-gray-700 font-semibold text-sm text-center py-3 px-4 rounded-t-md shadow">
            <span>#</span>
            <span>Product ID</span>
            <span>Image</span>
            <span>Name</span>
            <span>Category</span>
            <span>Quantity</span>
            <span>Price</span>
            <span>Action</span>
          </div>

          {/* Product List */}
          {list.map((item, index) => (
            <div
              key={item._id}
              className="grid grid-cols-[40px_120px_100px_1fr_120px_100px_100px_100px] items-center text-center text-sm border-b px-4 py-3 bg-white hover:shadow-sm transition"
            >
              <span>{(page - 1) * limit + index + 1}</span>
              <span className="truncate">{item.customProductId}</span>
              <div className="flex justify-center">
                <img
                  className="w-10 h-10 object-cover rounded"
                  src={item.images?.[0] || "/placeholder.jpg"}
                  alt={item.name}
                />
              </div>
              <div className="flex flex-col items-center">
                <p className="text-pink-600 font-medium truncate">
                  {item.name}
                </p>
                {item.bestseller && (
                  <span className="text-[10px] text-white bg-pink-600 px-2 py-0.5 rounded mt-1">
                    Bestseller ⭐
                  </span>
                )}
              </div>
              <p>{item.category}</p>
              <p>{item.quantity}</p>
              <p className="font-medium">
                {currency}
                {item.price}
              </p>

              <div className="flex justify-center gap-2">
                <button
                  onClick={() => {
                    setEditData(item);
                    setIsEditOpen(true);
                  }}
                  className="text-blue-500 hover:text-blue-700"
                  title="Edit"
                >
                  ✏️
                </button>
                <button
                  onClick={() => {
                    setDeleteProductId(item._id);
                    setIsDeleteModalOpen(true);
                  }}
                  className="text-red-500 hover:text-red-700"
                  title="Delete"
                >
                  ❌
                </button>
              </div>
            </div>
          ))}

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-6 text-sm">
            <button
              onClick={() => page > 1 && handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
            >
              ⬅ Prev
            </button>
            <span className="text-gray-600">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => page < totalPages && handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
            >
              Next ➡
            </button>
          </div>

          {/* Modals (Edit/Delete) here — same as your existing code */}

          {/* --------------------- Edit Modal ----------------------- */}
          {isEditOpen && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
              <div className="bg-white p-6 rounded-md w-full max-w-md shadow-lg space-y-4">
                <h2 className="text-lg font-bold text-gray-700">
                  Edit Product
                </h2>

                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded"
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                  placeholder="Product Name"
                />

                <input
                  type="number"
                  className="w-full border px-3 py-2 rounded"
                  value={editData.price}
                  onChange={(e) =>
                    setEditData({ ...editData, price: e.target.value })
                  }
                  placeholder="Price"
                />

                {/* Category Dropdown */}
                <select
                  className="w-full border px-3 py-2 rounded"
                  value={editData.category}
                  onChange={(e) =>
                    setEditData({ ...editData, category: e.target.value })
                  }
                >
                  <option value="">Select Category</option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
                </select>

                {/* Bestseller Toggle */}
                <div className="flex items-center gap-2 mt-3">
                  <label className="text-gray-700 font-medium">
                    Bestseller:
                  </label>
                  <button
                    type="button"
                    className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors duration-300 ${
                      editData.bestseller ? "bg-green-500" : "bg-gray-300"
                    }`}
                    onClick={() =>
                      setEditData({
                        ...editData,
                        bestseller: !editData.bestseller,
                      })
                    }
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
                        editData.bestseller ? "translate-x-5" : "translate-x-0"
                      }`}
                    ></div>
                  </button>
                </div>

                <textarea
                  className="w-full border px-3 py-2 rounded"
                  value={editData.description}
                  onChange={(e) =>
                    setEditData({ ...editData, description: e.target.value })
                  }
                  placeholder="Description"
                ></textarea>

                <div className="flex gap-2 justify-end mt-4">
                  <button
                    onClick={() => setIsEditOpen(false)}
                    className="px-4 py-2 border rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={updateProduct}
                    className="px-4 py-2 bg-pink-600 text-white rounded"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          )}

          {isDeleteModalOpen && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
              <div className="bg-white p-6 rounded-md w-full max-w-sm shadow-lg">
                <h2 className="text-lg font-bold mb-4 text-gray-700">
                  Are you sure?
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                  Do you really want to delete this product? This action cannot
                  be undone.
                </p>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => {
                      setIsDeleteModalOpen(false);
                      setDeleteProductId(null);
                    }}
                    className="px-4 py-2 border rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={removeProduct}
                    className="px-4 py-2 bg-pink-600 text-white rounded"
                  >
                    Yes, Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default List;
