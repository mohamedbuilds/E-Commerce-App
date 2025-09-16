import MainSlider from "./_components/MainSlider";
import CatgorySlider from "./_components/CatgorySlider";
import Products from "./products/page";
export default async function Home() {
  return (
    <>
      <MainSlider />
      <CatgorySlider />
      <Products/>
    </>
  );
}
