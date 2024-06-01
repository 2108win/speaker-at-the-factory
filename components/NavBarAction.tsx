"use client";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import useCart from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { ModeToggle } from "@/components/layout/toggle-mode";
import AuthModal from "@/components/modal/auth-modal";
import Loading from "@/components/ui/loading";
import AuthAction from "@/components/AuthAction";
import { useSession } from "@clerk/nextjs";

const NavbarActions = () => {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useSession();

  const cart = useCart();
  const handleGotoCart = () => router.push("/cart");
  // if (!isLoaded) {
  //   return null;
  // }
  return (
    <div className="items-center gap-2 flex">
      {!isSignedIn || !isLoaded ? (
        <>
          <AuthModal
            trigger={
              <Button className="flex items-center rounded-full px-4 py-2 gap-1">
                <ShoppingBag size={20} />
                <span className="ml-2 font-semibold">
                  {isSignedIn && !isLoaded ? <Loading /> : 0}
                </span>
              </Button>
            }
          />
          {isSignedIn && !isLoaded && <Loading />}
        </>
      ) : (
        <Button onClick={handleGotoCart} className="flex items-center rounded-full px-4 py-2 gap-1">
          <ShoppingBag size={20} />
          {cart ? <span className="ml-2 font-semibold">{cart.items.length}</span> : <Loading />}
        </Button>
      )}
      <AuthAction />
      <div className="hidden lg:block">
        <ModeToggle />
      </div>
    </div>
  );
};

export default NavbarActions;
