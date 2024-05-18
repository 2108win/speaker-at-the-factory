"use client";
import { Loader2, ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import useCart from "@/hooks/useCart";
import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ModeToggle } from "./layout/toggle-mode";
import AuthModal from "./modal/auth-modal";
import Loading from "./ui/loading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const NavbarActions = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const isLogin = true;
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
      {isLogin ? (
        <Button onClick={handleGotoCart} className="flex items-center rounded-full px-4 py-2 gap-1">
          <ShoppingBag size={20} />
          <span className="ml-2 font-semibold">{cart.items.length}</span>
        </Button>
      ) : (
        <AuthModal
          trigger={
            <Button className="flex items-center rounded-full px-4 py-2 gap-1">
              <ShoppingBag size={20} />
              <span className="ml-2 font-semibold">0</span>
            </Button>
          }
        />
      )}

      <Suspense fallback={<Loading />}>
        {isLogin ? (
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        ) : (
          <AuthModal trigger={<Button className="font-semibold">Đăng nhập</Button>} />
        )}
      </Suspense>
      <div className="hidden lg:block">
        <ModeToggle />
      </div>
    </div>
  );
};

export default NavbarActions;
