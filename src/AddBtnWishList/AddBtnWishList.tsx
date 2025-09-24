"use client";
import { AppDispatch, RootState } from "@/redux/store";
import { addWishList } from "@/redux/wishlistSlice";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

interface AddWishResponse {
  status: "success" | "error";
  message: string;
}

export default function AddBtnWishList({ idProducts }: { idProducts: string }) {
  const [activeColorWish, setactiveColorWish] = useState("white");
  const wishlist = useSelector((state: RootState) => state.wishlistSlice.wishlist);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setactiveColorWish(localStorage.getItem(`wish-${idProducts}`) || "white");
  }, [idProducts, wishlist]);

  const handleClick = async (idProducts: string) => {
    try {
      const res = await dispatch(addWishList(idProducts));

      // Type-safe check
      const payload = res.payload as AddWishResponse | undefined;

      if (payload) {
        if (payload.status === "success") {
          toast.success(payload.message);
          localStorage.setItem(`wish-${idProducts}`, "red");
          setactiveColorWish("red");
        } else {
          toast.error(payload.message);
          localStorage.setItem(`wish-${idProducts}`, "white");
          setactiveColorWish("white");
        }
      } else {
        toast.error("Something went wrong");
        localStorage.setItem(`wish-${idProducts}`, "white");
        setactiveColorWish("white");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <button
        onClick={() => handleClick(idProducts)}
        className="absolute top-3 right-3 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition"
      >
        <i
          className={`fa-regular fa-heart transition 
            ${activeColorWish === "red" ? "text-red-500" : "text-gray-700"}`}
        ></i>
      </button>
    </div>
  );
}
