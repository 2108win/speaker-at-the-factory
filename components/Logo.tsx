import Link from "next/link";
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const Logo = ({ hasText }: { hasText?: boolean }) => {
  return (
    <Link href={"/"} className="flex w-fit items-center gap-2 z-10">
      <Image src="/logo.png" width={40} height={40} alt="logo_image" />
      <div
        className={cn(
          "relative overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:ring-offset-neutral-50",
          hasText ? "inline-flex" : "hidden md:inline-flex"
        )}
      >
        <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#1c003d_0%,#2630e8_50%,#fcf9ff_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#050959_50%,#240050_100%)]" />
        <span
          className="relative z-10 inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-neutral-50 p-1.5 
              text-center text-lg font-bold tracking-[-1px] text-black dark:bg-black dark:text-white lg:text-xl"
        >
          Loa Tại Xưởng
        </span>
      </div>
    </Link>
  );
};

export default Logo;
