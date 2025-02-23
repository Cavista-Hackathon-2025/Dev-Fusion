// components/EmotionalHealingOverview.tsx

"use client"
import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Monday', positive: 30, negative: 10 },
  { name: 'Tuesday', positive: 20, negative: 15 },
  { name: 'Wednesday', positive: 27, negative: 5 },
  { name: 'Thursday', positive: 50, negative: 20 },
  { name: 'Friday', positive: 40, negative: 30 },
  { name: 'Saturday', positive: 60, negative: 25 },
  { name: 'Sunday', positive: 70, negative: 35 },
];

const Card: React.FC<{ title: string; children: React.ReactNode; onClose: () => void; onFullscreen: () => void }> = ({ title, children, onClose, onFullscreen }) => (
  <div className="bg-white shadow-md rounded-lg mb-4">
    <div className="border-b p-4 flex justify-between items-center">
      <h4 className="text-lg font-semibold">{title}</h4>
      <ul className="flex space-x-4">
        <li>
          <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>Close</button>
        </li>
        <li>
          <button className="text-gray-500 hover:text-gray-700">Slide</button>
        </li>
        <li>
          <button className="text-gray-500 hover:text-gray-700" onClick={onFullscreen}>Fullscreen</button>
        </li>
      </ul>
    </div>
    <div className="p-4">{children}</div>
  </div>
);

const EmotionalHealingOverview: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsClient(true); // Set to true when component mounts
  }, []);

  const handleClose = () => {
    setIsVisible(false); // Hide the card when close is clicked
  };

  const handleFullscreen = () => {
    const cardElement = document.getElementById('emotional-healing-card');
    if (cardElement) {
      if (!isFullscreen) {
        cardElement.requestFullscreen(); // Request fullscreen
        setIsFullscreen(true);
      } else {
        document.exitFullscreen(); // Exit fullscreen
        setIsFullscreen(false);
      }
    }
  };

  if (!isVisible) return null; // Do not render if closed

  return (
    <div className="p-4">
      <Card title="Daily Emotional Healing Overview" onClose={handleClose} onFullscreen={handleFullscreen}>
        <ul className="flex justify-end space-x-4 mb-4">
          <li className="flex items-center">
            <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
            Positive Sessions
          </li>
          <li className="flex items-center">
            <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
            Negative Sessions
          </li>
        </ul>
        {isClient && ( // Render chart only on the client side
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} id="emotional-healing-card">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="positive" fill="#82ca9d" />
              <Bar dataKey="negative" fill="#ff4c4c" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </Card>
    </div>
  );
};

export default EmotionalHealingOverview;