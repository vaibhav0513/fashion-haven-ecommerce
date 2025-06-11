// import React, { useContext } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import Title from './Title';

// const CartTotal = () => {
//   const {currency, delivery_fee, getCartAmount} = useContext(ShopContext);
//   return (
//     <div className='w-full'>
//       <div className='text-2xl'>
//         <Title text1={'CART'} text2={'TOTALS'} />
//       </div>

//       <div className='flex flex-col gap-2 mt-2 text-sm'>
//         <div className='flex justify-between'>
//           <p>Subtotal</p>
//           <p>{currency} {getCartAmount()}.00</p>
//         </div>
//         <hr />
//         <div className='flex justify-between text-[#f95959]'>
//           <p>Shipping Fee</p>
//           <p>{currency} {delivery_fee}.00</p>
//         </div>
//         <hr />
//         <div className='flex justify-between'>
//           <b>Total</b>
//           <b>{currency} {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00</b>
//         </div>
//       </div>
      
//     </div>
//   )
// }

// export default CartTotal


import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  const subtotal = getCartAmount();
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee;

  return (
    <div className="bg-white shadow-xl rounded-xl p-6 sm:p-8 transition-all duration-300">
      {/* Title */}
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-pink-600 border-b pb-2 border-pink-200 w-fit">
          CART TOTALS
        </h2>
      </div>

      {/* Totals Summary */}
      <div className="space-y-4 text-sm sm:text-base text-gray-700">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-medium">
            {currency} {subtotal}.00
          </span>
        </div>

        <div className="flex justify-between text-pink-600">
          <span>Shipping Fee</span>
          <span className="font-medium">
            {currency} {subtotal === 0 ? 0 : delivery_fee}.00
          </span>
        </div>

        <hr className="my-2 border-gray-200" />

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>
            {currency} {total}.00
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
