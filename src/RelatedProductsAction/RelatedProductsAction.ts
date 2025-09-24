"use server";

import axios, { AxiosError } from "axios";

export async function getRelatedProducts(id: string) {
  try {
    const res = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`
    );
    return res.data; // ✅ رجع البيانات بس
  } catch (error) {
                const err = error as AxiosError<{ message: string }>;

    return {
      success: false,
      message: err.response?.data?.message || "Failed to fetch products",
    };
  }
}
