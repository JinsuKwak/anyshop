import { SquarePen } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ManagerEditButtonProps {
  href: string;
  className?: string;
  label: string;
}

function ManagerEditButton({
  href,
  className = "",
  label,
}: ManagerEditButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-1 rounded-md border bg-white/90 backdrop-blur px-3 py-1.5 text-xs font-medium shadow hover:ring-2 hover:ring-[var(--color-ring)] transition-all cursor-pointer supports-[backdrop-filter]:bg-background/10 hover:bg-background/40 ${className}`}
      aria-label={label}
    >
      <SquarePen className="h-4 w-4" />
      Edit
    </Link>
  );
}

export default ManagerEditButton;
