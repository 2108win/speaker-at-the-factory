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
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Currency from "@/components/ui/currency";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import useCart from "@/hooks/useCart";
import { toast } from "sonner";

const apiInvoiceUrl = process.env.NEXT_PUBLIC_SERVER_URL + "/Invoice";

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  total: number;
  information: {
    paymentChoose: string;
    name: string;
    email: string | any;
    phone: string | any;
    address: string;
    note: string;
  };
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({
  isOpen,
  onClose,
  products,
  total,
  information: information,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const cart = useCart();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onConfirm = async () => {
    if (!document.querySelector<HTMLInputElement>("#confirm")?.checked) {
      toast.error("Hãy xác nhận");
      return;
    }
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
      products.map((item) => {
        cart.removeItem(item.id, false);
      });
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Logo />
          </DialogTitle>
          <DialogDescription>Hóa đơn thanh toán.</DialogDescription>
        </DialogHeader>
        <Card>
          <CardHeader>
            <CardTitle>Thông tin giao hàng:</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <div className="grid grid-cols-3">
              <p className="col-span-1">Tên khách hàng: </p>
              <span className="font-bold col-span-2">{information.name}</span>
            </div>
            <div className="grid grid-cols-3">
              <p className="col-span-1">Email: </p>
              <span className="font-bold col-span-2">{information.email}</span>
            </div>
            <div className="grid grid-cols-3">
              <p className="col-span-1">Số điện thoại: </p>
              <span className="font-bold col-span-2">{information.phone}</span>
            </div>
            <div className="grid grid-cols-3">
              <p className="col-span-1">Địa chi: </p>
              <span className="font-bold col-span-2">{information.address}</span>
            </div>
          </CardContent>
          <CardHeader>
            <CardTitle>
              Thông tin sản đơn hàng:({products.reduce((acc, item) => acc + item.quantity, 0)})
            </CardTitle>
          </CardHeader>
          <CardContent className="gap-3 flex flex-col">
            {products.map((product) => (
              <div key={product.slug} className="grid grid-cols-2">
                <p className="col-span-1">{product.productName}</p>
                <p className="ml-auto col-span-1 flex gap-2">
                  {product.quantity} x <Currency className="font-base" value={product.price} />
                </p>
              </div>
            ))}
            <div className="grid grid-cols-2">
              <p className="col-span-1 font-bold">Tổng tiền:</p>
              <p className="ml-auto col-span-1">
                <Currency value={total} />
              </p>
            </div>
            <p className="font-bold">Phương thức thanh toán: {information.paymentChoose}</p>
          </CardContent>
          <CardFooter>
            <div className="grid grid-cols-3">
              <p className="col-span-1">Ghi chú: </p>
              <span className="italic col-span-2">{information.note || "(Trống)"}</span>
            </div>
          </CardFooter>
        </Card>
        <DialogFooter className="flex sm:!justify-start items-center space-x-2">
          <Input
            onChange={() => setIsChecked(!isChecked)}
            type="checkbox"
            name="confirm"
            id="confirm"
            className="h-4 w-4"
          />
          <Label htmlFor="confirm">Xác nhận đã đúng</Label>
        </DialogFooter>
        <DialogFooter className="sm:!justify-start">
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
