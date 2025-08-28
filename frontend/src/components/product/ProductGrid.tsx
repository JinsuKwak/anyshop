"use client";

import { useState, useEffect, useMemo } from "react";
import type { Product } from "@/types/Product";
import ProductCard from "@/components/card/product/ProductCard";
import { MainProductCardSkeleton } from "@/components/skeletons/MainProductCardSkeleton";
import { ErrorDisplay } from "../placeholder/ErrorDisplay";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useFetch } from "@/hooks/useFetch";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { useAuth } from "@/hooks/useAuth";
import { ROLE } from "@/utils/rolesUtil";
import AddItemDisplay from "../placeholder/AddItemDisplay";
import { Plus } from "lucide-react";

const PRODUCTS_PER_PAGE = 12;

interface ProductGridProps {
  categorySlug: string;
  sortOption: string;
}

export default function ProductGrid({
  categorySlug,
  sortOption,
}: ProductGridProps) {
  const appState = useSelector((state: RootState) => state.app); // TODO for admin group check list, require secected slice
  const queryString = categorySlug === "all" ? "" : `?category=${categorySlug}`; // TODO for sales
  const {
    data: products,
    error,
    loading,
  } = useFetch<Product[]>(`api/products/${queryString}`);
  const { isAuthenticated, role } = useAuth(); // TODO for admin group check list
  const [currentPage, setCurrentPage] = useState(1);

  const SortedProducts = useMemo(() => {
    if (!products || products.length <= 1) return products ?? [];

    let sorted = [...products].sort((a, b) => {
      switch (sortOption) {
        //TODO CREATE INDEX idx_products_created_desc ON products (created_at DESC);
        case "date-asc": {
          const dateA = new Date(a.created_at).getTime();
          const dateB = new Date(b.created_at).getTime();
          return dateA - dateB;
        }
        case "date-desc": {
          const dateA = new Date(a.created_at).getTime();
          const dateB = new Date(b.created_at).getTime();
          return dateB - dateA;
        }
        case "price-asc":
          return a.final_price_cents - b.final_price_cents;
        case "price-desc":
          return b.final_price_cents - a.final_price_cents;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    if (sortOption === "on-sale") {
      sorted = sorted.filter((p) => p.on_discount);
    }

    return sorted;
  }, [products, sortOption]);

  useEffect(() => {
    setCurrentPage(1);
  }, [categorySlug, sortOption]);

  const totalPages = Math.ceil(SortedProducts.length / PRODUCTS_PER_PAGE);
  const currentProducts = SortedProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <MainProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return <ErrorDisplay message={error.message} className={"h-full"} />;
  }

  if (currentProducts.length === 0) {
    if (isAuthenticated && role >= ROLE.MANAGER) {
      return (
        <AddItemDisplay
          //TODO at mamager/add-pruduct page detect [on-sale, (all, others), search] keyword
          editLink={`/manager/add-product?category=${categorySlug}`}
          className="min-h-[50vh]"
          AddIcon={Plus}
          message="No products found. Click to add a new product."
        />
      );
    }

    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-lg font-semibold text-muted-foreground">
          No products found.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(Math.max(1, currentPage - 1));
                }}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(i + 1);
                  }}
                  isActive={currentPage === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(Math.min(totalPages, currentPage + 1));
                }}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
}
