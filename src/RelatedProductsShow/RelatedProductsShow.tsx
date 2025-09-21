'use client'
import AddBtn from '@/app/AddBtn/AddBtn';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ProdcutType } from '@/Types/ProductType';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'


export default function RelatedProductsShow({data}) {
  console.log(data.data)
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
        Related Product
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data?.data?.map((product: ProdcutType) => (
          <Card
            key={product.id}
            className="hover:shadow-xl transition rounded-2xl overflow-hidden"
          >
            {/* Product Image */}
            <Link
              href={`/products/${product.id}`}
              className="block relative h-60 overflow-hidden"
            >
              <Image
                src={product.imageCover}
                alt={product.title}
                fill
                className="object-cover hover:scale-105 transition"
              />
            </Link>

            <CardHeader>
              <Link href={`/products/${product.id}`} className="block">
                <CardTitle className="text-lg line-clamp-1">
                  {product.title}
                </CardTitle>
              </Link>
              <CardDescription className="line-clamp-2 text-sm text-gray-500">
                {product.description}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="flex items-center justify-between mb-3">
                <div>
                  {product.priceAfterDiscount ? (
                    <>
                      <span className="text-lg font-bold text-indigo-600 mr-2">
                        {product.priceAfterDiscount} EGP
                      </span>
                      <span className="text-sm line-through text-gray-400">
                        {product.price} EGP
                      </span>
                    </>
                  ) : (
                    <span className="text-lg font-bold text-indigo-600">
                      {product.price} EGP
                    </span>
                  )}
                </div>
                <span className="text-yellow-500 font-medium">
                  ⭐ {product.ratingsAverage}
                </span>
              </div>
            </CardContent>

            <CardFooter className="flex items-center justify-between text-sm text-gray-500 mb-2">
              <span>{product.brand?.name}</span>
              <span>{product.category?.name}</span>
            </CardFooter>

            <div className="px-4 pb-4">
              <AddBtn id={product?._id}/>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
