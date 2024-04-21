"use client";
import { Trash, X } from "lucide-react";

import useCart from "@/hooks/useCart";
import { Product } from "@/interfaces/product";
import Currency from "@/components/ui/currency";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

interface CartItemProps {
  data: Product;
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();
  const [quantity, setQuantity] = useState(data.quantity || 1);
  const [totalPrice, setTotalPrice] = useState(0);

  const onChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) < 1) return;
    setQuantity(Number(e.target.value));
    cart.updateItem(data.id, Number(e.target.value));
  };

  useEffect(() => {
    setTotalPrice(quantity * data.price);
  }, [data.id, cart, quantity, data.price, totalPrice]);

  const onRemove = () => {
    cart.removeItem(data.id);
  };

  return (
    <li className="flex border-b bg-background p-4 gap-4 lg:p-6 rounded-lg shadow-sm hover:shadow-xl border transition-shadow duration-500">
      <div className="relative rounded-md overflow-hidden">
        <Image
          src={data.image}
          alt={data.title}
          // alt={data.productName}
          width={150}
          height={150}
          className="object-cover object-center rounded-md shadow-md border"
        />
      </div>
      <div className="relative flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <Button size="icon" variant="destructive" onClick={onRemove}>
            <Trash size={20} />
          </Button>
        </div>
        <div className="relative mr-12 flex flex-col sm:items-center  sm:flex-row sm:gap-x-6">
          <div className="flex w-full justify-between">
            <p className="text-xl font-semibold">
              {data.title}
              {/* {data.productName} */}
            </p>
            <Input
              type="number"
              value={quantity}
              onChange={onChangeQuantity}
              className="max-w-20 ml-4 border-l border-gray-200 font-semibold text-black"
              min={1}
              max={100}
              step={1}
              pattern="[0-9]*"
            />
          </div>
        </div>
        <Currency value={totalPrice} />
      </div>
    </li>
  );
};

export default CartItem;
