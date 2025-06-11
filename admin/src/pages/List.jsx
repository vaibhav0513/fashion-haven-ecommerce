import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  // console.log("Backend URL:", backendUrl);
  const [list, setList] = useState([]);
  const [editData, setEditData] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Fetch all products
  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/admin/products`);

      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Remove product by ID
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
        toast.success(response.data.message);
        setIsDeleteModalOpen(false);
        setDeleteProductId(null);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Update product by ID
  const updateProduct = async () => {
    try {
      const { _id, ...updatedFields } = editData;

      const response = await axios.put(
        `${backendUrl}/admin/products/${_id}`,
        updatedFields,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setIsEditOpen(false);
        fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      {/* <p className="mb-2">All Products List</p> */}
      <p className="text-xl font-bold mb-6  text-gray-800">All Products List</p>

      <div className="flex flex-wrap items-center gap-4 mb-4 text-sm md:text-base">
        <div className="flex items-center gap-1">
          <span className="font-medium text-gray-700">Total Products:</span>
          <span className="text-pink-600 font-semibold">{list.length}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="font-medium text-gray-700">Bestsellers:</span>
          <span className="text-yellow-500 font-semibold">
            {list.filter((p) => p.bestseller).length}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {/* --------------------- Table Header ----------------------- */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-pink-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* --------------------- Product List ----------------------- */}
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
          >
            {/* <img className="w-12" src={item.image[0]} alt="" /> */}
            <img
              className="w-12"
              src={item.images?.[0] || "/placeholder.jpg"}
              alt={item.name}
            />

            <div className="flex flex-col">
              <p className="text-pink-600 font-medium">{item.name}</p>
              {item.bestseller && (
                <span className="text-xs text-white bg-pink-600 w-fit px-2 py-0.5 rounded mt-1">
                  Bestseller ⭐
                </span>
              )}
            </div>

            <p>{item.category}</p>
            <p>
              {currency}
              {item.price}
            </p>
            <div className="flex justify-end md:justify-center gap-2">
              <button
                onClick={() => {
                  setEditData(item);
                  setIsEditOpen(true);
                }}
                className="text-blue-500 hover:text-blue-700 text-sm"
              >
                ✏️
              </button>
              <button
                onClick={() => {
                  setDeleteProductId(item._id);
                  setIsDeleteModalOpen(true);
                }}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                ❌
              </button>
            </div>
          </div>
        ))}

        {/* --------------------- Edit Modal ----------------------- */}
        {isEditOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md w-full max-w-md shadow-lg space-y-4">
              <h2 className="text-lg font-bold text-gray-700">Edit Product</h2>

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
                <label className="text-gray-700 font-medium">Bestseller:</label>
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
                Do you really want to delete this product? This action cannot be
                undone.
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
    </>
  );
};

export default List;
