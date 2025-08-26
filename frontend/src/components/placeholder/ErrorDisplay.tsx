import { AlertTriangle } from "lucide-react";

interface ErrorDisplayProps {
  red?: boolean;
  message: string;
  className?: string;
}

export function ErrorDisplay({
  red = false,
  message = "An unexpected error occurred.",
  className,
}: ErrorDisplayProps) {
  const baseClasses = `flex flex-col items-center justify-center p-6 m-4 mt-10 border rounded-lg ${className}`;

  if (red) {
    return (
      <div
        className={`${baseClasses} bg-red-50 border-red-200 text-red-700`}
        role="alert"
      >
        <AlertTriangle className="w-12 h-12 mb-4" />
        <p className="text-lg font-semibold">Oops, something went wrong</p>
        <p className="text-sm">{message}</p>
      </div>
    );
  }

  return (
    <div
      className={`${baseClasses} bg-[var(--color-background)] text-[var(--color-muted-foreground)] border-border`}
      role="alert"
    >
      <AlertTriangle className="w-12 h-12 mb-4" />
      <p className="text-lg font-semibold">Oops, something went wrong</p>
      <p className="text-sm">{message}</p>
    </div>
  );
}
