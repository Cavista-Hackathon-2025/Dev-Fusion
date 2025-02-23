// import Image from 'next/image';
// import React from 'react';

// const Feeds = [
//   {
//     id: 1,
//     title: 'Post 1',
//     content: 'This is the first post.',
//     createdAt: new Date('2022-01-01'), // A valid date object
//     author: 'John Doe',
//     img: '/avatar.jpg', // Ensure this points to a valid image in the public folder
//   },
// ];

// const Latest = () => {
//   const calculateTimeAgo = (createdAt: Date) => {
//     const now = new Date();
//     const diffInMilliseconds = now.getTime() - createdAt.getTime(); // Convert to milliseconds
//     const diffInYears = diffInMilliseconds / (1000 * 60 * 60 * 24 * 365); // Convert to years
//     return Math.floor(diffInYears); // Round down to the nearest year
//   };

//   return (
//     <div>
//       {Feeds.map((item) => (
//         <div key={item.id} className="flex items-center mb-4">
//           <Image
//             src={item.img} // Use the image from the data
//             alt={`${item.author}'s Avatar`}
//             width={40}
//             height={40}
//             className="rounded-full"
//           />
//           <div className="ml-3">
//             <h3 className="font-semibold text-sm">{item.author}</h3>
//             <p className="text-xs text-gray-500">
//               posted an update • {calculateTimeAgo(item.createdAt)} year(s) ago
//             </p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Latest;
