"use client";

import React, { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { X, Maximize2, Minimize2 } from "lucide-react";

const PersonalGrowthChart: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Dummy Data for Personal Growth
  const data = [
    { date: "2023/01/01", growth: 20 },
    { date: "2023/02/01", growth: 30 },
    { date: "2023/03/01", growth: 50 },
    { date: "2023/04/01", growth: 70 },
    { date: "2023/05/01", growth: 100 },
    { date: "2023/06/01", growth: 20 },
    { date: "2023/07/01", growth: 50 },
    { date: "2023/08/01", growth: 80 },
    { date: "2023/09/01", growth: 30 },
    { date: "2023/10/01", growth: 110 },
    { date: "2023/11/01", growth: 10 }, 
    { date: "2024/01/01", growth: 70 },
  ];
  const handleFullscreen = () => {
    const chartElement = document.getElementById("growth-chart-container");
    if (chartElement) {
      if (!isFullscreen) {
        chartElement.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
      setIsFullscreen(!isFullscreen);
    }
  };

  return (
    <div
      id="growth-chart-container"
      className={`relative bg-white shadow-lg p-4 rounded-lg overflow-hidden ${
        isFullscreen ? "w-screen h-screen fixed top-0 left-0 z-50" : "w-full"
      }`}
    >
      <div className="flex justify-between items-center pb-4 border-b">
        <h4 className="text-lg font-bold">Personal Growth Chart</h4>
        <div className="flex space-x-3">
          <button onClick={handleFullscreen}>
            {isFullscreen ? (
              <Minimize2 size={20} className="text-gray-700 hover:text-black" />
            ) : (
              <Maximize2 size={20} className="text-gray-700 hover:text-black" />
            )}
          </button>
          <button>
            <X size={20} className="text-gray-700 hover:text-red-600" />
          </button>
        </div>
      </div>

      {/* Growth Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8832c7" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          <Area
            type="monotone"
            dataKey="growth"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorGrowth)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PersonalGrowthChart;
