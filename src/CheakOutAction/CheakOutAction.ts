"use server";

import getMyToken from "@/utilities/getMyToken";
import axios, { AxiosError } from "axios";


interface CheckoutFormValues {
  details: string;
  phone: string;
  city: string;
}

export async function CheakOutSession(
  id: string,
  url = process.env.NEXTAUTH_URL,
  formValues: CheckoutFormValues
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
  } catch (error) {
   const err = error as AxiosError<{ message: string }>;
    return {
      success: false,
      message: err.response?.data?.message || err.message,
    };
  }
}
