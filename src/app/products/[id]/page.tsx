import * as React from "react";
import { Button } from "@/components/ui/button";
import CarsoulProduct from "@/app/carsoulDetialsProsucts/page";
import getSpicitifyProducts from "../../../api/getSpicitifyProducts";
import AddBtn from "@/app/AddBtn/AddBtn";

export default async function DetilasProduct({ params }: {params:{id: string}}) {
  const  { id  } = await params;

 const data =  await getSpicitifyProducts(id);

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 py-16">
        {/* Left: Carousel */}
        <div>
          <CarsoulProduct dataDetials={data} />
        </div>
        {/* Right: Product Details */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-indigo-600 text-2xl font-bold">
                {data.price} EGP
              </span>
              {data.priceAfterDiscount && (
                <span className="text-gray-400 line-through">
                  {data.priceAfterDiscount} EGP
                </span>
              )}
              <span className="ml-auto text-yellow-500 font-semibold">
                ⭐ {data.ratingsAverage} ({data.ratingsQuantity})
              </span>
            </div>

            <p className="text-gray-600 mb-4 whitespace-pre-line">
              {data.description}
            </p>

            <div className="flex gap-4 mb-4">
              <span className="text-sm text-gray-500">
                Brand: <strong>{data.brand?.name}</strong>
              </span>
              <span className="text-sm text-gray-500">
                Category: <strong>{data.category?.name}</strong>
              </span>
            </div>
          </div>

          <AddBtn id={data.id}/>
        </div>
      </div>
    </div>
  );
}
