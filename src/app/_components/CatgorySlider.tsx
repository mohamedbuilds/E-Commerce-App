import getAllCatgorySlider from "@/api/getAllCatgorySlider";
import React from "react";
import SwiperCatgorySlider from "./SwiperCatgorySlider";

export default async function CatgorySlider() {
  const data = await getAllCatgorySlider();
  return (
    <div className="w-full mt-8 px-4">
      <h2 className="text-xl font-semibold mb-4">Categories</h2>
      <SwiperCatgorySlider data={data} />
    </div>
  );
}
