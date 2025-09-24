export default async function getSpicitifyCatgoryes(id: string) {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/categories/${id}`,
    {
      next: { revalidate: 60 },
    }
  );
  const { data } = await response.json();
  return data;
}
