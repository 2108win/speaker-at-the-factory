import { cn } from "@/lib/utils";
import React from "react";

function Loading({ className }: { className?: string }) {
  return (
    <div className="flex items-center justify-center">
      <span className={cn("loading loading-spinner loading-xs", className)}></span>
    </div>
  );
}

export default Loading;
