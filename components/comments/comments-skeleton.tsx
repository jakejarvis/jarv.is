import { Skeleton } from "@/components/ui/skeleton";

const CommentsSkeleton = () => {
  return (
    <>
      <Skeleton className="h-32 w-full" />

      <div className="flex gap-4">
        <Skeleton className="size-8 rounded-full md:size-10" />
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
          <Skeleton className="h-20 w-full" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-8" />
          </div>
        </div>
      </div>
    </>
  );
};

export { CommentsSkeleton };
