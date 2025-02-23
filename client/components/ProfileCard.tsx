"use client"
import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const profiles = [
  { name: "Felix Deo", imageSrc: "/short.webp", avatarSrc: "/avatar2.jpg" },
  { name: "Jenny Wilson", imageSrc: "/sl.webp", avatarSrc: "/siux.jpg" },
  { name: "Robert Fox", imageSrc: "/hil.webp", avatarSrc: "/sn.jpg" },
  { name: "Leslie Alexander", imageSrc: "/3.webp", avatarSrc: "/khc.jpg" },
  { name: "Aaron Jones", imageSrc: "/4.jpg", avatarSrc: "/gh.jpg" },
  { name: "Michael Smith", imageSrc: "/8-2.jpg", avatarSrc: "/js.png" },
  { name: "David Lee", imageSrc: "/04.webp", avatarSrc: "/khc.jpg" },
  { name: "Chris Brown", imageSrc: "/3.jpg", avatarSrc: "/siux.jpg" },
  { name: "James Carter", imageSrc: "/04f52dbe5743ba7c5424f6d504ac8b09_3.jpg-1.webp", avatarSrc: "/dm.jpg" },
  { name: "Daniel White", imageSrc: "/5.jpg", avatarSrc: "/gh.jpg" },
  { name: "Oliver Green", imageSrc: "/post1.webp", avatarSrc: "/js.png" },
  { name: "Lucas King", imageSrc: "/zxh.webp", avatarSrc: "/avatar.jpg" },
];


function Responsive() {
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

  return (
    <div className="slider-container p-8 bg-gray-100">
      <Slider {...settings}>
        {profiles.map((profile, index) => (
          <div
            key={index}
            className="flex flex-col items-center space-y-4 px-2" // Added spacing with px-2
          >
            {/* Main Image */}
            <div className="relative w-full h-[12rem]">
              <Image
                src={profile.imageSrc}
                alt={profile.name}
                layout="fill"
                className="object-cover rounded-md shadow-lg"
              />
              {/* Avatar Positioned Over the Image */}
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
    </div>
  );
}

export default Responsive;
