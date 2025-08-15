import { Skeleton } from "@/components/ui/skeleton";

export function MainCarouselSkeleton() {
  return (
    <div className="w-full mx-auto mt-10">
      <Skeleton className="flex flex-col items-center justify-center rounded-lg aspect-4/1 " />
    </div>
  );
}
