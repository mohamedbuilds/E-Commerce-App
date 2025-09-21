"use server";

import axios from "axios";

export async function getRelatedProducts(id: string) {
  try {
    const res = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`
    );
    return res.data; // ✅ رجع البيانات بس
  } catch (error) {
    console.error("Error fetching related products:", error.message);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch products",
    };
  }
}
