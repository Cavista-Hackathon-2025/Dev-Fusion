"use client"
import React from 'react';
import Image from 'next/image';

interface Activity {
  id: number;
  name: string;
  action: string;
  group?: string;
  time: string;
  avatar: string; // Path to the avatar image
}

const activities: Activity[] = [
  {
    id: 1,
    name: "Marvin McKinney",
    action: "joined the group",
    group: "Ultimate Nerds",
    time: "7 hours ago",
    avatar: "/avatar.jpg", // Ensure these paths are correct
  },
  {
    id: 2,
    name: "Jenny Wilson",
    action: "joined the group",
    group: "Ultimate Nerds",
    time: "8 hours ago",
    avatar: "/avatar.jpg",
  },
  {
    id: 3,
    name: "Jenny Wilson",
    action: "posted an update",
    time: "a year ago",
    avatar: "/avatar2.jpg",
  },
  {
    id: 4,
    name: "Aaron Jones",
    action: "posted an update",
    time: "a year ago",
    avatar: "/avatar2.jpg",
  },
  {
    id: 5,
    name: "Jenny Wilson",
    action: "posted an update",
    time: "a year ago",
    avatar:"/avatar2.jpg",
  },
];

const LatestActivities: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-md shadow-md max-w-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Latest Activities</h2>
      <ul className="space-y-4">
        {activities.map((activity) => (
          <li key={activity.id} className="flex items-center">
            <div className="relative w-12 h-12 rounded-full border border-gray-300 overflow-hidden">
              <Image
                src={activity.avatar}
                alt={activity.name}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-700">
                <span className="font-medium text-gray-900">{activity.name}</span> {activity.action}{" "}
                {activity.group && (
                  <span className="font-medium text-blue-600">{activity.group}</span>
                )}
              </p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LatestActivities;
