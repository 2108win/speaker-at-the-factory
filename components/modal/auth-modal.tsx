import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Suspense } from "react";
import Loading from "@/components/ui/loading";
import useSessionUser from "@/hooks/useSession";
import { User } from "@/interfaces/user";
import useCart from "@/hooks/useCart";
import { getCartByUserId, getUserData } from "@/utils/user";

interface AuthModalProps {
  className?: string;
  trigger?: React.ReactNode;
}

export default function AuthModal({ className, trigger }: AuthModalProps) {
  const session = useSessionUser();
  const cart = useCart();
  console.log("🚀 ~ AuthModal ~ session:", session.isLogin);
  const user: User = {
    id: "1",
    name: "Win Lax",
    email: "dangcapcuawin@gmail.com",
    image: "https://github.com/shadcn.png",
    cart: [
      {
        adapter: "Full",
        brand: "loataixuong",
        checked: true,
        connectMicroWireless: "Yes",
        connectOther: "No~~",
        connectWireless: "Bluetooth 5.0",
        description: "📟LOA XÁCH TAY Màu xám  - GIÁ TẠI XƯỞNG - ĐÂU DÙNG CŨNG HAY📟",
        frequency: "~~~",
        height: "16",
        id: "ead79c58-7427-4706-b635-c51b058b4857",
        idEmployee: "007a9fe9-35dc-4409-9335-62d81fbdfd47",
        images: [
          "http://nmt.logit.id.vn:5000/api/v1/Blog/getImage/loa-gray-1.jpg",
          "http://nmt.logit.id.vn:5000/api/v1/Blog/getImage/loa-gray-2.jpg",
          "http://nmt.logit.id.vn:5000/api/v1/Blog/getImage/loa-1.jpg",
          "http://nmt.logit.id.vn:5000/api/v1/Blog/getImage/loa-2.jpg",
          "http://nmt.logit.id.vn:5000/api/v1/Blog/getImage/loa-3.jpg",
        ],
        length: "16",
        manyBass: "2 Bass 8 inch",
        manySpeaker: "1 Mid 4 inch",
        material: "Nhựa, Da",
        model: "T-288",
        portWiredMicro: "5000",
        power: "620W-780W",
        price: 5000000,
        productName: "Loa dã ngoại - Xám",
        quantity: 4,
        slug: "loa-da-ngoai-xam-t-288",
        status: "d559257f-8664-4674-804c-fd889e71c0c7",
        timeIsBattery: "6 tiếng",
        timeIsUse: "6 - 8 tiếng",
        treble: "1 Treble 250",
        weight: "16",
        width: "16",
        title: "",
        category: "",
        colorImg: "",
      },
    ],
  };
  const handleLogin = async () => {
    // const userData = await getUserData(session.user.id);
    session.isLogin = true;
    // if (userData) session.login(userData);
    // else
    session.login(user);
    // userData.cart?.length > 0 &&
    session.user.cart?.length > 0 &&
      session.user.cart.map((item) => cart.addItem(item, item.quantity || 1, () => {}, false));
  };
  return (
    <Suspense fallback={<Loading />}>
      <Dialog>
        {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
        <DialogContent className={`${className}`}>
          <CardHeader className="px-0">
            <CardTitle>Đăng nhập</CardTitle>
            <CardDescription>Đăng nhập để thực hiện nhiều hơn!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 px-0">
            {session.isLogin ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <>
                <Button
                  onClick={handleLogin}
                  className="w-full lg:text-lg flex-wrap"
                  variant="outline"
                >
                  👉 Đăng nhập bằng Google 👈
                </Button>
                <Button
                  onClick={handleLogin}
                  className="w-full lg:text-lg flex-wrap"
                  variant="outline"
                >
                  👉 Đăng nhập bằng Facebook 👈
                </Button>
              </>
            )}
          </CardContent>
        </DialogContent>
      </Dialog>
    </Suspense>
  );
}
