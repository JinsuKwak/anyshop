"use client";
import { MenuIcon } from "lucide-react";
import { Button } from "../../ui/button";
import AccountMenu from "./AccountMenu";
import CartMenu from "./CartMenu";

export default function UserActions() {
  return (
    <div className="flex items-center space-x-2">
      <CartMenu />

      {/* Login */}
      <AccountMenu />

      <Button variant="ghost" size="icon" className="flex md:hidden size-8">
        <MenuIcon className="size-6" />
      </Button>
    </div>
  );
}
