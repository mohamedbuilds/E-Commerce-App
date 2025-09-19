"use server";
import axios from "axios";
import getMyToken from "@/utilities/getMyToken";

export async function addToCartServer(productId: string) {
  const token = await getMyToken(); // التوكن بيكون server-side
      if (!token) {
      return { success: false, message: "You are not logged in" };
    }
  try {
    const response = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      { productId },
      {
        headers: { token },
      }
    );

    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
}

export async function loggedCartServer() {
  const token = await getMyToken(); // التوكن بيكون server-side
  const response = await axios.get(
    "https://ecommerce.routemisr.com/api/v1/cart",
    {
      headers: { token },
    }
  );

  return response.data;
}

export async function removeCartServer(id: string) {
  const token = await getMyToken(); // التوكن بيكون server-side
  const response = await axios.delete(
    `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
    {
      headers: { token },
    }
  );

  return response.data;
}

export async function updateCartServer(id: string, count: string) {
  const token = await getMyToken();
  const response = await axios.put(
    `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
    { count },
    {
      headers: { token },
    }
  );

  return response.data;
}

export async function clearCartServer() {
  const token = await getMyToken();
  const response = await axios.delete(
    `https://ecommerce.routemisr.com/api/v1/cart`,
    {
      headers: { token },
    }
  );

  return response.data;
}
