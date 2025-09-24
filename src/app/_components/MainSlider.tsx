"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import required modules
import { Autoplay } from "swiper/modules";

import ImageOne from "../../../public/slider-image-3.jpeg";
import ImageTwo from "../../../public/slider-image-2.jpeg";
import ImageThree from "../../../public/slider-image-1.jpeg";

export default function MainSlider() {
 return (
  <div className="flex flex-col md:flex-row w-full h-[400px] mt-[64px] gap-4">
    {/* الجزء اليمين */}
    <div className="md:w-[70%] w-full relative h-[250px] md:h-full">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop
        className="h-full w-full"
      >
        <SwiperSlide className="relative h-full">
          <Image src={ImageOne} alt="صورة رئيسية" fill className="object-cover" />
        </SwiperSlide>
        <SwiperSlide className="relative h-full">
          <Image src={ImageTwo} alt="صورة جانبية 1" fill className="object-cover" />
        </SwiperSlide>
        <SwiperSlide className="relative h-full">
          <Image src={ImageThree} alt="صورة جانبية 2" fill className="object-cover" />
        </SwiperSlide>
      </Swiper>
    </div>

    {/* الجزء الشمال */}
    <div className="md:w-[30%] w-full flex flex-row md:flex-col gap-4 md:gap-0 h-[150px] md:h-full">
      <div className="relative flex-1">
        <Image src={ImageTwo} alt="صورة جانبية 1" fill className="object-cover" />
      </div>
      <div className="relative flex-1">
        <Image src={ImageThree} alt="صورة جانبية 2" fill className="object-cover" />
      </div>
    </div>
  </div>
);
}
