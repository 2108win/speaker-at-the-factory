"use client";
import { Button } from "@/components/ui/button";
import useCart from "@/hooks/useCart";
import { Product } from "@/interfaces/product";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  product: Product;
  size?: "sm" | "default" | "lg" | "icon";
  className?: string;
};

const ProductCardAction = ({ product, size, className }: Props) => {
  const router = useRouter();
  const cart = useCart();
  const onAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    cart.addItem(product, () => {
      router.push("/cart");
    });
  };
  return (
    <div className={`flex gap-4 mt-4 ${className}`}>
      <Button onClick={onAddToCart} size={size} className="w-full">
        Thêm vào giỏ hàng
        <ShoppingCart className="ml-4" size={20} />
      </Button>
      <Button
        onClick={() => router.push(`/products/${product.id}`)}
        className="w-full"
        size={size}
        variant={"outline"}
      >
        Mua ngay
      </Button>
    </div>
  );
};

export default ProductCardAction;
