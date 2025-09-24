export default async function getAllBrand() {
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/brands", {
    next: { revalidate: 60 },
  });
  const { data } = await response.json();
  return data;
}
