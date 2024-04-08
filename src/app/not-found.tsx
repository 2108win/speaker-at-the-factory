"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function GlobalError() {
  const navigate = useRouter();

  return (
    <div className="!mb-auto mt-14 flex max-h-full flex-col items-center justify-center text-center md:mt-16 lg:mt-20">
      <span className="bg-gradient-to-b from-foreground to-transparent bg-clip-text text-[10rem] font-extrabold leading-none text-transparent">
        404
      </span>
      <h2 className="font-heading my-2 text-2xl font-bold">
        Something&apos;s missing
      </h2>
      <p>
        Sorry, the page you are looking for doesn&apos;t exist or has been
        moved.
      </p>
      <div className="mt-8 flex justify-center gap-2">
        <Button onClick={() => navigate.back} variant="default" size="lg">
          Go back
        </Button>
        <Button
          onClick={() => {
            navigate.push("/");
          }}
          variant="ghost"
          size="lg"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
}
