import Link from "next/link";
import React from "react";
import { navigationMenuTriggerStyle } from "./ui/navigation-menu";
import Image from "next/image";

type Props = {};

const Logo = (props: Props) => {
  return (
    <Link href={"/"} className="flex items-center gap-2">
      <Image
        className="block md:hidden"
        src="/logo.png"
        width={40}
        height={40}
        alt="logo_image"
      />
      <span className="relative z-10 bg-gradient-to-r from-slate-800 to-slate-500 bg-clip-text text-center text-2xl font-bold tracking-[-1px] text-transparent dark:from-neutral-200 dark:to-neutral-50 lg:text-3xl">
        Loa Tại Xưởng
      </span>
    </Link>
  );
};

export default Logo;
