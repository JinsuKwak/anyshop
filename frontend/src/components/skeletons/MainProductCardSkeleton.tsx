import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function MainProductCardSkeleton() {
  return (
    <Card className="overflow-hidden animate-pulse">
      <Skeleton className="w-full h-48 bg-gray-300" />
      <CardHeader>
        <Skeleton className="h-6 w-3/4 bg-gray-300" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-1/2 bg-gray-300" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-8 w-1/3 bg-gray-300" />
      </CardFooter>
    </Card>
  );
}
