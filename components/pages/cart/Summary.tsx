"use client";
import axios from "axios";
import { useEffect } from "react";
// import { useSearchParams } from 'next/navigation';

import { Button } from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/useCart";

const Summary = () => {
  //   const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);

  //   useEffect(() => {
  //     if (searchParams.get('success')) {
  //       toast({ title: 'Payment completed.' });
  //       removeAll();
  //     }

  //     if (searchParams.get('canceled')) {
  //       toast({ title: 'Something went wrong.' });
  //     }
  //   }, [searchParams, removeAll]);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

  const onCheckout = async () => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
      productIds: items.map((item) => item.id),
    });

    window.location = response.data.url;
  };

  return (
    <div className="rounded-lg border p-6 md:col-span-3 bg-background h-fit">
      <h2 className="text-lg font-medium">Đơn hàng</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium">Tổng cộng</div>
          <Currency value={totalPrice} />
        </div>
      </div>
      <Button onClick={onCheckout} disabled={items.length === 0} className="w-full mt-6">
        Thanh toán
      </Button>
    </div>
  );
};

export default Summary;
