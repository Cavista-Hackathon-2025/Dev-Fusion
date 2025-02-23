import Image from 'next/image';
import React from 'react';

const HomePage = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-white overflow-hidden">
      {/* Background Circles */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-20 h-20 bg-yellow-300 rounded-full top-10 left-10 animate-pulse"></div>
        <div className="absolute w-24 h-24 bg-pink-400 rounded-full bottom-16 right-16 animate-pulse"></div>
        <div className="absolute w-16 h-16 bg-green-400 rounded-full top-32 right-32 animate-bounce"></div>
        <div className="absolute w-10 h-10 bg-orange-400 rounded-full bottom-20 left-20 animate-pulse"></div>
        {/* Add more circles if needed */}
      </div>

      {/* Main Content */}
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
          When Stories Meet Their Perfect Audience
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Having real social contacts can sometimes be difficult. <br />
          FUN, everything becomes much simpler!
        </p>
        <button className="px-6 py-3 bg-pink-500 text-white font-semibold rounded-full hover:bg-pink-600 transition duration-300 shadow-lg">
          EXPLORE NOW
        </button>
      </div>

      {/* Floating Avatars */}
      <div className="absolute w-full h-full pointer-events-none">
        {/* Sample Avatars */}
        <div className="absolute top-16 left-32 w-16 h-16 border-4 border-pink-300 rounded-full overflow-hidden">
          <Image
            src="/avatar.png"  
            alt="Avatar"
            width={100}
            height={100}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-32 right-28 w-16 h-16 border-4 border-yellow-300 rounded-full overflow-hidden">
          <Image
            src="/avatar.png" // Replace with your avatar image
            alt="Avatar"
            width={100}
            height={100}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-32 right-28 w-16 h-16 border-4 border-yellow-300 rounded-full overflow-hidden">
          <Image
            src="/avatar.png" // Replace with your avatar image
            alt="Avatar"
            width={100}
            height={100}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -bottom-32 right-20 w-16 h-16 border-4 border-yellow-300 rounded-full overflow-hidden">
          <Image
            src="/avatar.png" // Replace with your avatar image
            alt="Avatar"
            width={100}
            height={100}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Add more floating avatars */}
      </div>
    </div>
  );
};

export default HomePage;
