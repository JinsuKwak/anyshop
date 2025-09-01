import ProductsPageClient from "./ProductsPageClient";
import type { Category } from "@/types/Category";
import { ErrorDisplay } from "@/components/placeholder/ErrorDisplay";

export default async function Page({
  params,
}: {
  params: { category: string };
}) {
  const { category } = await params;

  let categories: Category[] = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STORE_API}/api/categories`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} - ${res.statusText}`);
    }

    categories = await res.json();
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : "Unknown error";
    return (
      <div className="w-full mx-auto mt-10 container mt-30">
        <ErrorDisplay message={errorMessage} className="h-[50vh]" />
      </div>
    );
  }

  const allCategories = [
    { slug: "all", name: "All Products" },
    ...categories.map((c) => ({ slug: c.slug, name: c.name })),
    { slug: "others", name: "Others" },
  ];

  return (
    <ProductsPageClient categorySlug={category} allCategories={allCategories} />
  );
}
