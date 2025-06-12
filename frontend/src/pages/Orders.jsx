import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const statusSteps = [
    "Placed",
    "Packed",
    "Shipped",
    "Out for Delivery",
    "Delivered",
  ];

  const loadOrderData = async () => {
    try {
      if (!token) return;
      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        const allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allOrdersItem.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
            });
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error("Order fetch failed:", error);
    }
  };

  const handleTrackOrder = (order) => {
    setSelectedOrder(order);
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16 mt-10 px-4 sm:px-8">
      <div className="text-center mb-10">
        <Title text1="MY" text2="ORDERS" />
      </div>

      <div className="space-y-6">
        {orderData.map((item, index) => (
          <div
            key={index}
            className="p-4 rounded-xl bg-white border border-gr shadow-md flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          >
            {/* Product Info */}
            <div className="flex items-start gap-4">
              <img
                className="w-20 h-20 object-cover rounded-lg border"
                src={
                  Array.isArray(item.images) && item.images.length > 0
                    ? item.images[0]
                    : "/placeholder.png"
                }
                alt={item.name}
              />

              <div className="text-gray-800">
                <p className="font-semibold text-lg">{item.name}</p>
                <div className="flex flex-wrap gap-3 text-sm text-gray-600 mt-1">
                  <p>
                    {currency}
                    {item.price}
                  </p>
                  <p>Qty: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Date: <span>{new Date(item.date).toLocaleDateString()}</span>
                </p>
                <p className="text-xs text-gray-500">
                  Payment: <span>{item.paymentMethod}</span>
                </p>
              </div>
            </div>

            {/* Order Status */}
            <div className="md:text-right space-y-2 w-full md:w-1/3">
              <div className="flex items-center gap-2 justify-between md:justify-end">
                <span
                  className={`h-2 w-2 rounded-full ${
                    item.status.toLowerCase() === "delivered"
                      ? "bg-green-500"
                      : item.status.toLowerCase() === "pending"
                      ? "bg-yellow-500"
                      : "bg-blue-500"
                  }`}
                ></span>
                <span className="text-sm font-medium">{item.status}</span>
              </div>
              <button
                onClick={() => handleTrackOrder(item)}
                className="text-sm text-pink-600 border border-pink-600 hover:bg-pink-600 hover:text-white px-4 py-1.5 rounded-lg transition"
              >
                Track Order
              </button>
            </div>
          </div>
        ))}

        {orderData.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            You have not placed any orders yet.
          </p>
        )}

        {selectedOrder && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm transition-all duration-300">
            <div className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-lg p-6 relative animate-fade-in-up">
              {/* Close Button */}
              <button
                onClick={() => setSelectedOrder(null)}
                className="absolute top-3 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold"
              >
                &times;
              </button>

              {/* Modal Header */}
              <div className="text-center mb-5">
                <h2 className="text-xl font-bold text-pink-600">
                  📦 Order Tracking
                </h2>
                <p className="text-sm text-gray-500">
                  Detailed summary of your order
                </p>
              </div>

              {/* Order Content */}
              <div className="space-y-4 text-gray-700">
                <div className="flex gap-4 items-start">
                  <img
                    src={
                      Array.isArray(selectedOrder.images) &&
                      selectedOrder.images.length > 0
                        ? selectedOrder.images[0]
                        : "/placeholder.png"
                    }
                    alt="product"
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                  <div className="text-sm">
                    <p className="font-semibold text-pink-600">
                      {selectedOrder.name}
                    </p>
                    <p className="text-gray-500 mt-1">
                      Qty: {selectedOrder.quantity}
                    </p>
                    <p className="text-gray-500">Size: {selectedOrder.size}</p>
                    <p className="text-gray-500">
                      Price: {currency}
                      {selectedOrder.price}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4 text-sm space-y-1">
                  <p>
                    <strong>Status:</strong> {selectedOrder.status}
                  </p>
                  <p>
                    <strong>Payment Method:</strong>{" "}
                    {selectedOrder.paymentMethod}
                  </p>
                  <p>
                    <strong>Payment:</strong>{" "}
                    {selectedOrder.payment ? "Paid ✅" : "Not Paid ❌"}
                  </p>
                  <p>
                    <strong>Order Date:</strong>{" "}
                    {new Date(selectedOrder.date).toLocaleDateString()}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-gray-800 mb-4">
                    Order Progress
                  </h3>

                  <div className="relative w-full flex justify-between items-center px-2">
                    {statusSteps.map((step, index) => {
                      const currentIndex = statusSteps.findIndex(
                        (s) =>
                          s.toLowerCase() ===
                          selectedOrder.status?.toLowerCase()
                      );
                      const isActive = index <= currentIndex;

                      return (
                        <div
                          key={index}
                          className="flex flex-col items-center relative w-1/5"
                        >
                          {/* Connecting Line */}
                          {index !== 0 && (
                            <div
                              className={`absolute top-4 -left-1/2 w-full h-1 z-0 ${
                                isActive ? "bg-green-500" : "bg-gray-300"
                              }`}
                            ></div>
                          )}

                          {/* Step Circle */}
                          <div
                            className={`w-8 h-8 rounded-full z-10 flex items-center justify-center font-bold text-sm ${
                              isActive
                                ? "bg-green-500 text-white"
                                : "bg-gray-300 text-gray-600"
                            }`}
                          >
                            {index + 1}
                          </div>

                          {/* Step Label */}
                          <div
                            className={`text-[11px] mt-2 text-center ${
                              isActive
                                ? "text-green-600 font-medium"
                                : "text-gray-400"
                            }`}
                          >
                            {step}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
