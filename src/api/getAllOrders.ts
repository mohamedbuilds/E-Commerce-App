export default async function getAllOrder() {
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/orders/", {
    next: { revalidate: 60 },
  });
  const { data } = await response.json();
  return data;
}
