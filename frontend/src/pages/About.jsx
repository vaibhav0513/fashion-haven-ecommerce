import React from 'react'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox'


const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p>We are <span className='font-bold text-red-600'>FashionHaven</span>, a dedicated team passionate about bringing you the best products at unbeatable prices. Our journey began with a simple idea: to create an online shopping experience that is both enjoyable and convenient. Since our inception, we have grown into a trusted name in the industry, known for our commitment to quality and customer satisfaction.</p>
        <p>What started as a small venture has now become a platform that serves thousands of happy customers. Our founders, driven by their love for innovation and service, built this company from the ground up, with the aim of making top-quality products accessible to everyone.</p>
        <b className='text-gray-800'>Our Mission</b>
        <p>Our mission is to provide our customers with a seamless shopping experience by offering a wide range of high-quality products at competitive prices. We aim to redefine the way people shop online by delivering exceptional service, building lasting relationships, and ensuring that every customer feels valued.</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance</b>
          <p className='text-gray-600'>Every product we offer undergoes rigorous testing and inspection before it reaches our shelves. From sourcing the finest materials to employing the most advanced manufacturing processes, we ensure that only the best products bear our name. Our dedicated Quality Assurance team works tirelessly to spot and address any issues before they reach you, so you can shop with confidence.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Continuous Improvement</b>
          <p className='text-gray-600'>We believe in continuous improvement and are always looking for ways to enhance the quality of our products and services. We listen to customer feedback and use it to make our offerings even better. Our commitment to quality doesn't end with the sale; we're here to ensure you're satisfied with your purchase every step of the way.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Your Satisfaction, Our Priority</b>
          <p className='text-gray-600'>If you're not completely satisfied with your purchase, our Customer Service team is ready to assist you with any concerns. We stand behind our products and are committed to making things right, no matter what. Your satisfaction is our top priority, and we won't rest until you're happy with your experience.</p>
        </div>
      </div>
      <NewsletterBox/>
    </div>
  )
}

export default About
