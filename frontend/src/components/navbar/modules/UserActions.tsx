import AccountMenu from "./AccountMenu";
import CartMenu from "./CartMenu";
import MobileNavOverlay from "../../overlays/MobileNavOverlay";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";

export default function UserActions() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="flex items-center space-x-2">
      <CartMenu />
      <AccountMenu />

      <Button
        variant="ghost"
        size="icon"
        className="flex md:hidden size-8"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <MenuIcon className="size-6" />
      </Button>

      <MobileNavOverlay
        isOpen={open}
        onClose={() => setOpen(false)}
        links={[
          { href: "/products/all", label: "Products", prefetch: true },
          { href: "/about", label: "About", prefetch: false },
          { href: "/contact", label: "Contact", prefetch: false },
          { href: "/cart", label: "Cart", prefetch: false },
        ]}
      />
    </div>
  );
}
