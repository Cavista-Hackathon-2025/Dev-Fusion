// components/UserProfile.tsx
import Image from "next/image";
import React from "react";

const UserProfile = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-xl w-[800px]">
        {/* Profile Header */}
        <div className="relative bg-gradient-to-r from-gray-300 to-gray-400 h-28 rounded-t-xl">
          <div className="absolute top-16 left-4 flex items-center">
            <div className="w-24 h-24 rounded-full border-4 border-white bg-gray-200">
              {/* Replace with a profile picture */}
              <Image
                src="/profile-picture.jpg"
                alt="Profile Picture"
                className="rounded-full w-full h-full object-cover"
                width={100}
                height={100}
              />
            </div>
            <div className="ml-4">
              <h1 className="text-lg font-bold text-gray-800">Marvin McKinney</h1>
              <span className="text-green-600 text-sm font-medium">Online</span>
              <p className="text-sm text-gray-500">United States</p>
              <a
                href="https://iconic.design/"
                className="text-blue-500 text-sm underline"
              >
                iconic.design/
              </a>
            </div>
          </div>
        </div>

        {/* Profile Stats */}
        <div className="flex justify-between px-6 py-4 border-b">
          <div>
            <span className="text-xl font-bold text-gray-800">8370</span>
            <p className="text-sm text-gray-500">Coins</p>
          </div>
          <div>
            <span className="text-xl font-bold text-gray-800">12200</span>
            <p className="text-sm text-gray-500">Credits</p>
          </div>
          <div>
            <span className="text-xl font-bold text-gray-800">100</span>
            <p className="text-sm text-gray-500">Gems</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-around py-4">
          {["Badges", "Courses", "Shop", "Invitations", "Forums", "Media"].map(
            (tab) => (
              <button
                key={tab}
                className="text-sm font-medium text-gray-600 hover:text-blue-500"
              >
                {tab}
              </button>
            )
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4">
          <p className="text-sm text-gray-500">0 Posts | 3 Comments</p>
          <p className="text-sm text-gray-500">133.8K Views</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
