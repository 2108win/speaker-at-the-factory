"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Product } from "@/interfaces/product";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { type CarouselApi } from "@/components/ui/carousel";

type Props = {
  product: Product;
  className?: string;
};

function ProductImage({ product, className }: Props) {
  const [currentImage, setCurrentImage] = useState(0);
  const [api, setApi] = React.useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      return;
    }
    api.scrollTo(currentImage);
  }, [api, currentImage]);

  return (
    <div className={`flex flex-col gap-2 transition-all duration-300 ${className}`}>
      {/* <Image
        src={product.images[currentImage] || "/og-image.jpg"}
        alt={product.productName || "Product Loa Tại Xưởng"}
        width={1000}
        height={1000}
        className="rounded-lg h-auto w-full object-contain shadow-lg border transition-all duration-300"
      /> */}
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
        }}
      >
        <CarouselContent>
          {product.images.map((image: string, index: number) => (
            <CarouselItem key={index}>
              <Image
                src={image}
                alt={product.productName + " - " + index}
                width={1000}
                height={1000}
                className="rounded-lg h-auto w-full object-contain shadow-lg border transition-all duration-300"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          className={cn("left-2 hover:scale-110", product.images.length < 2 && "hidden")}
        />
        <CarouselNext
          className={cn("right-2 hover:scale-110", product.images.length < 2 && "hidden")}
        />
      </Carousel>
      <div className="flex gap-4 items-center w-full flex-nowrap overflow-x-auto py-4">
        {product.images.map((image: string, index: number) => (
          <Image
            key={index}
            src={image}
            alt={product.productName + " - " + index}
            width={150}
            height={150}
            onClick={() => setCurrentImage(index)}
            className={cn(
              "rounded-md h-auto w-[150px] object-contain border cursor-pointer hover:shadow-lg transition-all duration-300",
              currentImage === index ? "border-2 border-spacing-3" : ""
            )}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductImage;