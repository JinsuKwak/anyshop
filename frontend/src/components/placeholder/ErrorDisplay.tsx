import { AlertTriangle } from "lucide-react";

interface ErrorDisplayProps {
  message: string;
  className?: string;
}

export function ErrorDisplay({
  message = "An unexpected error occurred.",
  className,
}: ErrorDisplayProps) {
  const baseClasses = `flex flex-col items-center justify-center p-6 m-4 mt-10 border rounded-lg ${className}`;

  return (
    <div
      className={`${baseClasses} text-neutral-400 border border-neutral-300`}
      role="alert"
    >
      <AlertTriangle className="w-12 h-12 mb-4" />
      <p className="text-lg font-semibold">Oops, something went wrong</p>
      <p className="text-sm">{message}</p>
    </div>
  );
}
