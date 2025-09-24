"use client";
import { AppDispatch, RootState } from "@/redux/store";
import { loggedWishList } from "@/redux/wishlistSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import RemoveBtn from "@/app/RemoveBtn/RemoveBtn";
import { ProdcutType } from "../Types/ProductType";
export default function LoggedWish() {
  const [disabled, setDisabled] = useState(false);
   const [loading, setLoading] = useState(true);
  const wishlist = useSelector(
    (state: RootState) => state.wishlistSlice.wishlist as ProdcutType[]
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
  const fetchWishlist = async () => {
    await dispatch(loggedWishList());
    setLoading(false);
  };
  fetchWishlist();
  }, [dispatch]);
    if (loading) {
    return (
      <div className="flex justify-center items-center col-span-full h-48">
        <i className="fas fa-spinner fa-spin text-3xl text-gray-500"></i>
      </div>
    );
  }
  return (
    <>
      {wishlist && wishlist.length > 0 ? (
        wishlist.map((product, index) => (
          <Card
            key={product?._id || index}
            className="relative shadow-md hover:shadow-lg transition"
          >
            <CardContent>
              {product?.imageCover ? (
                <Image
                  src={product?.imageCover}
                  alt={product?.title || "Product image"}
                  width={400}
                  height={192}
                  className="w-full h-48 object-cover rounded-md"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-md">
                  <span className="text-gray-500 text-sm">No Image</span>
                </div>
              )}
              <h2 className="mt-2 font-semibold text-lg">{product?.title}</h2>
              <p className="text-foreground">{product?.price} EGP</p>
            </CardContent>
            <CardFooter className="flex justify-end">
              <RemoveBtn
                setDisabled={setDisabled}
                disabled={disabled}
                id={product?._id}
              />
            </CardFooter>
          </Card>
        ))
      ) : (
        <p className="text-foreground text-center col-span-full">
          No products in your wishlist
        </p>
      )}
    </>
  );
}
