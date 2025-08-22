"use client";

import LogoAndLinks from "./modules/LogoAndLinks";
import SearchBar from "./modules/SearchBar";
import UserActions from "./modules/UserActions";
import PromoMarquee from "./../marquee/PromoMarquee";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <PromoMarquee
        items={[
          "🎉 15% OFF with code HELLO15",
          "🚚 Free shipping over $50",
          "🕒 Flash sale ends tonight!",
        ]}
        speedSec={18}
      />
      <div className="container flex h-14 items-center">
        <nav className="flex items-center justify-between w-full">
          <LogoAndLinks />
          <SearchBar />
          <UserActions />
        </nav>
      </div>
    </header>
  );
}
