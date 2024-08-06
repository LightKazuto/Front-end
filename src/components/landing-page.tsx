import React from 'react';
// import Image from 'next/image';

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 py-8 pt-10">
      <div className="text-center">
        <h2 className="text-xl font-bold mb-4">
          Order groceries for delivery or pickup today
        </h2>
        <p className="text-gray-700 mb-6">
          Whatever you want from local stores, brought right to your door
        </p>
        <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 bg-white shadow-md">
          <i className="fas fa-map-marker-alt mr-2 text-gray-600"></i>
          <input
            type="text"
            placeholder="Enter your address"
            className="flex-grow outline-none"
          />
          <i className="fas fa-arrow-right text-gray-600 ml-2"></i>
        </div>
      </div>
      <div className="absolute inset-0 z-[-1]">
        {/* <Image
          src="https://d2d8wwwkmhfcva.cloudfront.net/x856/d2guulkeunn7d8.cloudfront.net/assets/homepage/homepage_background_full_m3_cropped-8d2d286263821da7decd7c61fb1db1eb0e3dec13e0c356277d6d3cb7484c024a.jpg"
          alt="Hero background"
          layout="fill"
          objectFit="cover"
        /> */}
      </div>
    </div>
  );
};

export default LandingPage;
