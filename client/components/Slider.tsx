"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Users,
  HeartPulse,
  CalendarCheck,
  Settings,
  Shield,
  Smile,
  LogOut,
} from "lucide-react";
import Link from "next/link";

const Sidebar: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLinkClick = () => {
    setLoading(true); 
    setTimeout(() => setLoading(false), 2000); 
  };

  return (
    <>
      {/* Loading Indicator */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
          <img src="/logo.svg" alt="Loading..." className="w-16 h-16 animate-spin" />
        </div>
      )}

      <aside
        className={`bg-white border-r border-gray-300 p-4 shadow-lg sticky top-0 h-screen duration-300 ${
          isHovered ? "w-64" : "w-20"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Profile Section */}
        <div className="flex items-center mb-6">
          <Image
            src="/avatar.jpg" // Ensure this image exists in the public folder
            alt="Profile"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          />
          <div className={`ml-3 duration-300 ${isHovered ? "block" : "hidden"}`}>
            <h3 className="font-semibold text-sm">Marvin McKinney</h3>
            <p className="text-xs text-gray-500">@marvin</p>
          </div>
        </div>

        {/* Navigation Sections */}
        <nav>
          <ul className="space-y-4">
            {/* Activities */}
            <li>
              <Link
                href="/pages/Dashboard"
                onClick={handleLinkClick}
                className="flex items-center gap-4 p-2 rounded-lg hover:bg-green-50"
              >
                <div className="bg-green-500 text-white p-2 rounded-lg">
                  <HeartPulse size={20} />
                </div>
                <span
                  className={`text-gray-700 font-medium duration-300 ${
                    isHovered ? "block" : "hidden"
                  }`}
                >
                  Activities
                </span>
              </Link>
            </li>

            {/* Community */}
            <li>
              <Link
                href="/pages/Community"
                onClick={handleLinkClick}
                className="flex items-center gap-4 p-2 rounded-lg hover:bg-yellow-50"
              >
                <div className="bg-yellow-500 text-white p-2 rounded-lg">
                  <Users size={20} />
                </div>
                <span
                  className={`text-gray-700 font-medium duration-300 ${
                    isHovered ? "block" : "hidden"
                  }`}
                >
                  Community
                </span>
              </Link>
            </li>

            {/* Therapist */}
            <li>
              <Link
                href="/pages/Therapist"
                onClick={handleLinkClick}
                className="flex items-center gap-4 p-2 rounded-lg hover:bg-pink-50"
              >
                <div className="bg-pink-500 text-white p-2 rounded-lg">
                  <Shield size={20} />
                </div>
                <span
                  className={`text-gray-700 font-medium duration-300 ${
                    isHovered ? "block" : "hidden"
                  }`}
                >
                  Therapist
                </span>
              </Link>
            </li>

            {/* Mood Tracker */}
            <li>
              <Link
                href="/pages/MoodTracker"
                onClick={handleLinkClick}
                className="flex items-center gap-4 p-2 rounded-lg hover:bg-purple-50"
              >
                <div className="bg-purple-500 text-white p-2 rounded-lg">
                  <Smile size={20} />
                </div>
                <span
                  className={`text-gray-700 font-medium duration-300 ${
                    isHovered ? "block" : "hidden"
                  }`}
                >
                  Mood Tracker
                </span>
              </Link>
            </li>

            {/* My Progress */}
            <li>
              <Link
                href="/pages/Myprogress"
                onClick={handleLinkClick}
                className="flex items-center gap-4 p-2 rounded-lg hover:bg-orange-50"
              >
                <div className="bg-orange-500 text-white p-2 rounded-lg">
                  <CalendarCheck size={20} />
                </div>
                <span
                  className={`text-gray-700 font-medium duration-300 ${
                    isHovered ? "block" : "hidden"
                  }`}
                >
                  My Progress
                </span>
              </Link>
            </li>

            {/* Settings */}
            <li>
              <Link
                href="/settings"
                onClick={handleLinkClick}
                className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-50"
              >
                <div className="bg-gray-500 text-white p-2 rounded-lg">
                  <Settings size={20} />
                </div>
                <span
                  className={`text-gray-700 font-medium duration-300 ${
                    isHovered ? "block" : "hidden"
                  }`}
                >
                  Settings
                </span>
              </Link>
            </li>

            {/* Logout */}
            <li>
              <Link
                href="/logout"
                onClick={handleLinkClick}
                className="flex items-center gap-4 p-2 rounded-lg hover:bg-red-50"
              >
                <div className="bg-red-500 text-white p-2 rounded-lg">
                  <LogOut size={20} />
                </div>
                <span
                  className={`text-gray-700 font-medium duration-300 ${
                    isHovered ? "block" : "hidden"
                  }`}
                >
                  Log Out
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
