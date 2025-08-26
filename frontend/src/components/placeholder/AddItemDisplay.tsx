import React from "react";
import Link from "next/link";

interface AddItemDisplayProps {
  editLink: string;
  className?: string;
  AddIcon: React.ComponentType<{ className?: string }>;
  message?: string;
}

function AddItemDisplay({
  editLink,
  className,
  AddIcon,
  message,
}: AddItemDisplayProps) {
  const baseClasses =
    "flex flex-col items-center justify-center p-6 m-4 mt-10 border border-dashed rounded-lg cursor-pointer transition hover:text-neutral-500";

  return (
    <Link
      href={editLink}
      className={`${baseClasses} ${
        className ?? ""
      }  text-neutral-400 border border-neutral-300`}
    >
      <AddIcon className="w-12 h-12 mb-4" />
      <p className="text-sm">{message ?? "Click to add"}</p>
    </Link>
  );
}

export default AddItemDisplay;
