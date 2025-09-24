import getMyToken from "@/utilities/getMyToken";

export default async function getAllWishList() {
  const token = await getMyToken();

  if (!token) {
    throw new Error("You are not logged in");
  }

  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/wishlist",
    {
      method: "GET", // هنا GET لأنه جلب بيانات
      headers: {
        token,
      },
      next: { revalidate: 60 },
    }
  );

  const { data } = await response.json();
  return data;
}
