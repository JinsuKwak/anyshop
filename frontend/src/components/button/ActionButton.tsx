import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ActionButtonProps {
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  backgroundColor?: boolean;
  className?: string;
}

export function ActionButton({
  label,
  icon,
  onClick,
  backgroundColor,
  className = "",
}: ActionButtonProps) {
  const hasCustomColor = !!backgroundColor;
  const variant = hasCustomColor ? "default" : "outline";

  return (
    <Button variant={variant} onClick={onClick} className={className}>
      {icon}
      {label}
    </Button>
  );
}
