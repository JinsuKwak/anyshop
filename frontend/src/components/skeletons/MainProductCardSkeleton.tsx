import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function MainProductCardSkeleton() {
  return (
    <Card className="overflow-hidden animate-pulse pt-0">
      <Skeleton className="w-full h-48 " />
      <CardHeader className="">
        <Skeleton className="h-6 w-3/4 " />
      </CardHeader>
      <CardContent className="">
        <Skeleton className="h-8 w-1/2  p-1" />
      </CardContent>
      <CardFooter className="">
        <Skeleton className="h-8 w-1/3 pt-1" />
      </CardFooter>
    </Card>
  );
}
