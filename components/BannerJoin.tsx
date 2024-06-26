import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";

const BannerJoin = () => {
  return (
    <div className="mt-layout-screen mt-layout-screen relative z-[1] h-full w-full lg:aspect-[3/1]">
      <Image
        className="absolute z-[-1] h-full w-full object-cover object-bottom"
        src={"/bg_bannerJoin.jpg"}
        alt="bg_bannerJoin"
        fill
        sizes="100vw"
      />
      <div className="absolute inset-0 z-[2] bg-black/30 dark:bg-black/90"></div>
      <div className="mx-auto flex h-full w-full max-w-7xl items-center p-4 py-10 lg:p-8">
        <div className="z-10 flex w-[80%] flex-col gap-4 text-left">
          <div className="text-balance bg-gradient-to-r from-neutral-500 to-neutral-950 bg-clip-text text-4xl font-bold !leading-normal text-transparent dark:from-neutral-700 dark:to-neutral-100 md:text-6xl">
            Trở thành Một phần của Điều Đặc Biệt trong Cuộc Sống!
          </div>
          <Link
            href="/contact"
            className={cn(
              buttonVariants(),
              "relative inline-flex h-12 w-fit overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:ring-offset-neutral-50"
            )}
          >
            <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#555555_50%,#ffffff_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#ffffff_0%,#555555_50%,#000000_100%)]" />
            <span className="z-10 inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-[linear-gradient(110deg,#000000,25%,#3d444e,55%,#000000)] bg-[length:200%_100%] px-8 py-4 text-lg font-medium text-white backdrop-blur-lg hover:bg-neutral-900/70 dark:bg-neutral-50/10 hover:dark:bg-neutral-950/70">
              Tham gia ngay!
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BannerJoin;
