import React from "react";

const PodcastSection = () => {
  return (
    <section className="relative bg-gray-900 text-gray-100 py-12 px-4">
      {/* Title, Subtitle, and Button Row */}
      <div className="max-w-6xl mx-auto flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Our podcast</h2>
          <p className="text-gray-400 max-w-xl">
            Figma ipsum component variant main layer. Follower asset outline select slice vertical. 
            Blur draft flatten shadow community group subtract. Layer layer pen draft undo.
          </p>
        </div>
        <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition">
          Audio recording
        </button>
      </div>

      {/* Container for circle and connection items */}
      <div className="relative max-w-4xl mx-auto h-[500px] md:h-[450px]">
        {/* Dashed Circle with center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Outer dashed circle */}
          <div className="relative w-[200px] h-[200px] md:w-[240px] md:h-[240px] border-2 border-dashed border-gray-500 rounded-full">
            {/* Center icon (microphone) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white text-black w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold">
                🎙
              </div>
            </div>
          </div>
        </div>

        {/* 8 white circles around the dashed circle */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (2 * Math.PI * i) / 8;
          const radius = 140; // Distance from center
          const centerX = 200; // Adjust for center in px (this depends on your container size)
          const centerY = 200;
          const top = Math.sin(angle) * radius + centerY;
          const left = Math.cos(angle) * radius + centerX;
          return (
            <div
              key={i}
              className="absolute w-5 h-5 bg-white rounded-full"
              style={{
                top: `${top}px`,
                left: `${left}px`,
                transform: "translate(-50%, -50%)",
              }}
            />
          );
        })}

        {/* Connection text blocks: 4 on the left, 4 on the right (matching screenshot layout) */}
        {/* Left connection items */}
        <div className="absolute left-0 top-1/4 md:top-[10%] space-y-8 md:space-y-10 px-4">
          {[...Array(2)].map((_, i) => (
            <div key={i}>
              <h3 className="font-semibold text-gray-100">Connection</h3>
              <p className="text-sm text-gray-400 w-44">
                Figma ipsum component variant main layer. Follower asset outline select slice vertical.
              </p>
            </div>
          ))}
        </div>
        <div className="absolute left-0 bottom-1/4 md:bottom-[10%] space-y-8 md:space-y-10 px-4">
          {[...Array(2)].map((_, i) => (
            <div key={i}>
              <h3 className="font-semibold text-gray-100">Connection</h3>
              <p className="text-sm text-gray-400 w-44">
                Figma ipsum component variant main layer. Follower asset outline select slice vertical.
              </p>
            </div>
          ))}
        </div>

        {/* Right connection items */}
        <div className="absolute right-0 top-1/4 md:top-[10%] space-y-8 md:space-y-10 px-4 text-right">
          {[...Array(2)].map((_, i) => (
            <div key={i}>
              <h3 className="font-semibold text-gray-100">Connection</h3>
              <p className="text-sm text-gray-400 w-44 ml-auto">
                Figma ipsum component variant main layer. Follower asset outline select slice vertical.
              </p>
            </div>
          ))}
        </div>
        <div className="absolute right-0 bottom-1/4 md:bottom-[10%] space-y-8 md:space-y-10 px-4 text-right">
          {[...Array(2)].map((_, i) => (
            <div key={i}>
              <h3 className="font-semibold text-gray-100">Connection</h3>
              <p className="text-sm text-gray-400 w-44 ml-auto">
                Figma ipsum component variant main layer. Follower asset outline select slice vertical.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PodcastSection;
