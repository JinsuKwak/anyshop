import Link from "next/link";
import { MountainIcon } from "lucide-react";

export default function LogoAndLinks() {
  return (
    <div className="flex items-center space-x-6 text-sm font-medium">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <MountainIcon className="h-6 w-6 text-primary" />
        <span className="font-bold hidden sm:flex text-primary">Acme Inc</span>
      </Link>
      <div className="[@media(max-width:1000px)]:hidden flex items-center space-x-6">
        <Link
          href="/products/all"
          className="text-foreground/60 transition-colors hover:text-foreground/80 "
          prefetch={true}
        >
          Products
        </Link>
        <Link
          href="/contents/about"
          className="text-foreground/60 transition-colors hover:text-foreground/80"
          prefetch={false}
        >
          About
        </Link>
        <Link
          href="/contents/contact"
          className="text-foreground/60 transition-colors hover:text-foreground/80"
          prefetch={false}
        >
          Contact
        </Link>
      </div>
    </div>
  );
}
