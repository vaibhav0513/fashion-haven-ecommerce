import React from 'react';
import { assets } from '../assets/assets';

const policies = [
  {
    icon: assets.exchange_icon,
    title: 'Easy Exchange Policy',
    desc: 'Enjoy smooth and hassle-free product exchanges.',
  },
  {
    icon: assets.quality_icon,
    title: '7-Day Return Guarantee',
    desc: 'Didn’t love it? Return within 7 days with no questions asked.',
  },
  {
    icon: assets.support_img,
    title: '24/7 Customer Support',
    desc: 'We’re always here to help, anytime you need us.',
  },
];

const OurPolicy = () => {
  return (
    <section className="w-full py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 tracking-wide">
          Why Shop With Us?
        </h2>
        <p className="text-gray-500 mb-12 text-sm md:text-base">
          We believe in providing a stress-free and supportive shopping experience.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {policies.map((policy, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl p-6 group hover:shadow-2xl transition duration-300 transform hover:-translate-y-1"
            >
              <div className="w-14 h-14 mx-auto mb-5 bg-pink-100 rounded-full flex items-center justify-center group-hover:bg-pink-600 transition duration-300">
                <img
                  src={policy.icon}
                  alt={policy.title}
                  className="w-6 h-6 group-hover:invert transition"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-pink-600 transition">
                {policy.title}
              </h3>
              <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                {policy.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurPolicy;
