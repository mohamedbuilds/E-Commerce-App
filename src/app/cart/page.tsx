"use client";
import {
  clearUserCart,
  loggedUserCart,
  removeUserCart,
  updateUserCart,
} from "@/redux/cartSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import toast from "react-hot-toast";
import Link from "next/link";
import imageCart from "../../../public/empty-cart-flat-illustration-concept-vector.jpg";
import { AppDispatch, RootState } from "@/redux/store";
import { Root } from "@/Types/cartType";

export default function Cart() {
  const [load, setload] = useState(false);
  const [loadClear, setloadClear] = useState(false);
  const [loadPage, setloadPage] = useState(false);
  const [loadCount, setloadCount] = useState(false);
  const [disabled, setdisabled] = useState(false);
  const [idItems, setidItems] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector(
    (state: RootState) => state?.cartSlice?.cart?.data?.products
  );
  const cartData = useSelector(
    (state: RootState) => state?.cartSlice.cart.data
  );
  async function removeCartItems(id: string) {
    try {
      setload(true);
      setdisabled(true);
      setidItems(id);
      const res = await dispatch(removeUserCart(id));
      if (res.payload.status == "success") {
        toast.success("🗑️ Item removed from cart successfully");
      } else {
        toast.error("⚠️ Failed to remove item from cart, please try again");
      }
    } catch (error) {
      setload(false);
      setdisabled(false);
    } finally {
      setload(false);
      setdisabled(false);
    }
  }

  async function updtaeCartItems(id: string, count: number) {
    try {
      setloadCount(true);
      setdisabled(true);
      setidItems(id);
      const res = await dispatch(updateUserCart({ id, count }));
      if (res.payload.status == "success") {
        toast.success(" Quantity updated successfully!");
      } else {
        toast.error("Failed to update quantity");
      }
    } catch (error) {
      setloadCount(false);
      setdisabled(false);
      console.log(error);
    } finally {
      setloadCount(false);
      setdisabled(false);
    }
  }

  async function clearCartItems() {
    try {
      setloadClear(true);
      setdisabled(true);
      const res = await dispatch(clearUserCart());
      console.log(res);
      if (res.payload.message == "success") {
        toast.success("🧹 Cart cleared successfully!");
      } else {
        toast.error("⚠️ Failed to clear cart, please try again.");
      }
    } catch (error) {
      setloadClear(false);
      setdisabled(false);
      console.log(error);
      toast.error("❌ Something went wrong while clearing the cart.");
    } finally {
      setloadClear(false);
      setdisabled(false);
    }
  }

  useEffect(() => {
    const fetchCart = async () => {
      setloadPage(true);
      await dispatch(loggedUserCart());
      setloadPage(false);
    };

    fetchCart();
  }, [dispatch]);

  // Handle the initial loading state for the entire page
  if (loadPage) {
    return (
      <div className="flex justify-center items-center h-screen">
        <i className="fas fa-spinner animate-spin text-4xl text-gray-600"></i>
        <p className="ml-2 text-lg">Loading cart...</p>
      </div>
    );
  }
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-4 text-center text-gray-800 mt-20">
        🛒 My Cart
      </h1>

      <p className="text-2xl font-bold text-green-600 text-center my-4">
        🛍️ Total: ${cartData?.totalCartPrice || 0}
      </p>

      {cart?.length > 0 ? (
        <>
          <div className="flex justify-end mb-4">
            <Button
              onClick={clearCartItems}
              size="sm"
              disabled={disabled}
              className="bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-200 cursor-pointer hover:bg-yellow-600 text-white px-4 py-2 rounded-md"
            >
              {loadClear ? (
                <>
                  <i className="fas fa-spinner animate-spin text-gray-600"></i>
                </>
              ) : (
                "Clear All Cart"
              )}
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cart?.map((item: Root) => (
              <Card
                key={item._id}
                className="flex flex-col justify-between shadow-lg border border-gray-200 hover:shadow-xl transition-all"
              >
                <div className="w-full overflow-hidden rounded-lg relative">
                  <Image
                    src={item.product.imageCover || "/placeholder.png"}
                    alt={item.product.title}
                    width={400}
                    height={300}
                    className="object-cover rounded-lg"
                  />
                </div>

                <CardContent className="pt-4 flex flex-col gap-2">
                  <h2 className="text-lg font-semibold text-center text-gray-900">
                    {item.product.title.split(" ").slice(0, 8).join(" ")}
                  </h2>
                  <p className="text-sm text-gray-500 text-center">
                    {item.product.brand.name}
                  </p>

                  <div className="flex items-center justify-center gap-4 mt-2">
                    <Button
                      onClick={() =>
                        updtaeCartItems(item.product._id, item.count - 1)
                      }
                      size="sm"
                      disabled={disabled}
                      className="px-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-200  py-1 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 cursor-pointer"
                    >
                      -
                    </Button>

                    <span className="font-medium text-gray-800">
                      {loadCount && idItems === item.product._id ? (
                        <i className="fas fa-spinner animate-spin text-gray-600"></i>
                      ) : (
                        item.count
                      )}
                    </span>

                    <Button
                      onClick={() =>
                        updtaeCartItems(item.product._id, item.count + 1)
                      }
                      size="sm"
                      disabled={disabled}
                      className="px-3 py-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-200 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 cursor-pointer"
                    >
                      +
                    </Button>
                  </div>

                  <p className="mt-2 text-center font-bold text-lg text-gray-900">
                    ${item.price}
                  </p>
                </CardContent>

                <CardFooter className="pt-0">
                  <Button
                  disabled={disabled}
                    onClick={() => removeCartItems(item.product._id)}
                    className="w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-200 bg-red-500 hover:bg-red-600 text-white cursor-pointer"
                  >
                    {load && idItems === item.product._id ? (
                      <i className="fas fa-spinner animate-spin text-white"></i>
                    ) : (
                      "Remove"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <Card className="flex flex-col items-center justify-center p-10 shadow-lg bg-white">
          <Image src={imageCart} alt="Empty Cart" width={550} height={150} />
          <CardContent className="text-center mt-4">
            <h2 className="text-3xl font-semibold text-gray-800">
              Your cart is empty 🛒
            </h2>
            <p className="text-gray-500 mt-2">
              Looks like you haven’t added anything yet. Start shopping and fill
              your cart!
            </p>
            <Link
              href="/"
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg inline-block"
            >
              Continue Shopping
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
