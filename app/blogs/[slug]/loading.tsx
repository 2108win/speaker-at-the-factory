import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="z-[5] h-full w-full">
      <div className="space-y-2 p-4 md:p-8">
        <Skeleton className="text-center h-6" />
        <div className="space-y-6 pt-6 max-w-screen-lg mx-auto">
          <Skeleton className="h-12 w-4/5 mx-auto" />
          <Skeleton className="aspect-[5/2] w-full mx-auto" />
          <>
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-1/2" />
          </>
        </div>
      </div>
    </div>
  );
};

export default Loading;
