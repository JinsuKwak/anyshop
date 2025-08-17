import Link from "next/link";
import { MountainIcon } from "lucide-react";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import CategoryDrawer from "./CategroyDrawer";

export default function LogoAndLinks() {
  return (
    <div className="flex items-center space-x-6 text-sm font-medium">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <MountainIcon className="h-6 w-6" />
        <span className="font-bold hidden sm:flex">Acme Inc</span>
      </Link>
      <div className="hidden md:flex items-center space-x-6">
        <Drawer>
          <DrawerTrigger asChild>
            <div className="text-foreground/60 transition-colors hover:text-foreground/80 cursor-pointer">
              Products
            </div>
          </DrawerTrigger>
          <CategoryDrawer />
        </Drawer>
        <Link
          href="/about"
          className="text-foreground/60 transition-colors hover:text-foreground/80"
          prefetch={false}
        >
          About
        </Link>
        <Link
          href="/contact"
          className="text-foreground/60 transition-colors hover:text-foreground/80"
          prefetch={false}
        >
          Contact
        </Link>
      </div>
    </div>
  );
}
