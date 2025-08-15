"use client";

import Link from "next/link";
import { MenuIcon } from "lucide-react";
import { Button } from "../../ui/button";
import AccountMenu from "./AccountMenu";
import { ROLE } from "@/utils/rolesUtil";
import CartMenu from "./CartMenu";

export default function UserActions() {
  const mockUser = {
    name: "Chris Nolan",
    avatarUrl: "https://i.pravatar.cc/80?img=12",
    role: ROLE.ADMIN, // "guest" | "member" | "manager" | "owner" | "admin"
  };

  return (
    <div className="flex items-center space-x-2">
      <CartMenu user={mockUser} />

      {/* Login */}
      <AccountMenu user={mockUser} onLogout={() => alert("Logged out")} />

      {/* Guest */}
      {/* <AccountMenu user={null} /> */}

      <Button variant="ghost" size="icon" className="flex md:hidden size-8">
        <MenuIcon className="size-6" />
      </Button>
    </div>
  );
}
