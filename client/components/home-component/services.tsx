import React from "react"; 

const Services = () => {
  return (
    <section className="flex items-center justify-between p-10">
      {/* Left Abstract Shape */}
      <div className="relative w-64 h-64">
        <div className="absolute w-40 h-40 bg-green-400 top-4 left-6 shadow-lg"></div>
        <div className="absolute w-52 h-52 bg-gray-300 rotate-6"></div>
      </div>
      {/* Right Content */}
      <div className="max-w-lg">
        <h3 className="text-gray-500">Our service</h3>
        <h1 className="text-2xl font-bold mb-2">
          We help people living with a variety of mental health conditions.
        </h1>
        <p className="text-gray-600 mb-4">
          Figma ipsum component variant main layer. Follower asset outline select slice vertical. Blur draft flatten shadow community group subtract.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {[
            "Personality Disorders",
            "Anxiety",
            "Depression",
            "ADHD",
            "Personality Disorders",
            "OCD",
          ].map((condition, index) => (
            <div
              key={index}
              className="flex items-center border px-4 py-2 rounded-lg shadow-sm"
            >
              <span className="bg-blue-500 w-4 h-4 mr-2"></span>
              {condition}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
