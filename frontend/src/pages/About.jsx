// import React from 'react'
// import Title from '../components/Title';
// import { assets } from '../assets/assets';
// import NewsletterBox from '../components/NewsletterBox'


// const About = () => {
//   return (
//     <div>
//       <div className='text-2xl text-center pt-8 border-t'>
//         <Title text1={'ABOUT'} text2={'US'} />
//       </div>

//       <div className='my-10 flex flex-col md:flex-row gap-16'>
//         <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
//         <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
//         <p>We are <span className='font-bold text-red-600'>ezyKart</span>, a dedicated team passionate about bringing you the best products at unbeatable prices. Our journey began with a simple idea: to create an online shopping experience that is both enjoyable and convenient. Since our inception, we have grown into a trusted name in the industry, known for our commitment to quality and customer satisfaction.</p>
//         <p>What started as a small venture has now become a platform that serves thousands of happy customers. Our founders, driven by their love for innovation and service, built this company from the ground up, with the aim of making top-quality products accessible to everyone.</p>
//         <b className='text-gray-800'>Our Mission</b>
//         <p>Our mission is to provide our customers with a seamless shopping experience by offering a wide range of high-quality products at competitive prices. We aim to redefine the way people shop online by delivering exceptional service, building lasting relationships, and ensuring that every customer feels valued.</p>
//         </div>
//       </div>

//       <div className='text-xl py-4'>
//         <Title text1={'WHY'} text2={'CHOOSE US'} />
//       </div>
//       <div className='flex flex-col md:flex-row text-sm mb-20'>
//         <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
//           <b>Quality Assurance</b>
//           <p className='text-gray-600'>Every product we offer undergoes rigorous testing and inspection before it reaches our shelves. From sourcing the finest materials to employing the most advanced manufacturing processes, we ensure that only the best products bear our name. Our dedicated Quality Assurance team works tirelessly to spot and address any issues before they reach you, so you can shop with confidence.</p>
//         </div>
//         <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
//           <b>Continuous Improvement</b>
//           <p className='text-gray-600'>We believe in continuous improvement and are always looking for ways to enhance the quality of our products and services. We listen to customer feedback and use it to make our offerings even better. Our commitment to quality doesn't end with the sale; we're here to ensure you're satisfied with your purchase every step of the way.</p>
//         </div>
//         <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
//           <b>Your Satisfaction, Our Priority</b>
//           <p className='text-gray-600'>If you're not completely satisfied with your purchase, our Customer Service team is ready to assist you with any concerns. We stand behind our products and are committed to making things right, no matter what. Your satisfaction is our top priority, and we won't rest until you're happy with your experience.</p>
//         </div>
//       </div>
//       <NewsletterBox/>
//     </div>
//   )
// }

// export default About



import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

const About = () => {
  return (
    <div className="text-gray-700 mt-12">
      {/* About Us Section */}
      <div className="text-3xl text-center pt-12 border-t">
        <Title text1="ABOUT" text2="US" />
      </div>

      <div className="my-12 flex flex-col md:flex-row gap-12 items-center px-4 sm:px-8">
        <img
          className="w-full md:max-w-[450px] rounded-xl shadow-lg"
          src={assets.about_img}
          alt="About ezyKart"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/3">
          <p>
            We are <span className="font-bold text-pink-600">ezyKart</span>, a dedicated team passionate about bringing you the best products at unbeatable prices. Our journey began with a simple idea: to create an online shopping experience that is both enjoyable and convenient.
          </p>
          <p>
            What started as a small venture has now become a platform that serves thousands of happy customers. Our founders, driven by their love for innovation and service, built this company from the ground up.
          </p>
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">Our Mission</h3>
            <p>
              To provide a seamless shopping experience by offering high-quality products at competitive prices, backed by excellent customer service.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="text-3xl text-center py-10 bg-gradient-to-r from-pink-100 to-white">
        <Title text1="WHY" text2="CHOOSE US" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 mt-10 sm:px-8 mb-20">
        <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
          <h4 className="font-semibold text-lg mb-3 text-pink-600">✔️ Quality Assurance</h4>
          <p>
            Every product we offer undergoes rigorous testing before it reaches you. We ensure that only the best products bear our name.
          </p>
        </div>

        <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
          <h4 className="font-semibold text-lg mb-3 text-pink-600">🔄 Continuous Improvement</h4>
          <p>
            We listen to your feedback and constantly strive to improve. Our journey is shaped by your experience and satisfaction.
          </p>
        </div>

        <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
          <h4 className="font-semibold text-lg mb-3 text-pink-600">💖 Your Satisfaction, Our Priority</h4>
          <p>
            Our support team is always here to help. We are committed to making things right for you – always.
          </p>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-gray-50 py-12">
        <NewsletterBox />
      </div>
    </div>
  );
};

export default About;
