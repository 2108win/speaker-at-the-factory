"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/useCart";
import { InvoiceModal } from "@/components/modal/invoice-modal";
import { Separator } from "@/components/ui/separator";
import { CreditCard, HandCoins } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
// import useSessionUser from "@/hooks/useSession";
import { useUser } from "@clerk/nextjs";
import useSessionUser from "@/hooks/useSession";

const apiInvoiceUrl = process.env.NEXT_PUBLIC_SERVER_URL + "/Invoice";

const payments = [
  {
    name: "Thẻ",
    icon: <CreditCard />,
  },
  {
    name: "Tiền mặt",
    icon: <HandCoins />,
  },
];

const Summary = () => {
  const cart = useCart();
  const user = useSessionUser().user;
  const items = useCart((state) => state.items.filter((item) => item.checked === true));
  // const removeAll = useCart((state) => state.removeAll);
  const [paymentChoose, setPaymentChoose] = useState("");
  const [information, setInformation] = useState({
    name: user?.fullName || "",
    email: user?.emailAddresses || "",
    phone: user?.phoneNumbers || "",
    address: "",
    note: "",
  });
  const [open, setOpen] = useState(false);
  const [isCheckOut, setIsCheckOut] = useState(false);
  const [isAddress, setIsAddress] = useState(false);

  useEffect(() => {
    if (items.length <= 0) {
      setIsCheckOut(false);
      setIsAddress(false);
      setPaymentChoose("");
    }
  }, [items.length]);
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

  const onCheckout = () => {
    if (!isCheckOut) {
      setIsCheckOut(true);
      return;
    }
    if (!isAddress && paymentChoose != "") {
      setIsAddress(true);
      return;
    }
    if (isAddress && paymentChoose != "") {
      if (
        information.name == "" ||
        information.email == "" ||
        information.phone == "" ||
        information.address == ""
      ) {
        toast.error("Vui lý điền đầy đủ thông tin.");

        return;
      }
      // const body = {
      //   ProductIds: items.map((item) => {
      //     return {
      //       Id: item.id,
      //       ProductName: item.productName,
      //       Brand: item.brand,
      //       Model: item.model,
      //       Count: item.quantity,
      //       Price: item.price.toString(),
      //     };
      //   }),
      //   UserName: information.name,
      //   PhoneNumber: information.phone,
      //   LocaltionUser: information.address,
      //   Note: information.note,
      //   TotalPrice: totalPrice.toString(),
      // };
      setOpen(true);
      // setLoading(true);
      // const res = await fetch(`${apiInvoiceUrl}/addInvoice`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(body),
      // });
      // if (res.ok) {
      //   setLoading(false);
      //   setOpen(false);
      //   items.map((item) => {
      //     cart.removeItem(item.id, false);
      //   });
      //   toast.success("Đặt hàng thành công.", {
      //     description: "Hóa đơn mua hàng sẽ được gửi về email.",
      //   });
      // } else {
      //   setLoading(false);
      //   const response = await res.json();
      //   toast.error(`Status: ${res.status}`, {
      //     description: response.title,
      //   });
      // }
    }
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

  const handleDisabled = () => {
    if (items.length === 0) {
      return true;
    } else {
      if (isCheckOut) {
        if (isCheckOut && paymentChoose == "") return true;
        else return false;
      } else {
        return false;
      }
    }
  };

  const handleChangeInformation = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setInformation({ ...information, [e.target.name]: e.target.value });
  };

  return (
    <>
      <InvoiceModal
        isOpen={open}
        onClose={() => setOpen(false)}
        products={items}
        total={totalPrice}
        information={information}
        payment={paymentChoose}
      />
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-2xl font-bold leading-10">Đơn hàng</h3>
        {items.length > 0 && (
          <Button onClick={handleReset} variant={"link"} className="text-lg p-0">
            Chọn lại
          </Button>
        )}
      </div>
      <div className="rounded-lg border p-6 bg-background h-fit w-full">
        <div className="space-y-4">
          {items.length === 0 && (
            <div className="flex justify-between border-b items-center border-gray-200 pb-4 gap-4">
              <p className="text-balance">Hãy chọn ít nhất một sản phẩm để thanh toán</p>
              <Button onClick={handleAddOne}>Thêm sản phẩm</Button>
            </div>
          )}
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
        {isCheckOut && (
          <div className="space-y-4 mt-4">
            <Separator />
            <h3 className="text-base font-bold">
              Phương thức thanh toán <span className="text-red-500 font-bold">*</span>
            </h3>
            <div className="flex gap-2 items-center justify-between">
              {payments.map((payment) => (
                <Button
                  size={"lg"}
                  variant={"outline"}
                  key={payment.name}
                  className={cn(
                    "flex flex-col rounded-md border-2 h-full p-5 w-full",
                    paymentChoose === payment.name && "border-green-500 bg-green-500/10"
                  )}
                  onClick={() => {
                    setPaymentChoose(payment.name);
                  }}
                >
                  {payment.icon}
                  <p className="text-base font-medium">{payment.name}</p>
                </Button>
              ))}
            </div>
          </div>
        )}
        {isAddress && (
          <form className="space-y-4 mt-4">
            <Separator />
            <h3 className="text-base font-bold">Địa chỉ giao hàng</h3>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Họ và tên <span className="text-red-500 font-bold">*</span>
                </Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={information.name}
                  onChange={handleChangeInformation}
                  className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email <span className="text-red-500 font-bold">*</span>
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={information.email as any}
                  onChange={handleChangeInformation}
                  className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="phone" className="text-sm font-medium">
                  Số điện thoại <span className="text-red-500 font-bold">*</span>
                </Label>
                <Input
                  type="text"
                  id="phone"
                  name="phone"
                  value={information.phone as any}
                  onChange={handleChangeInformation}
                  className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="address" className="text-sm font-medium">
                  Địa chỉ <span className="text-red-500 font-bold">*</span>
                </Label>
                <Input
                  type="text"
                  id="address"
                  name="address"
                  value={information.address}
                  onChange={handleChangeInformation}
                  className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="note" className="text-sm font-medium">
                  Ghi chú
                </Label>
                <Textarea
                  id="note"
                  name="note"
                  value={information.note}
                  placeholder="Nhập vào ghi chú"
                  onChange={handleChangeInformation}
                  className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </form>
        )}
        <Button onClick={onCheckout} disabled={handleDisabled()} className="w-full mt-6">
          {items.length === 0 || isAddress ? "Thanh toán" : "Tiếp tục"}
        </Button>
      </div>
    </>
  );
};

export default Summary;
