import AuthModal from "@/components/modal/auth-modal";
import React, { Suspense } from "react";
import Loading from "../../components/ui/loading";
import { Button } from "@/components/ui/button";

type Props = {};

const ContactPage = (props: Props) => {
  return (
    <Suspense fallback={<Loading />}>
      <AuthModal trigger={<Button>Đăng nhập</Button>} />
    </Suspense>
  );
};

export default ContactPage;
