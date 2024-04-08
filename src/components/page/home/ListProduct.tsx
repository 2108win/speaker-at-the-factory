import Image from "next/image";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const dataProduct = [
  {
    price: "5.500.000 VNĐ",
    title: "Loa xách tay",
    category: "Loa to",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe corrupti soluta minima aliquam, animi earum rem vitae repellat obcaecati quaerat ipsam unde laudantium adipisci dolores. Praesentium possimus expedita facilis ut.",
    image: "/product_1.png",
    tag: "Bán chạy",
  },
  {
    price: "3.500.000 VNĐ",
    title: "Loa để bàn",
    category: "Loa nhỏ",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe corrupti soluta minima aliquam, animi earum rem vitae repellat obcaecati quaerat ipsam unde laudantium adipisci dolores. Praesentium possimus expedita facilis ut.",
    image: "/product_2.png",
    tag: "Giảm giá",
  },
  {
    price: "4.500.000 VNĐ",
    title: "Loa Marshall",
    category: "Loa to",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe corrupti soluta minima aliquam, animi earum rem vitae repellat obcaecati quaerat ipsam unde laudantium adipisci dolores. Praesentium possimus expedita facilis ut.",
    image: "/product_3.png",
    tag: "Mới",
  },
];

const ListProduct = () => {
  return (
    <div className="mt-layout-screen z-[1] mx-auto grid w-full max-w-7xl items-center gap-10 px-4">
      <Carousel
        opts={{
          align: "start",
        }}
        className="mx-auto w-full max-w-[calc(100dvw-56px)] md:max-w-3xl lg:max-w-none"
      >
        <CarouselContent>
          {dataProduct.map((product, index) => (
            <CarouselItem
              key={index}
              className="w-full pl-4 md:basis-1/2 lg:basis-1/3"
            >
              <div className="p-1">
                <div
                  key={index}
                  className="flex flex-col space-y-2 overflow-hidden"
                >
                  <div className="relative aspect-square w-full rounded-lg bg-black/50 backdrop-blur-xl dark:bg-neutral-50/20">
                    <Image
                      className="z-[1] rounded-lg object-cover"
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                    <div className="absolute left-4 top-4">
                      <div className="relative inline-flex overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                        <span className="absolute inset-[-1000%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#555555_50%,#ffffff_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#ffffff_0%,#555555_50%,#000000_100%)]" />
                        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-black px-4 text-lg font-medium text-neutral-50 backdrop-blur-lg hover:bg-slate-900/70 dark:bg-neutral-50/10 hover:dark:bg-black/70">
                          {product.tag}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-lg font-normal text-slate-600 dark:text-neutral-200">
                    {product.category}
                  </div>
                  <div className="mt-4 bg-gradient-to-l from-neutral-950 to-slate-700 bg-clip-text text-2xl font-bold text-transparent dark:from-neutral-50 dark:to-slate-400">
                    {product.price}
                  </div>
                  <div className="bg-gradient-to-l from-slate-900 to-slate-700 bg-clip-text text-2xl text-transparent dark:from-neutral-50 dark:to-slate-400">
                    {product.title}
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-1 md:-left-3 lg:hidden" />
        <CarouselNext className="-right-1 md:-right-3 lg:hidden" />
      </Carousel>
      <button className="relative mx-auto inline-flex h-12 w-fit overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
        <span className="absolute inset-[-1000%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#555555_50%,#ffffff_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#ffffff_0%,#555555_50%,#000000_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-black/10 px-8 py-4 text-lg font-medium text-neutral-50 backdrop-blur-lg hover:bg-slate-900/70 dark:bg-neutral-50/10 hover:dark:bg-black/70">
          Tải thêm
        </span>
      </button>
    </div>
  );
};

export default ListProduct;
