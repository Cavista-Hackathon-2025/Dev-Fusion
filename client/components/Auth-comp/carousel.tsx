"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const slides = [
  {
    img: "/log_1.jpg",
    title: "You Are Not Alone",
    text: "No matter how difficult the journey feels, remember you are never truly alone. Together, we can face any challenge, grow stronger, and find the light in the darkest moments. There's beauty in a shared journey, and we're here to walk beside you every step of the way.",
  },
  {
    img: "/log_2.jpg",
    title: "Let's Talk, Let's Heal",
    text: "It's okay to reach out, to share, and to open up. In connecting with others, we find understanding, support, and comfort. Together, we can build a space where you feel heard, valued, and empowered. Let's start a conversation that brings healing and hope.",
  },
  {
    img: "/log_3.jpg",
    title: "Join Us and Thrive",
    text: "Life is better when shared, and amazing things happen when we come together. Let's create a community of compassion, strength, and positivity. Join us today, and let's build something truly beautiful—because together, we are unstoppable.",
  },
];

const Carousel = () => {
  return (
    <div className="relative min-h-screen  bg-gradient-to-b from-blue-600 to-blue-800 text-white flex flex-col justify-center items-center px-4 py-12 md:px-8">
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10" />
      
      <div className="relative w-full max-w-4xl mx-auto">
        <Swiper
          slidesPerView={1}
          centeredSlides
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          speed={1000}
          loop={true}
          pagination={{
            clickable: true,
            el: ".custom-pagination",
            bulletClass: "swiper-pagination-bullet bg-white/50 w-3 h-3 rounded-full mx-1 cursor-pointer transition-all duration-300",
            bulletActiveClass: "swiper-pagination-bullet-active bg-white",
          }}
          modules={[Pagination, Autoplay]}
          className="w-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col md:flex-row items-center gap-8 p-4">
                <div className="w-full md:w-1/2 relative">
                  <div className="aspect-square relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                    <Image
                      src={slide.img}
                      alt={`Slide ${index + 1}`}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                </div>
                
                <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold font-nunito bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                    {slide.title}
                  </h2>
                  <p className="text-lg text-blue-50/90 leading-relaxed font-light">
                    {slide.text}
                  </p> 
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        <div className="custom-pagination flex justify-center gap-2 mt-8" />
      </div>
    </div>
  );
};

export default Carousel;