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
  const cart = useCart();
  const items = useCart((state) =>
    state.items.filter((item) => item.checked === true)
  );
  console.log("items===", items);
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
    return item.quantity
      ? total + Number(item.price * item.quantity)
      : total + Number(item.price);
  }, 0);

  const onCheckout = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
      {
        productIds: items.map((item) => item.id),
      }
    );

    window.location = response.data.url;
  };

  const handleReset = () => {
    cart.items.forEach((item) => {
      cart.checkedItem(item.id, false);
    });
  };

  const handleAddOne = () => {
    // cart.items[0].checked = true;
    cart.checkedItem(cart.items[0].id, true);
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={removeAll}
        loading={false}
      />
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-2xl font-bold">Đơn hàng</h3>
        {items.length > 0 && (
          <Button onClick={handleReset} variant={"link"} className="text-lg">
            Chọn lại
          </Button>
        )}
      </div>
      <div className="rounded-lg border p-6 bg-background h-fit w-full">
        <div className="space-y-4">
          {items.length === 0 && (
            <div className="flex justify-between border-b items-center border-gray-200 pb-4 gap-4">
              <p className="text-balance">
                Hãy chọn ít nhất một sản phẩm để thanh toán
              </p>
              <Button onClick={handleAddOne}>Thêm sản phẩm</Button>
            </div>
          )}
          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between border-b border-gray-200 pb-4"
            >
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
        <Button
          onClick={onCheckout}
          disabled={items.length === 0}
          className="w-full mt-6"
        >
          Thanh toán
        </Button>
      </div>
    </>
  );
};

export default Summary;
