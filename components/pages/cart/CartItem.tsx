"use client";
import { X } from "lucide-react";

import useCart from "@/hooks/useCart";
import { Product } from "@/interfaces/product";
import Currency from "@/components/ui/currency";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface CartItemProps {
  data: Product;
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();

  const onRemove = () => {
    cart.removeItem(data.id);
  };

  return (
    <li className="flex border-b bg-background p-6 rounded-lg shadow-lg border">
      <div className="relative rounded-md overflow-hidden">
        <Image
          src={data.images}
          alt={data.productName}
          width={150}
          height={150}
          className="object-cover object-center rounded-md shadow-md border"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <Button size="icon" variant="destructive" onClick={onRemove}>
            <X size={15} />
          </Button>
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className=" text-lg font-semibold">{data.productName}</p>
          </div>

          <div className="mt-1 flex text-sm">
            {/* <p className='text-gray-500'>{data.color.name}</p> */}
            <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
              {/* {data.size.name} */}
            </p>
          </div>
          <Currency value={data.price} />
        </div>
      </div>
    </li>
  );
};

export default CartItem;
