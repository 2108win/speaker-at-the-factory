import React from "react";
import { buttonVariants } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
function AuthAction() {
  return (
    <>
      <SignedOut>
        <Link className={buttonVariants({ className: "font-semibold" })} href={"/sign-in"}>
          Đăng nhập
        </Link>
      </SignedOut>
      <SignedIn>
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: "w-10 h-10",
              userButtonTrigger: { buttonVariants },
            },
          }}
        />
      </SignedIn>
    </>
  );
}

export default AuthAction;
