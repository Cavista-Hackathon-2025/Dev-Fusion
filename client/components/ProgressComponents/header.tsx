// components/EmotionalHealthDashboard.tsx
import React from 'react';
import { Heart, MessageCircle, Calendar, Smile } from 'lucide-react';

const infoBoxes = [
  { count: '4,569', label: 'Support Sessions', icon: <Heart className="h-6 w-6" />, bg: 'bg-blue-500' },
  { count: '23,009', label: 'Messages Sent', icon: <MessageCircle className="h-6 w-6" />, bg: 'bg-yellow-500' },
  { count: '56', label: 'Appointments', icon: <Calendar className="h-6 w-6" />, bg: 'bg-teal-500' },
  { count: '12,100', label: 'Mood Logs', icon: <Smile className="h-6 w-6" />, bg: 'bg-green-500' },
];

const Head = () => {
  return (
    <section className="content p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {infoBoxes.map((box, index) => (
          <div
            key={index}
            className="info-box bg-gray-50 p-4 rounded-lg shadow flex items-center hover:shadow-lg transition-shadow"
          >
            <div
              className={`info-box-icon ${box.bg} text-white rounded-full h-12 w-12 flex items-center justify-center`}
            >
              {box.icon}
            </div>
            <div className="info-box-content ml-4">
              <span className="info-box-number text-2xl font-semibold">{box.count}</span>
              <span className="info-box-text text-gray-600">{box.label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Head;
