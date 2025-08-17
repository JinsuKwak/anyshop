import React from "react";
import { Image as ImageIcon } from "lucide-react";

interface NoImageDisplayProps {
  className?: string;
  flat?: boolean;
}

function NoImageDisplay({ className, flat = false }: NoImageDisplayProps) {
  const baseClasses = `flex flex-col items-center justify-center p-6 border ${
    flat ? "rounded-t-lg" : "rounded-lg"
  } ${className} `;
  return (
    <div
      className={`${baseClasses} bg-[var(--color-background)] text-[var(--color-muted-foreground)] border-border`}
      role="alert"
    >
      <ImageIcon className="w-12 h-12" strokeWidth={1.4} />
      <p className="text-lg font-semibold">No Image</p>
    </div>
  );
}

export default NoImageDisplay;
