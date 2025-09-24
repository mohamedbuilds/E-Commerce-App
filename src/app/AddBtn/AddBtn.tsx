"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cartSlice";
import toast from "react-hot-toast";
import { AppDispatch } from "@/redux/store";

export default function AddBtn({ id }: { id: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false);
  const addcart = async () => {
    try {
      setIsLoading(true);
      const res = await dispatch(addToCart(id)).unwrap();
      if (res.status === "success") {
        toast.success("Product added to cart!");
      } else {
        toast.error(res.message || "Failed to add product");
      }
    } catch (err) {
      setIsLoading(false);
      const errorMessage = err instanceof Error ? err.message : "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
<Button onClick={addcart} className="w-full cursor-pointer">
   {isLoading ? ( <i className="fas fa-spinner animate-spin text-white dark:text-black"></i> )
    : ( "Add To Cart" )} 
    </Button>
  );
}
