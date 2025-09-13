export default async function getSpicitifyProducts(id) {
  let response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${id}`,
    {
      next: { revalidate: 60 },
    }
  );
  let { data } = await response.json();
  return data;
}
