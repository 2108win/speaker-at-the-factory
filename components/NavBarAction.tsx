"use client";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import useCart from "@/hooks/useCart";
import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ModeToggle } from "@/components/layout/toggle-mode";
import AuthModal from "@/components/modal/auth-modal";
import Loading from "@/components/ui/loading";
import AuthAction from "@/components/AuthAction";
import useSessionUser from "@/hooks/useSession";

const NavbarActions = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const session = useSessionUser();
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
      {session.isLogin ? (
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
        <AuthAction />
      </Suspense>
      <div className="hidden lg:block">
        <ModeToggle />
      </div>
    </div>
  );
};

export default NavbarActions;
