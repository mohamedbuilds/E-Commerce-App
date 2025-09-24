'use client';
import AddBtnWishList from '@/AddBtnWishList/AddBtnWishList';
import AddBtn from '@/app/AddBtn/AddBtn';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ProdcutType } from '@/Types/ProductType';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface RelatedProductsShowProps {
  data: {
    data: ProdcutType[];
  };
}

export default function RelatedProductsShow({ data }: RelatedProductsShowProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <h2 className="text-3xl font-bold text-foreground mb-10 text-center">
        Related Product
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data?.data?.map((product: ProdcutType) => (
          <Card
            key={product.id}
            className="hover:shadow-xl transition rounded-2xl overflow-hidden"
          >
            {/* Product Image */}
            <div className="relative h-60 overflow-hidden">
              <Link href={`/products/${product.id}`} className="block w-full h-full">
                <Image
                  src={product.imageCover || "/placeholder.png"}  
                  alt={product.title}
                  fill
                  className="object-cover hover:scale-105 transition"
                />
              </Link>

              {/* زر الإضافة للمفضلة فوق الصورة */}
              <AddBtnWishList idProducts={product.id} />
            </div>

            <CardHeader>
              <Link href={`/products/${product.id}`} className="block">
                <CardTitle className="text-lg line-clamp-1">
                  {product.title}
                </CardTitle>
              </Link>
              <CardDescription className="line-clamp-2 text-sm text-foreground">
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

            <CardFooter className="flex items-center justify-between text-sm text-foreground mb-2">
              <span>{product.brand?.name}</span>
              <span>{product.category?.name}</span>
            </CardFooter>

            <div className="px-4 pb-4">
              <AddBtn id={product._id} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
