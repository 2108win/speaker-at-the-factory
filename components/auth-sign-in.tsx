"use client";

import { buttonVariants } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import Image from "next/image";
import Loading from "./ui/loading";
function AuthSignIn({ className }: { className?: string }) {
  return (
    <SignIn.Root fallback={<Loading className="loading-lg" />}>
      <Clerk.Loading>
        {(isGlobalLoading) => (
          <SignIn.Step name="start" className={className}>
            <CardHeader className="items-center">
              <Image src="/logo.png" alt="logo" width={50} height={50} />
              <CardTitle>Đăng nhập vào Loa Tại Xưởng</CardTitle>
            </CardHeader>
            <Clerk.GlobalError className="block text-sm text-red-400" />
            <div className="p-6 pt-0 space-y-4">
              <Clerk.Connection
                name="google"
                className={buttonVariants({ className: "w-full font-medium" })}
                disabled={isGlobalLoading}
              >
                Đăng nhập bằng Google
              </Clerk.Connection>
              <Clerk.Connection
                name="facebook"
                className={buttonVariants({ className: "w-full font-medium" })}
                disabled={isGlobalLoading}
              >
                Đăng nhập bằng Facebook
              </Clerk.Connection>
            </div>
            {/* <CardFooter className="items-center gap-2 justify-center">
              Bạn không có tài khoản?{" "}
              <Link href="/sign-up" className="hover:underline">
                {" "}
                Đăng ký ngay!
              </Link>
            </CardFooter> */}
          </SignIn.Step>
        )}
      </Clerk.Loading>
    </SignIn.Root>
  );
}

export default AuthSignIn;
