"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";

export default function CarsoulProduct({ dataDetials }) {
  const plugin = React.useRef(
    Autoplay({ delay: 1500, stopOnInteraction: true })
  );
  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-xs"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {dataDetials.images.map((el, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Image
                src={el}
                alt={`product-${index}`}
                width={400}
                height={400}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
