"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { Autoplay } from "swiper/modules"; // استدعاء الموديولات
import { CatgoryType } from "@/Types/CatgoreyType";

// Import required modules
export default function swiperCatgorySlider({ data }: {data: CatgoryType[]}) {
  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      spaceBetween={15} // مسافة أكبر بين العناصر
      slidesPerView={5}
      breakpoints={{
        320: { slidesPerView: 2, spaceBetween: 10 },
        640: { slidesPerView: 3, spaceBetween: 15 },
        1024: { slidesPerView: 5, spaceBetween: 20 },
      }}
      className="w-full py-4" // padding عمودي
    >
      {data?.map((cat) => (
        <SwiperSlide key={cat._id}>
          <div className="flex flex-col items-center bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition-all duration-300">
            <div className="relative w-28 h-28 mb-3">
              {/* أكبر شوية الصور */}
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-contain rounded-lg"
              />
            </div>
            <p className="text-sm font-semibold text-center text-gray-800 truncate">
              {cat.name}
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
