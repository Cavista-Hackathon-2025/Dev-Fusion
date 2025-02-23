import React from "react";
import Image from "next/image";

const groups = [
  {
    id: 1,
    name: "Game Of Phones",
    posts: 0,
    members: 8,
    groupImage: "/gn.jpg",
    memberImages: ["/2.jpg", "/1659591625-bpfull.png", "/avatar2.jpg"],
  },
  {
    id: 2,
    name: "Ultimate Nerds",
    posts: 0,
    members: 10,
    groupImage: "/group 4.jpg",
    memberImages: ["/dm.jpg", "/gm.jpg", "/gh.jpg"],
  },
  {
    id: 3,
    name: "Code Warriors",
    posts: 2,
    members: 12,
    groupImage: "/group 2.jpg",
    memberImages: ["/khc.jpg", "/km.png", "/sn.jpg"],
  },
  {
    id: 4,
    name: "Tech Titans",
    posts: 5,
    members: 20,
    groupImage: "/group1.jpg",
    memberImages: ["/siux.jpg", "/sn.jpg", "/gh.jpg"],
  },
];

const CommunityList: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 sm:mb-0">All Groups</h1>
        <div className="flex flex-wrap gap-4 items-center">
          <button className="bg-blue-500 text-white px-4 py-2 rounded transition hover:bg-blue-600">
            My Groups
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded transition hover:bg-blue-600">
            Create a Group
          </button>
          <select
            className="border px-4 py-2 rounded transition focus:ring focus:ring-blue-300"
            defaultValue="Last Active"
          >
            <option value="Last Active">Last Active</option>
            <option value="Most Members">Most Members</option>
          </select>
        </div>
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <div key={group.id} className="bg-white w-full rounded-lg shadow p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <Image
                src={group.groupImage}
                alt={group.name}
                width={64}
                height={64}
                className="rounded-full"
              />
              <div className="ml-4 flex-1">
                <h2 className="font-bold text-lg truncate">{group.name}</h2>
                <p className="text-sm text-gray-600">{group.posts} Posts</p>
                <p className="text-sm text-gray-600">Members: {group.members}</p>
              </div>
            </div>
            <div className="flex mt-4 gap-2 items-center">
              <div className="flex -space-x-4">
                {group.memberImages.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`Member ${index + 1}`}
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-white"
                  />
                ))}
                <div className="w-10 h-10 flex items-center justify-center bg-gray-300 rounded-full text-sm">
                  +
                </div>
              </div>
              <button className="ml-auto bg-blue-500 text-white px-4 py-2 rounded transition hover:bg-blue-600">
                Join Group
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityList;
