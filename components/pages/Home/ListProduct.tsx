import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import ProductCard from "../Products/ProductCard";
import { cn } from "@/lib/utils";
import { getListProduct } from "@/utils/fetchProducts";

const ListProduct = async ({ className }: { className?: string }) => {
  const product = await getListProduct();
  return (
    <div
      className={`mt-layout-screen z-[1] mx-auto grid w-full max-w-7xl items-center gap-6 px-4 ${className}`}
    >
      <div className="flex flex-wrap gap-2 items-center justify-between w-full">
        <h3 className="bg-gradient-to-r from-neutral-500 to-neutral-950 bg-clip-text text-3xl font-bold !leading-normal text-transparent dark:from-neutral-700 dark:to-neutral-100 md:text-4xl">
          Sản phẩm nổi bật
        </h3>
        <Link
          href={"/products"}
          className="relative h-10 w-fit overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:ring-offset-neutral-50 flex-none"
        >
          <span className="absolute inset-[-1000%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#ffffff_0%,#555555_50%,#ffffff_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#555555_50%,#000000_100%)]" />
          <span
            className="relative z-10 inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-neutral-50 py-2 px-4 
              text-center text-lg text-black dark:bg-black dark:text-white lg:text-xl"
          >
            Xem tất cả
            <ArrowUpRight className="ml-2" size={20} strokeWidth={1} />
          </span>
        </Link>
      </div>
      <Carousel
        opts={{
          align: "start",
        }}
        className="mx-auto grid w-fit max-w-[calc(100dvw-56px)] cursor-grab"
      >
        <CarouselContent className={cn(product.length < 3 && "md:justify-center")}>
          {product.map((product, index) => (
            <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
              <div className="p-1 h-full">
                <ProductCard product={product} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          className={cn(
            "-left-1 md:-left-3",
            product.length < 3 ? "md:hidden" : product.length < 2 ? "sm:hidden" : ""
          )}
        />
        <CarouselNext
          className={cn(
            "-right-1 md:-right-3",
            product.length < 3 ? "md:hidden" : product.length < 2 ? "sm:hidden" : ""
          )}
        />
      </Carousel>
    </div>
  );
};

export default ListProduct;
