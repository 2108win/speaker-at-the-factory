import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div>
      <h1>404</h1>
      <p>Trang bạn tìm kiếm không tồn tại.</p>
      <Button onClick={handleGoBack}>Go back</Button>
    </div>
  );
};

export default NotFoundPage;
