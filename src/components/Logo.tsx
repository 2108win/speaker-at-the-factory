import Link from "next/link";
import React from "react";
import { navigationMenuTriggerStyle } from "./ui/navigation-menu";
import Image from "next/image";

type Props = {};

const Logo = (props: Props) => {
  return (
    <Link href={"/"} className="flex w-fit items-center gap-2">
      <Image src="/logo.png" width={40} height={40} alt="logo_image" />
      <div className="relative inline-flex overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
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
