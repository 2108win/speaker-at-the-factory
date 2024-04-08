import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <>
      <Skeleton className="h-10 w-1/3" />
      <div className="space-y-6 pt-6">
        <Skeleton className="mx-auto h-20 w-1/2 text-center"></Skeleton>
        <Skeleton className="h-[60px] w-full"></Skeleton>
        <Skeleton className="h-[60px] w-[90%]"></Skeleton>
        <Skeleton className="h-[60px] w-full"></Skeleton>
        <Skeleton className="h-[60px] w-[80%]"></Skeleton>
        <Skeleton className="h-[60px] w-[50%]"></Skeleton>
      </div>
    </>
  );
}
