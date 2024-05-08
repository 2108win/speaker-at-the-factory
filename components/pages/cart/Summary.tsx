"use client";
import axios from "axios";
import { useEffect, useState } from "react";
// import { useSearchParams } from 'next/navigation';

import { Button } from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/useCart";
import { AlertModal } from "@/components/modal/alert-modal";

const Summary = () => {
  //   const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const [open, setOpen] = useState(false);

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
    return item.quantity ? total + Number(item.price * item.quantity) : total + Number(item.price);
  }, 0);

  const onCheckout = async () => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
      productIds: items.map((item) => item.id),
    });

    window.location = response.data.url;
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={removeAll}
        loading={false}
      />
      <div className="rounded-lg border p-6 bg-background h-fit w-full">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Đơn hàng</h2>
          <Button onClick={()=>{
            setOpen(true)
          }} size={"sm"} variant={"link"} className="px-0">
            Xóa tất cả
          </Button>
        </div>
        <div className="mt-6 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between border-b border-gray-200 pb-4">
              <div className="flex items-center">
                <div className="ml-4">
                  <h3 className="text-sm font-medium line-clamp-3 ">
                    {(item.quantity ? item.quantity : 1) + " x "}
                    {item.productName}
                  </h3>
                </div>
              </div>
              <div className="ml-4 flex shrink-0 items-baseline">
                <Currency value={item.price * item.quantity} />
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between pt-4">
            <div className="text-base font-bold">Tổng cộng</div>
            <Currency value={totalPrice} />
          </div>
        </div>
        <Button onClick={onCheckout} disabled={items.length === 0} className="w-full mt-6">
          Thanh toán
        </Button>
      </div>
    </>
  );
};

export default Summary;
