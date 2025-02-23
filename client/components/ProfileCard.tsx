"use client";
import React, { useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FeedModal from "./FeedModal"; // Adjust path as needed

// Define types for media and profile
export interface Media {
  type: "video" | "image";
  src: string;
}

export interface Profile {
  name: string;
  imageSrc: string;
  avatarSrc: string;
  media: Media[];
}

// Sample profiles array
const profiles: Profile[] = [
  { 
    name: "Felix Deo", 
    imageSrc: "/short.webp", 
    avatarSrc: "/avatar2.jpg", 
    media: [
      { type: "video", src: "/sample-video.mp4" }, 
      { type: "image", src: "/short.webp" }
    ]
  },
  { 
    name: "Jenny Wilson", 
    imageSrc: "/sl.webp", 
    avatarSrc: "/siux.jpg",
    media: [
      { type: "image", src: "/sl.webp" }, 
      { type: "video", src: "/sample-video.mp4" }
    ]
  },
  { 
    name: "Robert Fox", 
    imageSrc: "/hil.webp", 
    avatarSrc: "/sn.jpg",
    media: [{ type: "image", src: "/hil.webp" }]
  },
  { 
    name: "Leslie Alexander", 
    imageSrc: "/3.webp", 
    avatarSrc: "/khc.jpg",
    media: [{ type: "image", src: "/3.webp" }]
  },
  { 
    name: "Aaron Jones", 
    imageSrc: "/4.jpg", 
    avatarSrc: "/gh.jpg",
    media: [{ type: "image", src: "/4.jpg" }]
  },
  { 
    name: "Michael Smith", 
    imageSrc: "/8-2.jpg", 
    avatarSrc: "/js.png",
    media: [
      { type: "video", src: "/sample-video.mp4" }, 
      { type: "image", src: "/8-2.jpg" }
    ]
  },
  { 
    name: "David Lee", 
    imageSrc: "/04.webp", 
    avatarSrc: "/khc.jpg",
    media: [{ type: "image", src: "/04.webp" }]
  },
  { 
    name: "Chris Brown", 
    imageSrc: "/3.jpg", 
    avatarSrc: "/siux.jpg",
    media: [{ type: "image", src: "/3.jpg" }]
  },
  { 
    name: "James Carter", 
    imageSrc: "/04f52dbe5743ba7c5424f6d504ac8b09_3.jpg-1.webp", 
    avatarSrc: "/dm.jpg",
    media: [{ type: "image", src: "/04f52dbe5743ba7c5424f6d504ac8b09_3.jpg-1.webp" }]
  },
  { 
    name: "Daniel White", 
    imageSrc: "/5.jpg", 
    avatarSrc: "/gh.jpg",
    media: [{ type: "image", src: "/5.jpg" }]
  },
  { 
    name: "Oliver Green", 
    imageSrc: "/post1.webp", 
    avatarSrc: "/js.png",
    media: [{ type: "image", src: "/post1.webp" }]
  },
  { 
    name: "Lucas King", 
    imageSrc: "/zxh.webp", 
    avatarSrc: "/avatar.jpg",
    media: [
      { type: "video", src: "/sample-video.mp4" }, 
      { type: "image", src: "/zxh.webp" }
    ]
  },
];

const Responsive: React.FC = () => {
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [initialMediaIndex, setInitialMediaIndex] = useState(0);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const openProfile = (profile: Profile, mediaIndex = 0) => {
    setSelectedProfile(profile);
    setInitialMediaIndex(mediaIndex);
  };

  const closeModal = () => {
    setSelectedProfile(null);
  };

  return (
    <div className="slider-container p-8 bg-gray-100">
      <Slider {...settings}>
        {profiles.map((profile, index) => (
          <div
            key={index}
            className="flex flex-col items-center space-y-4 px-2 cursor-pointer"
            onClick={() => openProfile(profile)}
          >
            {/* Main Image */}
            <div className="relative w-full h-[12rem]">
              <Image
                src={profile.imageSrc}
                alt={profile.name}
                layout="fill"
                className="object-cover rounded-md shadow-lg"
              />
              {/* Avatar Overlapping the Image */}
              <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 w-16 h-16">
                <Image
                  src={profile.avatarSrc}
                  alt={`${profile.name}'s avatar`}
                  layout="fill"
                  className="rounded-full border-4 border-white shadow-md"
                />
              </div>
            </div>
            <p className="text-center text-lg font-medium">{profile.name}</p>
          </div>
        ))}
      </Slider>
      {selectedProfile && (
        <FeedModal
          profile={selectedProfile}
          initialMediaIndex={initialMediaIndex}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Responsive;
