import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaInstagram,
  FaFacebook,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-white to-pink-50 pt-20 text-gray-700 shadow-inner mt-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Logo & About */}
        <div>
          <h2 className="text-3xl font-extrabold text-pink-600 select-none">
            ezy<span className="text-gray-900">Kart</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed">
            At <span className="font-semibold text-pink-600">ezyKart</span>,
            shopping isn't just about buying — it’s about experiencing the best
            of fashion, tech, and essentials with trust.
          </p>
          <div className="flex gap-4 mt-4">
            <FaInstagram className="hover:text-pink-600 cursor-pointer text-lg" />
            <FaFacebook className="hover:text-pink-600 cursor-pointer text-lg" />
            <FaTwitter className="hover:text-pink-600 cursor-pointer text-lg" />
          </div>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            {["Home", "About Us", "Careers", "Privacy Policy"].map(
              (link, i) => (
                <li key={i}>
                  <Link to="/" className="hover:text-pink-600 transition">
                    {link}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            {["FAQs", "Shipping Info", "Returns", "Contact"].map((link, i) => (
              <li key={i}>
                <Link to="/" className="hover:text-pink-600 transition">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Get In Touch</h3>
          <div className="space-y-3 text-sm">
            <p className="flex items-center gap-2">
              <FaPhoneAlt className="text-pink-600" /> +91 1234567890
            </p>
            <p className="flex items-center gap-2">
              <FaEnvelope className="text-pink-600" /> contact@ezyKart.com
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-16 border-t border-gray-200 text-center py-5 text-xs text-gray-500">
        © 2024 <span className="font-semibold text-pink-600">ezyKart</span>. All
        rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
