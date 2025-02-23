"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

const slides = [
  {
    img: "/log_1.jpg",
    title: "You Are Not Alone",
    text: "No matter how difficult the journey feels, remember you are never truly alone. Together, we can face any challenge, grow stronger, and find the light in the darkest moments. There’s beauty in a shared journey, and we’re here to walk beside you every step of the way.",
  },
  {
    img: "/log_2.jpg",
    title: "Let’s Talk, Let’s Heal",
    text: "It’s okay to reach out, to share, and to open up. In connecting with others, we find understanding, support, and comfort. Together, we can build a space where you feel heard, valued, and empowered. Let’s start a conversation that brings healing and hope.",
  },
  {
    img: "/log_3.jpg",
    title: "Join Us and Thrive",
    text: "Life is better when shared, and amazing things happen when we come together. Let’s create a community of compassion, strength, and positivity. Join us today, and let’s build something truly beautiful—because together, we are unstoppable.",
  },
];


const Carousel: React.FC = () => {
  return (
    <div className="flex-1 bg-blue-600 text-white flex flex-col justify-center items-center p-8">
      <Swiper
        slidesPerView={1}
        centeredSlides
        autoplay={{ delay: 5000 }}
        spaceBetween={30}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
        }}
        modules={[Pagination, Autoplay]}
        className="w-full max-w-lg"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="text-center">
              <Image
                src={slide.img}
                alt={`Slide ${index + 1}`}
                className="rounded-lg mx-auto mb-4"
                style={{ maxWidth: "350px", width: "100%" }}
                width={450}
                height={450}
              />
              <h1 className="text-xl font-bold font-nunito mb-2">{slide.title}</h1>
              <p className="text-sm font-medium">{slide.text}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="custom-pagination mt-4"></div>
    </div>
  );
};

export default Carousel;
