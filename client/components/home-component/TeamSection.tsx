"use client";
import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; 
const teamMembers = [
  {
    name: "John Doe",
    description:
      "Figma ipsum component variant main layer. Follower asset outline select slice vertical.",
    role: "Component variant",
  },
  {
    name: "Jane Smith",
    description:
      "Figma ipsum component variant main layer. Follower asset outline select slice vertical.",
    role: "Component variant",
  },
  {
    name: "Alice Johnson",
    description:
      "Figma ipsum component variant main layer. Follower asset outline select slice vertical.",
    role: "Component variant",
  },
  {
    name: "Bob Williams",
    description:
      "Figma ipsum component variant main layer. Follower asset outline select slice vertical.",
    role: "Component variant",
  },
];

const TeamSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Number of items to show per slide
  const itemsPerSlide = 3;

  // Calculate the total number of slides needed
  const totalSlides = Math.ceil(teamMembers.length / itemsPerSlide);

  // Move to next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 < totalSlides ? prevIndex + 1 : 0
    );
  };

  // Move to previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 >= 0 ? prevIndex - 1 : totalSlides - 1
    );
  };

  // Slice the teamMembers array based on currentIndex
  // E.g. if currentIndex = 0, we show [0..2], if currentIndex = 1, we show [3..5], etc.
  const startIndex = currentIndex * itemsPerSlide;
  const endIndex = startIndex + itemsPerSlide;
  const visibleMembers = teamMembers.slice(startIndex, endIndex);

  return (
    <section className="text-center p-10">
      <h2 className="text-2xl font-bold mb-4">Meet the Team</h2>
      <div className="relative">
        {/* Arrow Left */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-600 p-2"
        >
          <FaArrowLeft size={24} />
        </button>

        {/* Team Members Container */}
        <div className="flex justify-center space-x-6 mx-10">
          {visibleMembers.map((member, index) => (
            <div
              key={index}
              className="bg-gray-100 p-6 rounded-lg shadow-lg w-60"
            >
              <div className="w-40 h-20 bg-gray-300 mb-4 mx-auto"></div>
              <p className="text-gray-600">{member.description}</p>
              <p className="font-bold mt-2">
                {member.name} - {member.role}
              </p>
            </div>
          ))}
        </div>

        {/* Arrow Right */}
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-600 p-2"
        >
          <FaArrowRight size={24} />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 mx-1 rounded-full ${
              index === currentIndex ? "bg-gray-800" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
