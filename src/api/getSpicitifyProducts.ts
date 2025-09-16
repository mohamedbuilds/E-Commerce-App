export default async function getSpicitifyProducts(id) {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${id}`,
    {
      next: { revalidate: 60 },
    }
  );
  const { data } = await response.json();
  return data;
}
