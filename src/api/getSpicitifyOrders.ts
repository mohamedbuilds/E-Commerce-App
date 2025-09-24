export default async function getSpicitifyOrders(id: string) {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
    {
      method: "GET", // هنا حددنا طريقة الطلب GET
      next: { revalidate: 60 },
    }
  );
  const  data  = await response.json();
  return data;
}
