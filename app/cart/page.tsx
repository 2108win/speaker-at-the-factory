"use client";

import useCart from "@/hooks/useCart";
import CartItem from "@/components/pages/cart/CartItem";
import Summary from "@/components/pages/cart/Summary";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader } from "lucide-react";

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

const CartPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const cart = useCart();

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

  return (
    <div className="relative z-[5] mx-auto h-full w-full max-w-7xl items-center gap-6 px-4 lg:px-8 flex flex-col mb-14 md:mb-16 lg:mb-20">
      <h1 className="bg-gradient-to-r from-neutral-500 to-neutral-950 bg-clip-text text-3xl font-bold !leading-relaxed text-transparent dark:from-neutral-700 dark:to-neutral-100 md:text-5xl lg:text-6xl">
        Giỏ hàng
      </h1>
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center mt-14 animate-pulse">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : cart.items.length <= 0 ? (
        <div className="flex flex-col gap-4 w-full items-center h-full mt-14">
          <div className="bg-gradient-to-l from-neutral-900 via-neutral-500 via-70% to-neutral-200 bg-clip-text text-center text-4xl font-bold text-transparent dark:from-neutral-50 dark:to-neutral-800 md:text-5xl lg:text-6xl !leading-normal">
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
    </div>
  );
};

export default CartPage;
