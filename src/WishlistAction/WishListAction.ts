"use server";
import axios, { AxiosError } from "axios";
import getMyToken from "@/utilities/getMyToken";

export async function WishListAction(productId: string) {
  const token = await getMyToken(); // التوكن بيكون server-side
  if (!token) {
    return { success: false, message: "You are not logged in" };
  }
  try {
    const response = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      { productId },
      {
        headers: { token },
      }
    );

    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;

    return {
      success: false,
      message: err.response?.data?.message || err.message,
    };
  }
}

export async function WishListActionRemove(productId: string) {
  const token = await getMyToken(); // التوكن بيكون server-side
  if (!token) {
    return { success: false, message: "You are not logged in" };
  }
  try {
    const response = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      {
        headers: { token },
      }
    );

    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;

    return {
      success: false,
      message: err.response?.data?.message || err.message,
    };
  }
}
