// import React, { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { ShopContext } from "../context/ShopContext";
// import { assets } from "../assets/assets";
// import RelatedProducts from "../components/RelatedProducts";

// const Product = () => {
//   const { productId } = useParams();
//   const { products, currency, addToCart } = useContext(ShopContext);
//   const [productData, setProductData] = useState(null);
//   const [image, setImage] = useState("");
//   const [size, setSize] = useState("");

//   const fetchProductData = () => {
//     const product = products.find((item) => item._id === productId);
//     if (product) {
//       setProductData(product);
//       setImage(product.images[0]);
//     }
//   };

//   useEffect(() => {
//     console.log("Products from context:", products); // <-- log this
//     fetchProductData();
//   }, [productId, products]);

//   if (!productData) return <div>Loading...</div>;

//   return productData ? (
//     <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
//       {/*----------------- Product Data  ----------------------------*/}
//       <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
//         {/*------------------ Product Images  ------------------*/}
//         <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
//           <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
//             {/* {productData.image.map((item, index) => (
//               <img
//                 onClick={() => setImage(item)}
//                 src={item}
//                 key={index}
//                 className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 curser-pointer"
//                 alt=""
//               />
//             ))} */}
//             {productData.images.map((item, index) => (
//               <img
//                 onClick={() => setImage(item)}
//                 src={item}
//                 key={index}
//                 className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
//                 alt=""
//               />
//             ))}
//           </div>
//           <div className="w-full sm:w-[80%]">
//             <img className="w-full h-auto" src={image} alt="" />
//           </div>
//         </div>

//         {/*---------------------- Product Info ------------------- */}
//         <div className="flex-1">
//           <h1 className="font-medium text-2xl mt-2 text-[#F05A7E]">
//             {productData.name}
//           </h1>
//           <div className="flex items-center gap-1 mt-2">
//             <img src={assets.star_icon} alt="" className="w-3 5" />
//             <img src={assets.star_icon} alt="" className="w-3 5" />
//             <img src={assets.star_icon} alt="" className="w-3 5" />
//             <img src={assets.star_icon} alt="" className="w-3 5" />
//             <img src={assets.star_dull_icon} alt="" className="w-3 5" />
//             <p className="pl-2">(122)</p>
//           </div>
//           <p className="mt-5 text-3xl font-medium">
//             {currency}
//             {productData.price}
//           </p>
//           <p className="mt-5 text-gray-500 md:w-4/5">
//             {productData.description}
//           </p>
//           <div className="flex flex-col gap-4 my-8">
//             <p>Select Size:-</p>
//             <div className="flex gap-2">
//               {productData.sizes.map((item, index) => (
//                 <button
//                   onClick={() => setSize(item)}
//                   className={`border py-2 px-4 bg-gray-100 ${
//                     item === size ? "border-orange-400" : ""
//                   }`}
//                   key={index}
//                 >
//                   {item}
//                 </button>
//               ))}
//             </div>
//           </div>
//           <button
//             onClick={() => addToCart(productData._id, size)}
//             className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
//           >
//             ADD TO CART
//           </button>
//           <hr className="mt-8 sm:w-4/5" />
//           <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
//             <p>100% Original product.</p>
//             <p>Cash on delivery is available on this product.</p>
//             <p>Easy return and exchange policy within 7 days.</p>
//           </div>
//         </div>
//       </div>
//       {/* Description & Review Section   */}
//       <div className="mt-20">
//         <div className="flex">
//           <b className="border px-5 py-3 text-sm">Description</b>
//           <p className="border px-5 py-3 text-sm">Reviews (122)</p>
//         </div>
//         <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
//           <p>
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
//             adipisci molestias neque impedit omnis quas natus vitae ratione
//             suscipit sapiente!
//           </p>
//           <p>
//             Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio vel
//             deleniti laborum illum. Suscipit vel debitis beatae! Quas, illo.
//             Dicta unde ratione quod iure vel. Lorem ipsum dolor sit amet
//             consectetur adipisicing elit. Ex quam incidunt minus repudiandae
//             inventore illo doloribus modi. Quae quo necessitatibus voluptatibus
//             explicabo soluta, sapiente dicta?
//           </p>
//         </div>
//       </div>

//       {/* Display Related Products  */}
//       <RelatedProducts
//         category={productData.category}
//         subCategory={productData.subCategory}
//       />
//     </div>
//   ) : (
//     <div className="opacity-0"></div>
//   );
// };

// export default Product;



import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.images[0]);
    }
  }, [productId, products]);

  if (!productData) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="pt-10 mt-12 border-t-2">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* Images */}
        <div className="flex-1 flex flex-col md:flex-row gap-5">
          <div className="flex md:flex-col gap-3 md:overflow-y-scroll overflow-x-auto w-full md:w-24">
            {productData.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt=""
                onClick={() => setImage(img)}
                className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${
                  img === image ? "border-pink-500" : "border-gray-200"
                }`}
              />
            ))}
          </div>
          <div className="flex-1">
            <img
              src={image}
              alt=""
              className="w-full h-full object-cover rounded-xl shadow-sm"
            />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-semibold text-pink-600">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-3 text-yellow-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <img
                key={i}
                src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                className="w-4 h-4"
                alt="star"
              />
            ))}
            <span className="text-sm text-gray-500 ml-2">(122 reviews)</span>
          </div>

          <p className="mt-4 text-2xl font-bold text-gray-800">
            {currency}
            {productData.price}
          </p>

          <p className="mt-4 text-gray-600 leading-relaxed">
            {productData.description}
          </p>

          {/* Size Selection */}
          <div className="mt-6">
            <h2 className="text-sm font-medium text-gray-700">Select Size:</h2>
            <div className="flex gap-3 mt-2">
              {productData.sizes.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setSize(s)}
                  className={`border px-4 py-2 rounded-md text-sm ${
                    s === size
                      ? "bg-pink-100 text-pink-600 border-pink-500"
                      : "border-gray-300 text-gray-700"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={() => addToCart(productData._id, size)}
            className="mt-6 bg-pink-600 hover:bg-pink-700 transition text-white px-8 py-3 rounded-lg font-medium shadow"
          >
            Add to Cart
          </button>

          <div className="text-sm text-gray-500 mt-6 border-t pt-4 space-y-1">
            <p>✔ 100% Original product.</p>
            <p>✔ Cash on delivery available.</p>
            <p>✔ 7-day return & exchange policy.</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-20">
        <div className="flex border-b">
          <button className="px-6 py-3 text-sm font-medium border-b-2 border-pink-600 text-pink-600">
            Description
          </button>
          <button className="px-6 py-3 text-sm text-gray-600 hover:text-pink-600">
            Reviews (122)
          </button>
        </div>
        <div className="bg-gray-50 px-6 py-6 text-sm text-gray-700 leading-loose">
          <p className="mb-4">
            This product is crafted with high-quality materials and designed to
            provide the utmost comfort and style. Ideal for everyday use and
            special occasions alike.
          </p>
          <p>
            Whether you're dressing up or keeping it casual, this product is a
            great fit for your wardrobe. Available in multiple sizes to suit
            your needs.
          </p>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;
