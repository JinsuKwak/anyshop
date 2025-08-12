import Link from "next/link";
import { MountainIcon } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="#" className="mr-6 flex items-center space-x-2">
          <MountainIcon className="h-6 w-6" />
          <span className="font-bold">Acme Inc</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link
            href="#"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            Products
          </Link>
          <Link
            href="#"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            About
          </Link>
          <Link
            href="#"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
