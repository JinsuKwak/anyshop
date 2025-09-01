"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import type { CategorySummary } from "@/types";

const SORT_OPTIONS = [
  "date-desc",
  "date-asc",
  "price-asc",
  "price-desc",
  "name-asc",
  "name-desc",
  "on-sale",
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number];

export const getSortLabel = (option: SortOption): string => {
  switch (option) {
    case "date-desc":
      return "Date: Newest";
    case "date-asc":
      return "Date: Oldest";
    case "price-asc":
      return "Price: Low to High";
    case "price-desc":
      return "Price: High to Low";
    case "name-asc":
      return "Name: A to Z";
    case "name-desc":
      return "Name: Z to A";
    case "on-sale":
      return "On Sale";
    default:
      return "Sort by";
  }
};

function getCategoryNameBySlug(
  slug: string,
  categories: CategorySummary[]
): string {
  if (slug === "on-sale") return "On Sale";
  const category = categories?.find((cat) => cat.slug === slug);
  return category ? category.name : "";
}

interface ProductControlsProps {
  categorySlug: string;
  allCategories: CategorySummary[];
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
}

export default function ProductControls({
  categorySlug,
  allCategories,
  sortOption,
  setSortOption,
}: ProductControlsProps) {
  const pageTitle = getCategoryNameBySlug(categorySlug, allCategories);

  return (
    <div className="space-y-4">
      {/* Breadcrumbs */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/products/all">Products</BreadcrumbLink>
          </BreadcrumbItem>
          {categorySlug !== "all" && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{pageTitle}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>

      {/* Title + Sort */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold tracking-tight">{pageTitle}</h1>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" aria-label="Change sort option">
              {getSortLabel(sortOption)}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              {SORT_OPTIONS.map((opt) => (
                <DropdownMenuItem
                  key={opt}
                  onSelect={() => setSortOption(opt)}
                  aria-selected={sortOption === opt}
                >
                  {getSortLabel(opt)}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
