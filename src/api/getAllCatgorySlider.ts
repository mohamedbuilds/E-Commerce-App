export default async function getAllCatgorySlider() {
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/categories", {
    next: { revalidate: 60 },
  });
  const { data } = await response.json();
  return data;
}
