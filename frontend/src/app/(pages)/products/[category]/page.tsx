import ProductsPageClient from "./ProductsPageClient";
import type { Category } from "@/types/Category";

export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STORE_API}/api/categories`,
    { cache: "no-store" }
  );
  const categories: Category[] = await res.json();

  const allCategories = [
    { slug: "all", name: "All Products" },
    ...categories.map((c) => ({ slug: c.slug, name: c.name })),
    { slug: "others", name: "Others" },
  ];

  return (
    <ProductsPageClient categorySlug={category} allCategories={allCategories} />
  );
}
