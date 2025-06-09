import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        <div>
          <img src={assets.logo5} className='mb-5 w-24' alt="" />
          <p className='w-full md:w-2/3 text-gray-600'>
          At <span className='font-bold text-red-600'>EzyKart</span>, we are driven by our desire to make online shopping not just a transaction, but an experience. We strive to stay ahead of the trends, offering the latest and most innovative products, all while maintaining the highest standards of customer service.
          </p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privcy policy</li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+91 8050403201</li>
            <li>contact@foreveryou.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2024@forever.com - All Right Reserved.</p>
      </div>
      
    </div>
  )
}

export default Footer
