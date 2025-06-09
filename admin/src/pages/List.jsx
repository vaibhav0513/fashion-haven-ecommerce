import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [editData, setEditData] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Fetch all products
  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
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
        `${backendUrl}/api/admin/products/${deleteProductId}`,
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
        `${backendUrl}/api/admin/products/${_id}`,
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
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">
        {/* --------------------- Table Header ----------------------- */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-red-100 text-sm">
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
            <img className="w-12" src={item.image[0]} alt="" />
            <p className="text-[#F05A7E]">{item.name}</p>
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
                ✏️ Edit
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

              <input
                type="text"
                className="w-full border px-3 py-2 rounded"
                value={editData.category}
                onChange={(e) =>
                  setEditData({ ...editData, category: e.target.value })
                }
                placeholder="Category"
              />

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
                  className="px-4 py-2 bg-blue-600 text-white rounded"
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
                  className="px-4 py-2 bg-red-600 text-white rounded"
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
