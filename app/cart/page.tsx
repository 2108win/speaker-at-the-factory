"use client";

import useCart from "@/hooks/useCart";
import CartItem from "@/components/pages/cart/CartItem";
import Summary from "@/components/pages/cart/Summary";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { CSSProperties, useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { addToCart } from "@/utils/cart";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import AuthSignIn from "@/components/auth-sign-in";
import Loading from "../loading";
const CartPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [counter, setCounter] = useState(10);
  // const { user } = useUser();
  const router = useRouter();
  const cart = useCart();
  useEffect(() => {
    const counterInterval = setInterval(() => {
      setCounter((prevCounter) => prevCounter - 1);
    }, 1000);

    const cleanup = () => {
      clearInterval(counterInterval);
    };

    if (cart.items.length <= 0) {
      if (counter <= 0) {
        router.push("/products");
        cleanup();
      }
    } else {
      setCounter(10);
    }

    return cleanup;
  }, [cart.items.length, counter, router]);

  // useEffect(() => {
  //   if (user && cart.items.length > 0) {
  //     const body = {
  //       CusToken: user.id || "",
  //       CusName: user.fullName || "",
  //       ItemsId: cart.items.map((item) => {
  //         return {
  //           Id: item.id,
  //           Qty: item.quantity,
  //         };
  //       }),
  //     };
  //     const syncCart = async () => {
  //       const res = await addToCart(body);
  //     };
  //     syncCart();
  //   }
  // }, [user, cart.items]);

  useEffect(() => {
    setIsLoading(cart.isLoading);
  }, [cart]);

  const cartItemCheckAll = useCart((state) => {
    const allItemsChecked = state.items.every((item) => item.checked === true);
    return allItemsChecked;
  });
  useEffect(() => {
    setIsAllChecked(cartItemCheckAll);
  }, [cartItemCheckAll]);

  const removeAll = useCart((state) => state.removeAll);

  const handleCheckedAll = (checked: boolean) => {
    cart.items.forEach((item) => {
      cart.checkedItem(item.id, !isAllChecked);
    });
  };
  useEffect(() => {}, []);
  return (
    <div className="relative z-[5] mx-auto h-full w-full max-w-7xl items-center gap-6 px-4 lg:px-8 flex flex-col mb-14 md:mb-16 lg:mb-20">
      <h1 className="bg-gradient-to-r from-neutral-500 to-neutral-950 bg-clip-text text-3xl font-bold !leading-relaxed text-transparent dark:from-neutral-700 dark:to-neutral-100 md:text-5xl lg:text-6xl">
        Giỏ hàng
      </h1>
      <SignedIn>
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center mt-14 animate-pulse">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : cart.items.length <= 0 ? (
          <div className="flex flex-col gap-4 w-full items-center h-full mt-14">
            <div className="bg-gradient-to-l from-neutral-900 via-neutral-500 via-70% to-neutral-200 bg-clip-text text-center text-4xl font-bold text-transparent dark:from-neutral-50 dark:to-neutral-800 md:text-5xl lg:text-6xl !leading-normal text-balance">
              Không có sản phẩm nào trong giỏ hàng!
            </div>
            <div className="text-4xl font-bold text-neutral-500 dark:text-neutral-300">😢</div>
            {/* back to Product */}
            <div className="flex text-3xl font-bold gap-2 text-neutral-500 dark:text-neutral-300">
              <Link
                href={"/products"}
                className={buttonVariants({
                  size: "lg",
                  className: "text-inherit",
                })}
              >
                👉 Đi đến trang sản phẩm
                <span className="countdown">
                  <span
                    className="ml-2"
                    id="counterElement"
                    style={{ "--value": counter } as CSSProperties}
                  ></span>
                </span>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="relative mt-6 grid lg:grid-cols-8 gap-10 w-full">
              <div className="lg:col-span-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex gap-2 items-center">
                    <Checkbox
                      id="all"
                      className="h-6 w-6"
                      checked={isAllChecked}
                      onCheckedChange={(isAllChecked: boolean) => {
                        handleCheckedAll(isAllChecked);
                      }}
                    />
                    <label htmlFor="all" className="text-2xl font-bold cursor-pointer">
                      Tất cả sản phẩm
                    </label>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger
                      className={buttonVariants({
                        size: "sm",
                        variant: "link",
                        className: "px-0 !text-lg hover:text-red-500",
                      })}
                    >
                      Xóa tất cả
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Bạn chắc chứ?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Hành động này có thể sẽ không thể hoàn tác. Sẽ xóa toàn bộ giỏ hàng mà bạn
                          đã mất công thêm vào!
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            removeAll();
                          }}
                        >
                          Xác nhận
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
                <ul className="space-y-6">
                  {cart.items.map((item) => (
                    <CartItem key={item.id} data={item} />
                  ))}
                </ul>
              </div>
              <div className="lg:col-span-3">
                <Summary />
              </div>
            </div>
            <div className="flex mt-6 text-2xl font-bold gap-2 text-neutral-500 dark:text-neutral-300">
              <Link
                href={"/products"}
                className={buttonVariants({
                  variant: "outline",
                  size: "lg",
                  className: "text-inherit w-fit mx-auto",
                })}
              >
                👉 Tiếp tục mua sắm
              </Link>
            </div>
          </>
        )}
      </SignedIn>
      <SignedOut>
        <div className="z-10 grid w-full items-center max-w-md">
          <AuthSignIn className="rounded-lg border bg-card text-card-foreground shadow-sm space-y-6" />
        </div>
      </SignedOut>
    </div>
  );
};

export default CartPage;
