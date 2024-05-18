"use client";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Error() {
  return (
    <div className="z-[5] h-full w-full">
      <div className="space-y-2 p-4 md:p-8">
        <div className="flex flex-col items-center gap-4">
          <div className="bg-gradient-to-l from-neutral-900 via-neutral-500 via-70% to-neutral-200 bg-clip-text text-center text-4xl font-bold text-transparent dark:from-neutral-50 dark:to-neutral-800 md:text-5xl lg:text-6xl !leading-normal">
            Sản phẩm không tồn tại
          </div>
          <div className="flex flex-col items-center text-4xl font-bold gap-2 text-neutral-500 dark:text-neutral-300">
            <div className="">😢</div>
            {/* back to Product */}
            <Link
              href={"/products"}
              className={buttonVariants({
                size: "lg",
                className: "!text-xl !font-bold",
              })}
            >
              Quay lại sản phẩm
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
