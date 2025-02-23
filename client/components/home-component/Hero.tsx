import React from "react";
import Link from "next/link";

const  Hero = () => {
  return (
    <section className="flex items-center justify-between p-10">
      {/* Left Content */}
      <div className="max-w-lg">
        <div className="flex space-x-2 mb-4">
          <span className="bg-purple-200 text-purple-800 px-3 py-1 text-sm rounded-lg">Psychologist</span>
          <span className="bg-green-200 text-green-800 px-3 py-1 text-sm rounded-lg">Psychiatrist</span>
          <span className="bg-blue-200 text-blue-800 px-3 py-1 text-sm rounded-lg">Counselor</span>
        </div>
        <h1 className="text-4xl font-bold mb-2">
          <span className="font-extrabold">Mental Health</span> Is not a Destination but a <span className="font-extrabold">Process.</span>
        </h1>
        <p className="text-gray-600 mb-4">
          Figma ipsum component variant main layer. Follower asset outline select slice vertical. Blur draft flatten shadow community group subtract.
        </p>
        <div className="flex items-center space-x-4">
          <Link href="#">
            <p className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition">Book Appointment</p>
          </Link>
          <div className="flex items-center space-x-2">
            <span className="bg-blue-200 text-blue-800 px-3 py-1 text-sm rounded-lg">92%</span>
            <span className="text-gray-600">is our success rate so far</span>
          </div>
        </div>
      </div>
      {/* Right Abstract Shape */}
      <div className="relative w-64 h-64">
        <div className="absolute w-40 h-40 bg-red-400 top-4 left-6 shadow-lg"></div>
        <div className="absolute w-52 h-52 bg-gray-300 rotate-6"></div>
        <div className="absolute top-6 left-10 w-28 h-10 border-2 border-gray-500 rounded-full"></div>
        <div className="absolute bottom-6 left-0 w-28 h-10 border-2 border-gray-500 rounded-full"></div>
      </div>
    </section>
  );
};

export default Hero;
