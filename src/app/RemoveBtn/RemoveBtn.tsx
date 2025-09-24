"use client";
import { Button } from "@/components/ui/button";
import { AppDispatch, RootState } from "@/redux/store";
import { removeWishList } from "@/redux/wishlistSlice";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

interface RemoveBtnProps {
  id: string; // أو number لو الـ id رقم
  disabled: boolean;
  setDisabled: (value: boolean) => void;
}

interface RemoveWishResponse {
  status: "success" | "error";
  message: string;
}

export default function RemoveBtn({ id, disabled, setDisabled }: RemoveBtnProps) {
  const [load, setload] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const wishlist = useSelector((state: RootState) => state?.wishlistSlice?.wishlist);

  async function handleRemove(id: string) {
    try {
      setload(true);
      setDisabled(true);

      const res = await dispatch(removeWishList(id));

      // Type-safe check
      const payload = res.payload as RemoveWishResponse | undefined;
      console.log(res)
      if (payload) {
        if (payload.status === "success") {
          toast.success(payload.message);
        } else {
          toast.error(payload.message);
        }
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setload(false);
      setDisabled(false);
    }
  }

  return (
    <Button
      disabled={disabled}
      onClick={() => handleRemove(id)}
      variant="destructive"
      className="text-sm px-3 py-1 cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-200"
    >
      {load ? <i className="fas fa-spinner fa-spin"></i> : "Remove"}
    </Button>
  );
}
