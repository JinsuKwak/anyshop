import { useFetch } from "@/hooks/useFetch";
import { Product } from "@/types/Product";
import { MainProductCardSkeleton } from "@/components/skeletons/MainProductCardSkeleton";
import { ErrorDisplay } from "@/components/placeholder/ErrorDisplay";
import Link from "next/link";
import ProductCard from "../card/product/ProductCard";
import { CardSize } from "@/lib/redux/slices/appSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import ManagerEditButton from "../ui/ManagerEditButton";
import { useAuth } from "@/hooks/useAuth";
import { ROLE } from "@/utils/rolesUtil";

interface MainProductsSectionProps {
  heading: string;
  link: string;
  editLink: string;
  fetchUrl: string;
}

function MainProductsSection({
  heading,
  link,
  editLink,
  fetchUrl,
}: MainProductsSectionProps) {
  const appState = useSelector((state: RootState) => state.app);
  const OPTIONS = {
    cardSize: appState.options.cardSize,
  };

  const { data: products, error, loading } = useFetch<Product[]>(fetchUrl);
  const { isAuthenticated, role } = useAuth();

  // Grid
  const lgColsBySize: Record<CardSize, string> = {
    sm: "lg:grid-cols-6",
    md: "lg:grid-cols-5",
    lg: "lg:grid-cols-4",
  };

  // Gap
  const gapBySize: Record<CardSize, string> = {
    sm: "gap-3",
    md: "gap-4",
    lg: "gap-6",
  };

  // Medium
  const mdColsBySize: Record<CardSize, string> = {
    sm: "md:grid-cols-5",
    md: "md:grid-cols-3",
    lg: "md:grid-cols-2",
  };

  const gridClass = [
    "grid",
    mdColsBySize[OPTIONS.cardSize],
    lgColsBySize[OPTIONS.cardSize],
    gapBySize[OPTIONS.cardSize],
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
      <div className="flex items-center justify-between mb-4">
        <Link href={link} className="hover:underline">
          <h2 className="text-2xl font-bold">{heading}</h2>
        </Link>

        {isAuthenticated && role >= ROLE.MANAGER && (
          <ManagerEditButton
            href={editLink}
            label="Edit"
            className="ml-4 mr-6"
          />
        )}
      </div>

      <div className={`${gridClass} `}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            cardSize={OPTIONS.cardSize}
          />
        ))}
      </div>
    </div>
  );
}

export default MainProductsSection;
