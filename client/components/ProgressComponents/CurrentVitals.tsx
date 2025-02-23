import React from 'react';
import { Smile, Activity, HeartPulse, Moon, Dumbbell, Heart } from 'lucide-react';

const EmotionalHealthTracker = () => {
  const stats = [
    { label: 'Happiness', value: '85%', icon: <Smile className="text-yellow-500 w-6 h-6" /> },
    { label: 'Stress', value: '30%', icon: <Activity className="text-red-500 w-6 h-6" /> },
    { label: 'Calmness', value: '70%', icon: <HeartPulse className="text-blue-500 w-6 h-6" /> },
  ];

  const details = [
    { label: 'Sleep Hours', value: '7 hrs', icon: <Moon className="text-gray-700 w-6 h-6" /> },
    { label: 'Exercise Time', value: '45 mins', icon: <Dumbbell className="text-green-500 w-6 h-6" /> },
    { label: 'Meditation', value: '20 mins', icon: <Heart className="text-purple-500 w-6 h-6" /> },
  ];

  return (
    <div className="max-w-md mx-auto bg-white shadow rounded-lg overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b">
        <h4 className="text-lg font-semibold">Emotional Health Tracker</h4>
        <input
          type="text"
          placeholder="Enter your ID"
          className="px-3 py-2 text-sm border rounded shadow focus:outline-none"
        />
      </div>
      <div className="p-4 space-y-4">
        <div className="flex justify-around">
          {stats.map(({ label, value, icon }) => (
            <div key={label} className="text-center">
              <div className="mb-2">{icon}</div>
              <h4 className="text-black font-semibold">{value}</h4>
              <p className="text-gray-500 text-sm">{label}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4">
          {details.map(({ label, value, icon }) => (
            <div key={label} className="text-center">
              <div className="mb-2">{icon}</div>
              <h5 className="text-black font-bold">{value}</h5>
              <p className="text-gray-500 text-sm">{label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 bg-gray-50 text-sm text-gray-500 border-t">
        Last Updated: 03/12/2024
      </div>
      <div className="p-4 bg-blue-100 flex items-center">
        <Heart className="text-blue-700 w-6 h-6 mr-3" />
        <p className="text-blue-700">Reminder: Take 15 mins today for self-care!</p>
      </div>
    </div>
  );
};

export default EmotionalHealthTracker;
