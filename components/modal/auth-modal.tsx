"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AuthSignIn from "../auth-sign-in";
interface AuthModalProps {
  className?: string;
  trigger?: React.ReactNode;
}

export default function AuthModal({ className, trigger }: AuthModalProps) {
  return (
    <Dialog>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className={`${className}`}>
        <AuthSignIn />
      </DialogContent>
    </Dialog>
  );
}
