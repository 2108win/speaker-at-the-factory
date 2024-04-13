import Image from "next/image";
import Link from "next/link";
import React from "react";

const dataProduct = {
  price: "5.500.000 VNĐ",
  title: "Loa xách tay",
  description:
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe corrupti soluta minima aliquam, animi earum rem vitae repellat obcaecati quaerat ipsam unde laudantium adipisci dolores. Praesentium possimus expedita facilis ut.",
  image: "/product_1.png",
};

const BestSeller = () => {
  return (
    <div className="mt-layout-screen z-[1] mx-auto h-full max-w-7xl px-4 lg:px-8">
      {dataProduct && (
        <div className="grid grid-cols-1 items-center gap-2 lg:grid-cols-2 lg:gap-16">
          <div className="relative mx-auto aspect-[4/3] w-full max-w-md rounded-lg lg:max-w-none">
            <Image
              className="h-full w-full rounded-lg object-cover"
              src={dataProduct.image}
              alt={dataProduct.title}
              width={400}
              height={600}
            />
          </div>
          <div className="flex flex-col items-center space-y-2 text-center lg:items-start lg:text-left">
            <div className="bg-gradient-to-l from-neutral-900 via-neutral-500 via-70% to-neutral-200 bg-clip-text text-center text-4xl font-bold text-transparent dark:from-neutral-50 dark:to-slate-800 md:text-5xl lg:text-6xl">
              {dataProduct.price}
            </div>
            <div className="bg-gradient-to-l from-slate-900 via-neutral-500 via-70% to-neutral-200 bg-clip-text text-4xl text-transparent dark:from-neutral-50 dark:to-slate-800 lg:text-6xl">
              {dataProduct.title}
            </div>
            <div className="py-4 text-base font-normal text-slate-600 dark:text-neutral-200 lg:text-xl">
              {dataProduct.description}...
              <Link
                href={"#"}
                className="!text-slate-950 underline hover:text-neutral-50 dark:!text-neutral-50"
              >
                Xem thêm
              </Link>
            </div>
            <div className="mt-8 flex flex-col items-center gap-4 md:flex-row">
              <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                <span className="absolute inset-[-1000%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#555555_50%,#ffffff_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#ffffff_0%,#555555_50%,#000000_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-black/10 px-8 py-4 text-lg font-medium text-neutral-50 backdrop-blur-lg hover:bg-slate-900/70 dark:bg-neutral-50/10 hover:dark:bg-black/70">
                  Mua ngay
                </span>
              </button>
              <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                <span className="absolute inset-[-1000%] animate-[spin_10s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#555555_50%,#ffffff_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#ffffff_0%,#555555_50%,#000000_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-neutral-50 px-8 py-4 text-lg font-medium text-slate-950 hover:text-neutral-50 backdrop-blur-lg hover:bg-slate-900/70 dark:bg-black dark:text-neutral-50 hover:dark:bg-black/70">
                  Thêm vào giỏ hàng
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BestSeller;
