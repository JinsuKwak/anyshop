"use client";

import { useState } from "react";
import ProductControls, {
  SortOption,
} from "@/components/product/ProductControls";
import ProductFilters from "@/components/product/ProductFilters";
import ProductGrid from "@/components/product/ProductGrid";

export type CategorySummary = { slug: string; name: string };

export default function ProductsPageClient({
  categorySlug,
  allCategories,
}: {
  categorySlug: string;
  allCategories: CategorySummary[];
}) {
  const [sortOption, setSortOption] = useState<SortOption>("date-desc");

  return (
    <div className="container py-10">
      <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-6 gap-6 md:gap-8">
        <aside className="col-span-1 order-2 md:order-1 md:sticky md:top-20 md:self-start mb-6 md:mb-0">
          <ProductFilters allCategories={allCategories} />
        </aside>

        <div className="col-span-1 order-1 md:order-2  md:col-span-4 lg:col-span-5 space-y-8 mb-14 md:mb-0">
          <ProductControls
            categorySlug={categorySlug}
            allCategories={allCategories}
            sortOption={sortOption}
            setSortOption={setSortOption}
          />
          <ProductGrid categorySlug={categorySlug} sortOption={sortOption} />
        </div>
      </div>
    </div>
  );
}
