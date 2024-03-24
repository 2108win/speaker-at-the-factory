import Link from "next/link";
import React from "react";
import { navigationMenuTriggerStyle } from "./ui/navigation-menu";

type Props = {};

const Logo = (props: Props) => {
  return (
    <Link href={"/"} className="flex items-center gap-2">
      <span className="text-3xl font-bold tracking-tighter">Loa Tại Xưởng</span>
    </Link>
  );
};

export default Logo;
