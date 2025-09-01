import { SquarePen } from "lucide-react";
import Link from "next/link";
import { ReactNode, ElementType } from "react";

type ButtonActionType = "default" | "action" | "destructive";

interface BaseProps {
  className?: string;
  children?: ReactNode;
  Icon?: ElementType;
  textOnly?: boolean;
  buttonActionType?: ButtonActionType;
}

interface LinkProps extends BaseProps {
  href: string;
  onClick?: never;
}

interface ButtonProps extends BaseProps {
  href?: never;
  onClick: () => void;
}

type ManagerActionButtonProps = LinkProps | ButtonProps;

const baseClass =
  "inline-flex items-center justify-center gap-1 rounded-md border px-3 py-1.5 text-xs font-medium shadow transition-all cursor-pointer min-w-17";

const actionStyles = {
  default:
    "bg-white/90 text-black hover:ring-2 hover:ring-[var(--color-ring)] supports-[backdrop-filter]:bg-background/10 hover:bg-background/40",
  action:
    "bg-primary text-white hover:ring-2 hover:ring-primary/60 supports-[backdrop-filter]:bg-primary hover:bg-primary/90",
  destructive:
    "bg-destructive text-white hover:ring-2 hover:ring-destructive/60 supports-[backdrop-filter]:bg-destructive hover:bg-destructive/90",
};

export default function ManagerActionButton(props: ManagerActionButtonProps) {
  const {
    className = "",
    children,
    Icon,
    textOnly = false,
    buttonActionType = "default",
  } = props;

  const appliedClass = `${baseClass} ${actionStyles[buttonActionType]} ${className}`;
  const iconElement = Icon ? (
    <Icon className="h-4 w-4" />
  ) : (
    <SquarePen className="h-4 w-4" />
  );

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={appliedClass}>
        {!textOnly && iconElement}
        {children ?? "Edit"}
      </Link>
    );
  }

  return (
    <button type="button" onClick={props.onClick} className={appliedClass}>
      {!textOnly && iconElement}
      {children ?? "Edit"}
    </button>
  );
}
