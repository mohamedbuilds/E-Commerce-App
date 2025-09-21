"use server";

import getMyToken from "@/utilities/getMyToken";
import axios from "axios";

export async function CheakOutSession(
  id: string,
  url = process.env.NEXTAUTH_URL,
  formValues
) {
  const token = await getMyToken();
  try {
    const response = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=${url}`,
      {
        shippingAddress: formValues,
      },
      {
        headers: { token },
      }
    );
    return response.data;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
}
