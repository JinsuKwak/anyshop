import { useFetch } from "@/hooks/useFetch";
import { Product } from "@/types/Product";
import { Category } from "@/types/Category";
import { MainProductCardSkeleton } from "@/components/skeletons/MainProductCardSkeleton";
import { ErrorDisplay } from "@/components/placeholder/ErrorDisplay";
import Link from "next/link";
import ProductCard from "./product/ProductCard";
import CategoryCard from "./category/CategoryCard";
import { CardSize } from "@/lib/redux/slices/appSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import ManagerEditButton from "../ui/ManagerEditButton";
import { useAuth } from "@/hooks/useAuth";
import AddItemDisplay from "../placeholder/AddItemDisplay";
import { Plus } from "lucide-react";
import { ROLE } from "@/utils/rolesUtil";

type BaseProps = {
  isTop?: boolean; // Optional prop to indicate if this is a top section
  heading: string;
  link: string;
  editLink: string;
  fetchUrl: string;
};

type MainCardsSectionProps =
  | (BaseProps & { entityType: "product" })
  | (BaseProps & { entityType: "category" });

function MainCardsSection(props: MainCardsSectionProps) {
  const { isTop, heading, link, editLink, fetchUrl, entityType } = props;

  const appState = useSelector((state: RootState) => state.app);
  const OPTIONS = { cardSize: appState.options.cardSize as CardSize };

  const { data, error, loading } = useFetch<Product[] | Category[]>(fetchUrl);
  const { isAuthenticated, role } = useAuth();

  // Grid class
  const lgColsBySize: Record<CardSize, string> = {
    sm: "lg:grid-cols-6",
    md: "lg:grid-cols-5",
    lg: "lg:grid-cols-4",
  };
  const gapBySize: Record<CardSize, string> = {
    sm: "gap-3",
    md: "gap-4",
    lg: "gap-6",
  };
  const mdColsBySize: Record<CardSize, string> = {
    sm: "md:grid-cols-5",
    md: "md:grid-cols-3",
    lg: "md:grid-cols-2",
  };

  const baseCols = entityType === "category" ? "grid-cols-2" : "";

  const gridClass = [
    "grid",
    baseCols,
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

  if (!data || data.length === 0) {
    if (isAuthenticated && role >= 2) {
      return (
        <AddItemDisplay
          editLink={editLink}
          className={"aspect-4/1"}
          AddIcon={Plus}
          message="No items found. Click to add a new item."
        />
      );
    } else {
      return null;
    }
  }
  return (
    <div className={`${isTop ? "sm:mt-10" : "mt-10"}`}>
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

      <div className={gridClass}>
        {entityType === "product"
          ? (data as Product[]).map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                cardSize={OPTIONS.cardSize}
              />
            ))
          : (data as Category[]).map((item) => (
              <CategoryCard
                key={item.id}
                category={item}
                cardSize={OPTIONS.cardSize}
              />
            ))}
      </div>
    </div>
  );
}

export default MainCardsSection;
