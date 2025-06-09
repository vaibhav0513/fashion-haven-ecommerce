// import React, { useContext } from 'react'
// import { Link } from 'react-router-dom'
// import { ShopContext } from '../context/ShopContext';

// const ProductItem = ({ id, image, name, price }) => {
//   const { currency } = useContext(ShopContext);

//   console.log(id, image, name, price); // debug

//   const imgSrc = Array.isArray(image) && image.length > 0 ? image[0] : '';

//   return (
//     <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
//       <div className='overflow-hidden'>
//         {imgSrc ? (
//           <img
//             className='hover:scale-110 transition ease-in-out'
//             src={imgSrc}
//             alt={name}
//           />
//         ) : (
//           <div className='bg-gray-200 h-48 flex items-center justify-center text-gray-500'>
//             No Image
//           </div>
//         )}
//       </div>
//       <p className='pt-3 pb-1 text-sm'>{name || 'Unnamed product'}</p>
//       <p className='text-sm font-medium'>{currency}{price || '0.00'}</p>
//     </Link>
//   );
// }

// export default ProductItem;


import React from 'react'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price }) => {
  // Defensive code: check if image is array and has at least one item
  const imgSrc = Array.isArray(image) && image.length > 0 ? image[0] : '';

  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
      <div className="overflow-hidden w-full h-64">  {/* fix height so image shows */}
        {imgSrc ? (
          <img
            className="hover:scale-110 transition ease-in-out object-cover w-full h-full"
            src={imgSrc}
            alt={name}
          />
        ) : (
          <div className="bg-gray-200 w-full h-full flex items-center justify-center">
            Image not available
          </div>
        )}
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">₹{price}</p>
    </Link>
  )
}

export default ProductItem
