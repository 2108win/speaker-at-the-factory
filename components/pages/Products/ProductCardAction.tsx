"use client";
import { Button } from "@/components/ui/button";
import useCart from "@/hooks/useCart";
import { Product } from "@/interfaces/product";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import AuthModal from "@/components/modal/auth-modal";
import useSessionUser from "@/hooks/useSession";
import { useSession } from "@clerk/nextjs";
import { addToCart } from "@/utils/cart";

type Props = {
  product: Product;
  size?: "sm" | "default" | "lg" | "icon";
  className?: string;
  isMain?: boolean;
};

export const ProductCardAction = ({ product, size, className, isMain }: Props) => {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const cart = useCart();
  const { isSignedIn, isLoaded } = useSession();

  const onChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) < 1) return;
    setQuantity(Number(e.target.value));
    // cart.updateItem(product.id, Number(e.target.value));
  };

  const onAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    cart.addItem(product, quantity, () => {
      router.push("/cart");
      cart.checkedItem(product.id, true);
    });
  };

  const handleBuyNow = () => {
    if (isMain) {
      cart.addItem(product, 1);
      router.push(`/cart`);
    } else {
      router.push(`/products/${product.slug}`);
    }
  };
  return (
    <div className={className}>
      {isMain && (
        <div className="flex items-center p-[1px] rounded-lg border border-gray-200 w-fit">
          <Button
            variant="ghost"
            disabled={quantity === 1}
            size="icon"
            onClick={() => {
              if (quantity > 1) {
                setQuantity(quantity - 1);
              }
            }}
          >
            <Minus size={20} />
          </Button>
          <Input
            value={quantity}
            onChange={onChangeQuantity}
            className="max-w-10 text-center focus:outline-none border-none font-semibold  focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
            min={1}
            max={100}
            step={1}
            pattern="[0-9]*"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              if (quantity < 100) {
                setQuantity(quantity + 1);
              }
            }}
          >
            <Plus size={20} />
          </Button>
        </div>
      )}
      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        {isSignedIn ? (
          <Button onClick={onAddToCart} size={size} className="w-full">
            Thêm vào giỏ hàng
            <ShoppingCart className="ml-4" size={20} />
          </Button>
        ) : (
          <AuthModal
            trigger={
              <Button size={size} className="w-full">
                Thêm vào giỏ hàng
                <ShoppingCart className="ml-4" size={20} />
              </Button>
            }
          />
        )}

        {isSignedIn ? (
          <Button
            onClick={handleBuyNow}
            className="w-full dark:bg-[linear-gradient(110deg,#000000,25%,#3d444e,55%,#000000)] hover:bg-[length:100%_150%] transition-all bg-[length:200%_100%] bg-[linear-gradient(290deg,#e5e5e5,25%,#3d444e,55%,#e5e5e5)]"
            size={size}
            variant={"outline"}
          >
            Mua ngay
          </Button>
        ) : (
          <AuthModal
            trigger={
              <Button
                className="w-full dark:bg-[linear-gradient(110deg,#000000,25%,#3d444e,55%,#000000)] hover:bg-[length:100%_150%] transition-all bg-[length:200%_100%] bg-[linear-gradient(290deg,#e5e5e5,25%,#3d444e,55%,#e5e5e5)]"
                size={size}
                variant={"outline"}
              >
                Mua ngay
              </Button>
            }
          />
        )}
      </div>
    </div>
  );
};

export const ProductCardActionHome = ({ product, className }: Props) => {
  const router = useRouter();
  const cart = useCart();
  const { isSignedIn, isLoaded } = useSession();

  const onAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    cart.addItem(product, 1, () => {
      router.push("/cart");
    });
  };
  return (
    <div className={`mt-8 flex flex-col items-center gap-4 md:flex-row ${className}`}>
      {isSignedIn ? (
        <Button
          onClick={() => router.push(`/products/${product.slug}`)}
          className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:ring-offset-neutral-50"
        >
          <span className="absolute inset-[-1000%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#555555_50%,#ffffff_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#ffffff_0%,#555555_50%,#000000_100%)]" />
          <span className="z-10 inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-[linear-gradient(110deg,#000000,25%,#3d444e,55%,#000000)] hover:bg-[length:100%_150%] transition-all bg-[length:200%_100%] px-8 py-4 text-lg font-medium text-neutral-50 backdrop-blur-lg hover:sm:bg-neutral-900/70 dark:sm:bg-neutral-50/10 hover:sm:dark:bg-black/70">
            Mua ngay
          </span>
        </Button>
      ) : (
        <AuthModal
          trigger={
            <Button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:ring-offset-neutral-50">
              <span className="absolute inset-[-1000%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#555555_50%,#ffffff_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#ffffff_0%,#555555_50%,#000000_100%)]" />
              <span className="z-10 inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-[linear-gradient(110deg,#000000,25%,#3d444e,55%,#000000)] hover:bg-[length:100%_150%] transition-all bg-[length:200%_100%] px-8 py-4 text-lg font-medium text-neutral-50 backdrop-blur-lg hover:sm:bg-neutral-900/70 dark:sm:bg-neutral-50/10 hover:sm:dark:bg-black/70">
                Mua ngay
              </span>
            </Button>
          }
        />
      )}
      {isSignedIn ? (
        <Button
          onClick={onAddToCart}
          className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:ring-offset-neutral-50"
        >
          <span className="absolute inset-[-1000%] animate-[spin_10s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#555555_50%,#ffffff_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#ffffff_0%,#555555_50%,#000000_100%)]" />
          <span className="z-10 inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-neutral-50 px-8 py-4 text-lg font-medium text-neutral-950 hover:text-neutral-50 backdrop-blur-lg hover:bg-neutral-900/70 dark:bg-black dark:text-neutral-50 hover:dark:bg-black/70">
            Thêm vào giỏ hàng
          </span>
        </Button>
      ) : (
        <AuthModal
          trigger={
            <Button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:ring-offset-neutral-50">
              <span className="absolute inset-[-1000%] animate-[spin_10s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#555555_50%,#ffffff_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#ffffff_0%,#555555_50%,#000000_100%)]" />
              <span className="z-10 inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-neutral-50 px-8 py-4 text-lg font-medium text-neutral-950 hover:text-neutral-50 backdrop-blur-lg hover:bg-neutral-900/70 dark:bg-black dark:text-neutral-50 hover:dark:bg-black/70">
                Thêm vào giỏ hàng
              </span>
            </Button>
          }
        />
      )}
    </div>
  );
};
