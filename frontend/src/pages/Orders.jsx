// import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import Title from '../components/Title';
// import axios from 'axios';

// const Orders = () => {

//   const { backendUrl, token, currency } = useContext(ShopContext);

//   const [orderData, setorderData] = useState([])

//   const loadOrderData = async () => {
//     try {
//       if (!token) {
//         return null
//       }
//       const response = await axios.post(backendUrl + '/api/order/userorders',{},{headers:{token}})
//       if (response.data.success) {
//         let allOrdersItem = []
//         response.data.orders.map((order) => {
//           order.items.map((item) => {
//             item['status'] = order.status
//             item['payment'] = order.payment
//             item['paymentMethod'] = order.paymentMethod
//             item['date'] = order.date
//             allOrdersItem.push(item)
//           })
//         })
//         setorderData(allOrdersItem.reverse());
//       }
//     } catch (error) {

//     }
//   }

//   useEffect(() => {
//     loadOrderData()
//   },[token])

//   return (
//     <div className='border-t pt-16'>
//       <div className='text-2xl'>
//         <Title text1={'MY'} text2={'ORDERS'}/>
//       </div>

//       <div>
//         {
//           orderData.map((item,index) => (
//             <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
//               <div className='flex items-start gap-6 text-sm'>
//                 <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
//                 <div>
//                   <p className='sm:text-base font-medium'>{item.name}</p>
//                   <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
//                     <p>{currency}{item.price}</p>
//                     <p>Quantity: {item.quantity}</p>
//                     <p>Size: {item.size}</p>
//                   </div>
//                   <p className='mt-1'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
//                   <p className='mt-1'>Payment: <span className='text-gray-400'>{item.paymentMethod}</span></p>
//                 </div>
//               </div>
//               <div className='md:w-1/2 flex justify-between'>
//                 <div className='flex items-center gap-2'>
//                   <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
//                   <p className='text-sm md:text-base'>{item.status}</p>
//                 </div>
//                 <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
//               </div>
//             </div>
//           ))
//         }
//       </div>
//     </div>
//   )
// }

// export default Orders

import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

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
                onClick={loadOrderData}
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
      </div>
    </div>
  );
};

export default Orders;
