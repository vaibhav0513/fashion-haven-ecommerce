// import React, { useContext, useEffect, useState } from 'react';
// import { ShopContext } from '../context/ShopContext';
// import Title from '../components/Title';
// import { assets } from '../assets/assets';
// import CartTotal from '../components/CartTotal';
// import { motion, AnimatePresence } from 'framer-motion';

// const Cart = () => {
//   const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
//   const [cartData, setCartData] = useState([]);

//   useEffect(() => {
//     if (products.length > 0) {
//       const tempData = [];
//       for (const productId in cartItems) {
//         for (const size in cartItems[productId]) {
//           if (cartItems[productId][size] > 0) {
//             tempData.push({
//               _id: productId,
//               size: size,
//               quantity: cartItems[productId][size],
//             });
//           }
//         }
//       }
//       setCartData(tempData);
//     }
//   }, [cartItems, products]);

//   return (
//     <div className='border-t pt-14'>
//       <div className='text-2xl mb-3'>
//         <Title text1={'YOUR'} text2={'CART'} />
//       </div>

//       <div>
//         <AnimatePresence>
//           {cartData.map((item, index) => {
//             const productData = products.find((product) => product._id === item._id);
//             if (!productData) return null;

//             return (
//               <motion.div
//                 key={`${item._id}-${item.size}`}
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, x: 100 }}
//                 transition={{ duration: 0.3 }}
//                 className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'
//               >
//                 <div className='flex items-start gap-6'>
//                   <img className='w-16 sm:w-20' src={productData.image[0]} alt='' />
//                   <div>
//                     <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
//                     <div className='flex items-center gap-5 mt-2'>
//                       <p>{currency}{productData.price}</p>
//                       <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
//                     </div>
//                   </div>
//                 </div>

//                 <input
//                   onChange={(e) =>
//                     e.target.value === '' || e.target.value === '0'
//                       ? null
//                       : updateQuantity(item._id, item.size, Number(e.target.value))
//                   }
//                   className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1'
//                   type='number'
//                   min={1}
//                   defaultValue={item.quantity}
//                 />

//                 <motion.img
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9, rotate: -15 }}
//                   onClick={() => updateQuantity(item._id, item.size, 0)}
//                   className='w-4 mr-4 sm:w-5 cursor-pointer'
//                   src={assets.bin_icon}
//                   alt='Remove item'
//                 />
//               </motion.div>
//             );
//           })}
//         </AnimatePresence>
//       </div>

//       <div className='flex justify-end my-20'>
//         <motion.div
//           initial={{ opacity: 0, x: 100 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.3, duration: 0.5 }}
//           className='w-full sm:w-[450px]'
//         >
//           <CartTotal />
//           <div className='w-full text-end'>
//             <button
//               onClick={() => navigate('/place-order')}
//               className='bg-black text-white text-sm my-8 px-8 py-3'
//             >
//               PROCEED TO CHECKOUT
//             </button>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Cart;


import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          if (cartItems[productId][size] > 0) {
            tempData.push({
              _id: productId,
              size,
              quantity: cartItems[productId][size],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="border-t pt-14 mt-12 px-4 sm:px-8 min-h-screen bg-gray-50">
      <div className="text-2xl mb-6 text-center">
        <Title text1="YOUR" text2="CART" />
      </div>

      {cartData.length === 0 ? (
        <div className="text-center py-20 text-gray-500 text-lg">Your cart is empty 🛒</div>
      ) : (
        <>
          <div className="space-y-4">
            <AnimatePresence>
              {cartData.map((item) => {
                const productData = products.find((product) => product._id === item._id);
                if (!productData) return null;

                return (
                  <motion.div
                    key={`${item._id}-${item.size}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 bg-white rounded-lg shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                  >
                    {/* Product details */}
                    <div className="flex gap-4 items-start">
                      <img
                        className="w-20 h-20 object-cover rounded-md border"
                        src={productData.images?.[0]}
                        alt={productData.name}
                      />
                      <div className="text-gray-800">
                        <p className="font-medium text-sm sm:text-base">{productData.name}</p>
                        <div className="flex gap-3 mt-1 text-sm text-gray-600">
                          <p>{currency}{productData.price}</p>
                          <p className="bg-gray-100 px-2 py-0.5 rounded">Size: {item.size}</p>
                        </div>
                      </div>
                    </div>

                    {/* Quantity & Remove */}
                    <div className="flex items-center gap-4 sm:gap-6">
                      <input
                        type="number"
                        min={1}
                        defaultValue={item.quantity}
                        className="w-16 text-center border px-2 py-1 rounded text-sm"
                        onChange={(e) =>
                          e.target.value === '' || e.target.value === '0'
                            ? null
                            : updateQuantity(item._id, item.size, Number(e.target.value))
                        }
                      />

                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9, rotate: -10 }}
                        onClick={() => updateQuantity(item._id, item.size, 0)}
                        className="w-5 cursor-pointer"
                        src={assets.bin_icon}
                        alt="Remove"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Total & Checkout */}
          <div className="flex justify-end mt-16">
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="w-full sm:w-[450px]"
            >
              <CartTotal />
              <div className="text-end">
                <button
                  onClick={() => navigate('/place-order')}
                  className="bg-pink-600 hover:bg-pink-700 text-white text-sm mt-8 px-8 py-3 rounded transition-all duration-200"
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
