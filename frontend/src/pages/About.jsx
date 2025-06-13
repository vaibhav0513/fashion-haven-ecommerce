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
