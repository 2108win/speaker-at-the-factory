import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import React from "react";

function Loading() {
  return (
    <ul className="grid grid-cols-1 w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array(5)
        .fill(0)
        .map((_, idx) => (
          <li key={idx} className={cn("space-y-2", idx == 4 ? "col-span-2" : "col-span-1")}>
            <Skeleton className="h-40 rounded-lg w-full bg-neutral-950/10"></Skeleton>
            <Skeleton className="bg-neutral-950/10 first-letter:h-6 w-3/4"></Skeleton>
            <Skeleton className="bg-neutral-950/10 h-6"></Skeleton>
          </li>
        ))}
    </ul>
  );
}

export default Loading;
