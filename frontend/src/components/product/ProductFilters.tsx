"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/useFetch";
import type { Category } from "@/types/Category";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { useAuth } from "@/hooks/useAuth";
import { CategorySummary } from "@/app/(pages)/products/[category]/ProductsPageClient";

interface ProductFiltersProps {
  allCategories: CategorySummary[];
}

export default function ProductFilters({ allCategories }: ProductFiltersProps) {
  const { isAuthenticated, role } = useAuth(); // TODO for admin group check list
  const appState = useSelector((state: RootState) => state.app); // TODO for admin group check list, require secected slice

  const pathname = usePathname();
  const activeCategory = pathname.split("/").pop();

  return (
    <aside className="space-y-4">
      <div>
        <h3 className="font-semibold mb-2">Shop by Category</h3>
        <div className="flex flex-col space-y-1">
          {allCategories.map((category) => (
            <Link
              href={`/products/${category.slug}`}
              key={category.slug}
              passHref
            >
              <Button
                variant={
                  activeCategory === category.slug ? "secondary" : "ghost"
                }
                className="w-full justify-start"
              >
                {category.name}
              </Button>
            </Link>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Deals</h3>
        <div className="flex flex-col space-y-1">
          <Link href="/products/on-sale" passHref>
            <Button
              variant={activeCategory === "on-sale" ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              On Sale
            </Button>
          </Link>
        </div>
      </div>
    </aside>
  );
}
