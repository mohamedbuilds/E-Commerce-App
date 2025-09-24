import * as React from "react";
import getSpicitifyCatgoryes from "@/api/getSpicitifyCatgorey";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default async function DetilasProduct({ params }: {params:Promise<{id: string}>}) {
  const  { id  } = await params;

  const res = await getSpicitifyCatgoryes(id);
 return (
<div className="max-w-4xl mx-auto mt-20">
  <Card className="shadow-lg rounded-2xl overflow-hidden">
    <div className="relative w-full h-[400px]">
      <Image
        src={res.image}
        alt={res.name}
        fill
        className="object-contain" // أو object-cover حسب اللي يعجبك
        priority
      />
    </div>
    <CardContent className="p-6 text-center space-y-2">
      <h2 className="text-2xl font-semibold">{res.name}</h2>
      <p className="text-sm text-gray-500">
        Created At: {new Date(res.createdAt).toLocaleDateString()}
      </p>
    </CardContent>
  </Card>
</div>


  );
}
