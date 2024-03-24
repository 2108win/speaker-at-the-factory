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
      <span className="text-2xl font-bold tracking-[-1px] lg:text-3xl">
        Loa Tại Xưởng
      </span>
    </Link>
  );
};

export default Logo;
