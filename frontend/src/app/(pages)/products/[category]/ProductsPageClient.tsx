"use client";

import { useState } from "react";
import ProductControls, {
  SortOption,
} from "@/components/product/ProductControls";
import ProductFilters from "@/components/product/ProductFilters";
import ProductGrid from "@/components/product/ProductGrid";
import TwoColumnLayout from "@/layouts/TwoColumnLayout";
import type { CategorySummary } from "@/types";

interface ProductsPageClientProps {
  categorySlug: string;
  allCategories: CategorySummary[];
}

export default function ProductsPageClient({
  categorySlug,
  allCategories,
}: ProductsPageClientProps) {
  const [sortOption, setSortOption] = useState<SortOption>("date-desc");

  return (
    <TwoColumnLayout
      left={<ProductFilters allCategories={allCategories} />}
      right={
        <>
          <ProductControls
            categorySlug={categorySlug}
            allCategories={allCategories}
            sortOption={sortOption}
            setSortOption={setSortOption}
          />
          <ProductGrid categorySlug={categorySlug} sortOption={sortOption} />
        </>
      }
    />
  );
}
