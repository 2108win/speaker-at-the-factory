"use client";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
import { Product } from "@/interfaces/product";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";
// import { type CarouselApi } from "@/components/ui/carousel";

type Props = {
  product: Product;
  className?: string;
};

function ProductImage({ product, className }: Props) {
  const [currentImage, setCurrentImage] = useState(0);
  // const [api, setApi] = React.useState<CarouselApi>();

  // useEffect(() => {
  //   if (!api) {
  //     return;
  //   }
  //   api.scrollTo(currentImage);
  // }, [api, currentImage]);

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {/* <Carousel
        setApi={setApi}
        opts={{
          align: "start",
        }}
      >
        <CarouselContent className="rounded-lg overflow-hidden">
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
          onClick={() => setCurrentImage(currentImage - 1)}
          className={cn("left-2 hover:scale-110", product.images.length < 2 && "hidden")}
        />
        <CarouselNext
          onClick={() => setCurrentImage(currentImage + 1)}
          className={cn("right-2 hover:scale-110", product.images.length < 2 && "hidden")}
        />
      </Carousel> */}
      <div className="h-[300px] md:h-[450px] flex">
        <Image
          src={product.images[currentImage]}
          alt={product.productName + " - " + currentImage}
          width={1000}
          height={1000}
          className="rounded-lg h-auto max-h-full w-auto m-auto aspect-auto object-contain object-center shadow-lg border transition-all duration-300"
        />
      </div>
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
              "rounded-md h-[100px] w-auto object-contain border cursor-pointer hover:shadow-lg transition-all duration-300",
              currentImage === index ? "border-4 border-red-500 border-spacing-3" : ""
            )}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductImage;
