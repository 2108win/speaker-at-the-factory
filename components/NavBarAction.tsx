"use client";
import { ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import useCart from "@/hooks/useCart";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const NavbarActions = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cart = useCart();
  const handleGotoCart = () => router.push("/cart");
  if (!isMounted) {
    return null;
  }
  return (
    <div className="items-center gap-2 flex">
      <Button
        onClick={handleGotoCart}
        className="flex items-center rounded-full px-4 py-2"
      >
        <ShoppingBag size={20} />
        <span className="ml-2 text-sm font-medium">{cart.items.length}</span>
      </Button>
      {/* <Button>Đăng nhập</Button> */}
    </div>
  );
};

export default NavbarActions;
