"use client";
import { ExternalLink, Minus, Plus, Trash, X } from "lucide-react";

import useCart from "@/hooks/useCart";
import { Product } from "@/interfaces/product";
import Currency from "@/components/ui/currency";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

interface CartItemProps {
  data: Product;
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();
  const [quantity, setQuantity] = useState(data.quantity || 1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isChecked, setIsChecked] = useState(true);
  const onChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) < 1) return;
    setQuantity(Number(e.target.value));
  };
  const handleChecked = () => {
    setIsChecked(!isChecked);
    cart.checkedItem(data.id, isChecked);
  };
  useEffect(() => {
    setTotalPrice(quantity * data.price);
  }, [data.id, cart, quantity, data.price, totalPrice]);

  const onRemove = () => {
    cart.removeItem(data.id, true);
  };

  return (
    <li className="relative -mx-1 sm:-mx-0">
      <label
        htmlFor={"check" + data.id}
        className={cn(
          "relative cursor-pointer flex bg-background p-2 sm:p-4 gap-4 lg:p-6 rounded-lg shadow-sm hover:shadow-xl border transition-all duration-300",
          {
            "border-green-500 shadow-xl": data.checked,
          }
        )}
      >
        <Checkbox
          id={"check" + data.id}
          checked={data.checked}
          onCheckedChange={handleChecked}
          className="z-10 h-5 w-5"
        />
        <Button
          size="icon"
          variant="destructive"
          onClick={onRemove}
          className="absolute bottom-2 left-2 sm:left-auto sm:bottom-auto sm:top-4 sm:right-4 z-10 p-1 sm:p-2"
        >
          <Trash className="h-5 w-5" />
        </Button>
        <div className="relative rounded-md w-[100px] sm:w-[150px] md:w-[250px] overflow-hidden">
          <Image
            src={data.images[0] || "/og-image.jpg"}
            alt={data.productName}
            width={250}
            height={200}
            className="object-contain max-h-[150px] h-auto my-auto w-auto object-center rounded-md shadow-md border"
          />
        </div>
        <div className="relative flex flex-col h-auto flex-1 justify-between sm:ml-6">
          <div className="flex w-full h-full justify-between flex-col gap-4">
            <div className="flex flex-col gap-4 sm:pr-12 group w-fit">
              <Link href={`/products/${data.slug}`} className="hover:underline flex items-center">
                <p className="text-md sm:text-2xl font-medium line-clamp-2">
                  {data.productName}
                  <span className="inline-flex">
                    <ExternalLink className="ml-2 opacity-0 group-hover:opacity-100" size={16} />
                  </span>
                </p>

                {/* {data.productName} */}
              </Link>
              <Currency className="text-lg sm:!font-light" value={data.price} />
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center p-[1px] rounded-lg border border-gray-200">
                <Button
                  variant="ghost"
                  disabled={quantity === 1}
                  size="icon"
                  onClick={() => {
                    if (quantity > 1) {
                      setQuantity(quantity - 1);
                      cart.updateItem(data.id, quantity - 1);
                    }
                  }}
                >
                  <Minus size={20} />
                </Button>
                <Input
                  value={quantity}
                  onChange={onChangeQuantity}
                  className="max-w-10 text-center focus:outline-none border-none font-semibold focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
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
                      cart.updateItem(data.id, quantity + 1);
                    }
                  }}
                >
                  <Plus size={20} />
                </Button>
              </div>
              <Currency className="text-xl font-bold hidden sm:block" value={totalPrice} />
            </div>
          </div>
        </div>
      </label>
    </li>
  );
};

export default CartItem;
