"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Mail, ChevronDown } from "lucide-react"; 
import Link from "next/link"; 
import SearchBar from "@/components/SearchBar";

interface Supporter {
  name: string;
  location: string;
  avatar: string;
  supportDuration: string;
  lastInteraction: string;
  status: "Pending" | "Active" | "Disconnected";
}

const supporters: Supporter[] = [
  {
    name: "Felix Deo",
    location: "Navsari",
    avatar: "/thera1.jpg",
    supportDuration: "3 months ago",
    lastInteraction: "Let's stay strong together!",
    status: "Active",
  },
  {
    name: "Jerry Williams",
    location: "Vivbi",
    avatar: "/thera3.jpg",
    supportDuration: "20 days ago",
    lastInteraction: "Always here to listen!",
    status: "Pending",
  },
  {
    name: "Robert Fox",
    location: "London, England",
    avatar: "/thera2.jpg",
    supportDuration: "17 days ago",
    lastInteraction: "You are doing great!",
    status: "Disconnected",
  },
];

const SupportList: React.FC = () => {
  const [activeSupporters, setActiveSupporters] = useState<Supporter[]>(supporters);
  const [activeTab, setActiveTab] = useState("All Members");
  const [sortBy, setSortBy] = useState("Recent");

  const handleAction = (index: number, action: "reachOut" | "endConnection") => {
    setActiveSupporters((prev) =>
      prev.map((supporter, i) =>
        i === index
          ? { ...supporter, status: action === "reachOut" ? "Pending" : "Disconnected" }
          : supporter
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Tabs and Sort Bar */}
      <div className="flex flex-wrap w-full justify-between items-center bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-wrap gap-4">
          {["All Members", "My Friends"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-lg font-medium ${
                activeTab === tab ? "text-blue-500" : "text-gray-500"
              } hover:text-blue-500 transition`}
            >
              {tab}
            </button>
          ))}
        </div>
        <button
          className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition mt-2 sm:mt-0"
          onClick={() => setSortBy(sortBy === "Recent" ? "Alphabetical" : "Recent")}
        >
          Sorted by: {sortBy}
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>

      {/* Search Bar */}
      <SearchBar />

      {/* Supporters List */}
      <div className="space-y-4">
        {activeSupporters.map((supporter, index) => (
          <div
            key={index}
            className={`flex flex-wrap items-center justify-between bg-white p-4 rounded-lg shadow-md gap-4 
              ${supporter.status === "Pending" ? "border-l-4 border-yellow-500" : ""} 
              ${supporter.status === "Disconnected" ? "opacity-70" : ""}`}
          >
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <Image
                src={supporter.avatar}
                alt={`${supporter.name}'s avatar`}
                className="rounded-full border-2 border-blue-500"
                width={64}
                height={64}
              />
              <div>
                <h2 className="text-lg font-semibold">{supporter.name}</h2>
                <p className="text-sm text-gray-500">{supporter.location}</p>
                <p className="text-sm text-gray-400">Joined: {supporter.supportDuration}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
              {supporter.status === "Disconnected" && (
                <button
                  onClick={() => handleAction(index, "reachOut")}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition w-full sm:w-auto"
                >
                  Reach Out
                </button>
              )}
              {supporter.status !== "Disconnected" && (
                <button
                  onClick={() => handleAction(index, "endConnection")}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition w-full sm:w-auto"
                >
                  End Connection
                </button>
              )}
              <Link href="/pages/Question" className="text-gray-400 hover:text-blue-500">
                <Mail className="w-6 h-6 cursor-pointer" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupportList;
