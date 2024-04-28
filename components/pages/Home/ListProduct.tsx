"use client";
import React, { useEffect, useState } from "react";
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
import { Product } from "@/interfaces/product";
import { cn } from "@/lib/utils";

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;

const ListProduct = () => {
  const [product, setProduct] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      const response = await fetch(`${serverURL}/Product/getList`);
      const data: Product[] = await response.json();
      setProduct(data);
      setIsLoading(false);
    };
    fetchProduct();
  }, []);
  return (
    <div className="mt-layout-screen z-[1] mx-auto grid w-full max-w-7xl items-center gap-6 px-4">
      <div className="flex items-center justify-between w-full">
        <h3 className="bg-gradient-to-r from-slate-500 to-slate-950 bg-clip-text text-3xl font-bold !leading-normal text-transparent dark:from-neutral-700 dark:to-neutral-100 md:text-4xl">
          Sản phẩm nổi bật
        </h3>
        <Link
          href={"/products"}
          className="relative h-10 w-fit overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
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
        className="mx-auto w-full max-w-[calc(100dvw-56px)] md:max-w-3xl lg:max-w-none"
      >
        <CarouselContent className={cn(product.length < 3 && "md:justify-center")}>
          {product.map((product, index) => (
            <CarouselItem key={index} className="w-full pl-4 md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <ProductCard key={index} product={product} />
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
