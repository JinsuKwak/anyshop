import Link from "next/link";
import { ShoppingCart as ShoppingCartIcon, ChevronRight } from "lucide-react";
import { Button } from "../../ui/button";
import { ROLE, type RoleLevel } from "@/utils/rolesUtil";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

type CartItem = {
  title: string;
  price: string;
};

type CartMenuProps = {
  user?: {
    name?: string;
    avatarUrl?: string;
    role?: RoleLevel;
  } | null;

  items?: CartItem[];
  totalLabel?: string;
};

export default function CartMenu({
  user,
  items = [],
  totalLabel,
}: CartMenuProps) {
  const isAuthed = !!user && user?.role !== ROLE.GUEST;
  const isEmpty = items.length === 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Link href="#" className="mr-6 flex items-center space-x-2">
          <Button
            variant="secondary"
            size="icon"
            className="hidden md:flex size-8 cursor-pointer hover:ring-2 hover:ring-[var(--color-ring)] transition-all border shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/10 hover:bg-background/40"
            aria-label="Open cart"
          >
            <ShoppingCartIcon className="h-6 w-6" />
          </Button>
        </Link>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-72" align="end" sideOffset={8}>
        <DropdownMenuLabel className="flex items-center justify-between h-10">
          <span>Cart</span>
          {!isEmpty && totalLabel ? (
            <span className="text-sm text-foreground/60">{totalLabel}</span>
          ) : null}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {isEmpty ? (
            <DropdownMenuItem
              disabled
              className="flex flex-col items-center justify-center py-6 gap-1 opacity-75"
            >
              <ShoppingCartIcon className="h-8 w-8 mb-1" />
              <span className="text-sm font-medium">Your cart is empty</span>
              <span className="text-xs text-muted-foreground">
                Start adding items to see them here
              </span>
            </DropdownMenuItem>
          ) : (
            <div className="max-h-64 overflow-auto px-1 py-1">
              {items.map((it, idx) => (
                <DropdownMenuItem
                  key={idx}
                  className="flex items-center justify-between gap-2"
                >
                  <div className="min-w-0">
                    <div className="font-medium truncate">{it.title}</div>
                    <div className="text-sm text-foreground/60">{it.price}</div>
                  </div>
                  <ChevronRight className="size-4 shrink-0 opacity-60" />
                </DropdownMenuItem>
              ))}
            </div>
          )}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <div className="p-2 grid gap-2">
          {isAuthed ? (
            <>
              <Button asChild className="w-full">
                <Link
                  href="/checkout"
                  className="flex items-center justify-between"
                >
                  <span>Checkout</span>
                  <ChevronRight className="size-4 opacity-80" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link
                  href="/cart"
                  className="flex items-center justify-between"
                >
                  <span>View Cart</span>
                  <ChevronRight className="size-4 opacity-80" />
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Button asChild className="w-full">
                <Link
                  href="/checkout/guest"
                  className="flex items-center justify-between"
                >
                  <span>Checkout as Guest</span>
                  <ChevronRight className="size-4 opacity-80" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link
                  href="/auth/sign-in"
                  className="flex items-center justify-between"
                >
                  <span>Log in for faster checkout</span>
                  <ChevronRight className="size-4 opacity-80" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link
                  href="/cart"
                  className="flex items-center justify-between"
                >
                  <span>View Cart</span>
                  <ChevronRight className="size-4 opacity-80" />
                </Link>
              </Button>
            </>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
