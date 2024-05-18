import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Suspense } from "react";
import Loading from "@/components/ui/loading";

interface AuthModalProps {
  className?: string;
  trigger?: React.ReactNode;
}

export default function AuthModal({ className, trigger }: AuthModalProps) {
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
            <Button className="w-full lg:text-lg flex-wrap" variant="outline">
              👉 Đăng nhập bằng Google 👈
            </Button>
            <Button className="w-full lg:text-lg flex-wrap" variant="outline">
              👉 Đăng nhập bằng Facebook 👈
            </Button>
          </CardContent>
        </DialogContent>
      </Dialog>
    </Suspense>
  );
}
