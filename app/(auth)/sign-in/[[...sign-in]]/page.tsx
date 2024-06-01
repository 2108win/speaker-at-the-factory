"use client";
import AuthSignIn from "@/components/auth-sign-in";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "@clerk/nextjs";
import Link from "next/link";

export default function Page() {
  const { isSignedIn } = useSession();
  return (
    <div className="z-10 grid w-full items-center px-4 sm:justify-center my-10">
      {isSignedIn ? (
        <>
          <Card className="p-8">
            <CardHeader className="text-xl font-bold">
              <CardTitle>Chào mừng trở lại!</CardTitle>
            </CardHeader>
            <CardContent className="my-2">Bạn đã đăng nhập rồi!</CardContent>
            <CardFooter className="flex items-center gap-4 flex-col md:flex-row">
              <Link href="/" className={buttonVariants({ className: "w-full font-medium" })}>
                Quay lại trang chủ
              </Link>
            </CardFooter>
          </Card>
        </>
      ) : (
        <AuthSignIn className="rounded-lg border bg-card text-card-foreground shadow-sm space-y-6" />
      )}
    </div>
  );
}
