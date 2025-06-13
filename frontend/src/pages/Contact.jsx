import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const Contact = () => {
  return (
    <div className="bg-white mt-12 text-gray-800">
      {/* Title Section */}
      <div className="text-center text-3xl pt-14 border-t border-gray-300">
        <Title text1="CONTACT" text2="US" />
      </div>

      {/* Contact Info Section */}
      <div className="my-16 flex flex-col md:flex-row items-center justify-center gap-14 px-6 md:px-20">
        <img
          className="w-full md:max-w-[450px] rounded-xl shadow-lg"
          src={assets.contact_img}
          alt="Contact"
        />

        <div className="flex flex-col gap-6 max-w-md">
          <div>
            <h3 className="font-bold text-2xl text-pink-600 mb-2">Our Store</h3>
            <p className="text-gray-600 leading-relaxed">
              Galaxy Apartment Station,
              <br />
              Noida, India.
            </p>
          </div>

          <div>
            <p className="text-gray-600">
              📞 <span className="font-medium">+91 1234567890</span>
            </p>
            <p className="text-gray-600">
              📧 <span className="font-medium">admin@ezyKart.com</span>
            </p>
          </div>

          <div>
            <h3 className="font-bold text-2xl text-pink-600 mb-2">
              Careers at ezyKart
            </h3>
            <p className="text-gray-600 mb-4">
              Learn more about our teams and current openings.
            </p>
            <button className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-all duration-300 shadow-md">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>

      {/* Newsletter Box */}
      <NewsletterBox />
    </div>
  );
};

export default Contact;
