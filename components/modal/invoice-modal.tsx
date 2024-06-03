"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Product } from "@/interfaces/product";
import Logo from "@/components/Logo";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Currency from "@/components/ui/currency";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import useCart from "@/hooks/useCart";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

const apiInvoiceUrl = process.env.NEXT_PUBLIC_SERVER_URL + "/Invoice";

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  total: number;
  information: {
    name: string;
    email: string | any;
    phone: string | any;
    address: string;
    note: string;
  };
  payment: string;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({
  isOpen,
  onClose,
  products,
  total,
  information: information,
  payment,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const cart = useCart();

  const onConfirm = async () => {
    const body = {
      ProductIds: products.map((item) => {
        return {
          Id: item.id,
          ProductName: item.productName,
          Brand: item.brand,
          Model: item.model,
          Count: item.quantity,
          Price: item.price.toString(),
        };
      }),
      LocaltionUser: information.address,
      PhoneNumber: information.phone,
      // email: information.email,
      UserName: information.name,
      Note: information.note || "(Trống)",
      TotalPrice: total.toString(),
    };
    const res = await fetch(`${apiInvoiceUrl}/addInvoice`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      isOpen = false;
      const hasToast = false;
      for (const item of products) {
        cart.removeItem(item.id, hasToast);
      }
      toast.success("Đặt hàng thành công.", {
        description: "Hóa đơn mua hàng sẽ được gửi về email.",
      });
    } else {
      const response = await res.json();
      toast.error(`Status: ${res.status}`, {
        description: response.title,
      });
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle>
            <Logo hasText />
          </DialogTitle>
          <DialogDescription>Hóa đơn thanh toán.</DialogDescription>
        </DialogHeader>
        <Card className="max-h-full">
          <ScrollArea className="h-[50dvh]">
            <CardHeader className="p-4">
              <CardTitle>Thông tin giao hàng:</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 p-4">
              <div className="grid lg:grid-cols-3">
                <p className="col-span-1">Tên khách hàng: </p>
                <span className="font-bold col-span-2 text-wrap">{information.name}</span>
              </div>
              <div className="grid lg:grid-cols-3">
                <p className="col-span-1">Email: </p>
                <span className="font-bold col-span-2 text-wrap">{information.email}</span>
              </div>
              <div className="grid lg:grid-cols-3">
                <p className="col-span-1">Số điện thoại: </p>
                <span className="font-bold col-span-2 text-wrap">{information.phone}</span>
              </div>
              <div className="grid lg:grid-cols-3">
                <p className="col-span-1">Địa chi: </p>
                <span className="font-bold col-span-2 text-wrap">{information.address}</span>
              </div>
            </CardContent>
            <CardHeader className="p-4">
              <CardTitle>
                Thông tin đơn hàng:({products.reduce((acc, item) => acc + item.quantity, 0)})
              </CardTitle>
            </CardHeader>
            <CardContent className="gap-3 flex flex-col p-4">
              {products.map((product) => (
                <div key={product.slug}>
                  <div className="flex items-center justify-between flex-wrap">
                    <p className="col-span-1">{product.productName}</p>
                    <div className="ml-auto col-span-1 flex gap-2">
                      {product.quantity} x <Currency className="font-base" value={product.price} />
                    </div>
                  </div>
                  <Separator className="mt-2" />
                </div>
              ))}
              <div className="grid grid-cols-2">
                <p className="col-span-1 font-bold">Tổng tiền:</p>
                <div className="ml-auto col-span-1">
                  <Currency value={total} />
                </div>
              </div>
              <p className="font-bold">Phương thức thanh toán: {payment}</p>
            </CardContent>
            <CardFooter className="p-4">
              <div className="grid grid-cols-3">
                <p className="col-span-1">Ghi chú: </p>
                <span className="italic col-span-2">{information.note || "(Trống)"}</span>
              </div>
            </CardFooter>
          </ScrollArea>
        </Card>
        <div className="flex flex-col gap-4">
          <div className="flex !flex-row sm:!justify-start items-center space-x-2">
            <Input
              onChange={() => {
                if (isChecked) {
                  setIsChecked(false);
                } else {
                  setIsChecked(true);
                }
              }}
              type="checkbox"
              name="confirm"
              id="confirm"
              className="h-4 w-4"
            />
            <Label htmlFor="confirm">Xác nhận đã đúng</Label>
          </div>
          <Button
            disabled={!isChecked}
            onClick={() => {
              onConfirm();
            }}
            size={"lg"}
            className="w-full text-lg"
          >
            Mua
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
