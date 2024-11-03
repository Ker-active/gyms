import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="space-y-4">
        <Skeleton className="h-12 w-3/4 sm:w-1/2 md:w-1/3" />
        <Skeleton className="h-6 w-full sm:w-3/4 md:w-2/3" />
        <Skeleton className="h-6 w-full sm:w-3/4 md:w-2/3" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="space-y-4">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>

      <div className="flex justify-center space-x-4">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  );
}
