import React from "react";
import { Skeleton } from "../ui/skeleton";

interface PageSkeletionProps {
  message?: string;
  className?: string;
}

function PageSkeletion({
  message = "loading...",
  className,
}: PageSkeletionProps) {
  const baseClasses = `flex flex-col items-center justify-center border rounded-lg ${className}`;
  return (
    <Skeleton
      className={`flex flex-col items-center justify-center w-full mx-auto mt-10 ${baseClasses}`}
    ></Skeleton>
  );
}

export default PageSkeletion;
