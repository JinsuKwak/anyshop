import { useFetch } from "@/hooks/useFetch";
import { Product } from "@/Types/Product";
import { MainProductCardSkeleton } from "@/components/skeletons/MainProductCardSkeleton";
import { ErrorDisplay } from "@/components/ErrorDisplay";
import Link from "next/link";
import ProductCard from "./ProductCard";

const SETTING = process.env.NEXT_PUBLIC_SETTINGS;

type Size = "sm" | "md" | "lg";

interface MainProductsSectionProps {
  heading: string;
  link: string;
  fetchUrl: string;
}

function MainProductsSection({
  heading,
  link,
  fetchUrl,
}: MainProductsSectionProps) {
  const OPTIONS = {
    size: "lg" as Size,
  };

  const { data: products, error, loading } = useFetch<Product[]>(fetchUrl);

  // Grid
  const lgColsBySize: Record<Size, string> = {
    sm: "lg:grid-cols-6",
    md: "lg:grid-cols-5",
    lg: "lg:grid-cols-4",
  };

  // Gap
  const gapBySize: Record<Size, string> = {
    sm: "gap-3",
    md: "gap-4",
    lg: "gap-6",
  };

  // Medium
  const mdColsBySize: Record<Size, string> = {
    sm: "md:grid-cols-5",
    md: "md:grid-cols-3",
    lg: "md:grid-cols-2",
  };

  const gridClass = [
    "grid",
    mdColsBySize[OPTIONS.size],
    lgColsBySize[OPTIONS.size],
    gapBySize[OPTIONS.size],
    "p-4",
  ].join(" ");

  if (loading) {
    return (
      <div className={gridClass}>
        {Array.from({ length: 8 }).map((_, i) => (
          <MainProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full mx-auto mt-10">
        <ErrorDisplay message={error.message} className="aspect-4/1" />
      </div>
    );
  }

  if (!products || products.length === 0) return null;

  return (
    <div className="mt-10">
      <Link href={link} className="hover:underline">
        <h2 className="text-2xl font-bold mb-4">{heading}</h2>
      </Link>

      <div className={`${gridClass} `}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} size={OPTIONS.size} />
        ))}
      </div>
    </div>
  );
}

export default MainProductsSection;
