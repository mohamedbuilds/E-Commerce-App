import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import getAllBrand from "@/api/getAllBrand";
import { Brand } from "@/Types/ProductType";
export default async function Brands() {
  const res = await getAllBrand();

  return (
    <section className="container mx-auto px-4 pt-20">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Brands</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Discover products by category
          </p>
        </div>
      </div>

      {res.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-200 p-12 text-center text-muted-foreground">
          No categories found.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {res.map((cat:Brand) => (
              <Link key={cat._id} href={`/brand/${cat?._id}`}>
                <Card      
                  className="overflow-hidden hover:shadow-xl transition-transform duration-200 hover:-translate-y-1 rounded-2xl"
                >
                  <CardHeader className="p-0">
                    <div className="relative w-full aspect-square">
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 20vw"
                      />
                    </div>
                  </CardHeader>

                  <CardContent className="p-4 text-center">
                    <h3 className="text-base font-semibold line-clamp-1">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {cat.slug}
                    </p>
                  </CardContent>
                </Card>
              </Link>
          ))}
        </div>
      )}
    </section>
  );
}
