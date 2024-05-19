import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AuthModal from "@/components/modal/auth-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { History, LogOut, User } from "lucide-react";
import useSessionUser from "@/hooks/useSession";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import useCart from "@/hooks/useCart";
function AuthAction() {
  const router = useRouter();
  const session = useSessionUser();
  const cart = useCart();
  const handleLogout = async () => {
    // const userCart = await updateCart(cart.items, session.user.id);

    session.user.cart?.length > 0 && cart.removeAll(false);
    session.user.cart?.map((item) => cart.addItem(item, item.quantity || 1));
    session.logout();
    router.push("/");
  };
  return session.isLogin ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="button-pop cursor-pointer">
        <Avatar className="">
          {!session.user.image && (
            <span className="absolute z-20 w-full h-full text-red-500 inset-0 loading loading-spinner"></span>
          )}
          <AvatarImage
            className="border-3 border-red-300 relative rounded-full"
            src={session.user.image || "https://github.com/shadcn.png"}
          />
          <AvatarFallback>
            {session.user.name
              ? `${session.user.name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .toUpperCase()}`
              : "LTX"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
        <DropdownMenuLabel className="font-normal">{session.user.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Chung</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <History className="mr-2 h-4 w-4" />
            <span>Lịch sử mua</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Đăng xuất</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <AuthModal trigger={<Button className="font-semibold">Đăng nhập</Button>} />
  );
}

export default AuthAction;
