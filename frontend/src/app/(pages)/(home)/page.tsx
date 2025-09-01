import MainCarousel from "@/components/carousel/MainCarousel";
import MainCardsSection from "@/components/card/MainCardSection";

export default function Home() {
  return (
    <div className="container py-10 space-y-12">
      <MainCarousel editLink="/manager/main-display" />
      <MainCardsSection
        isTop={true}
        entityType="product"
        heading={"Featured Products"}
        link={"/products/all"}
        editLink={"/manager/main-featured-products"}
        fetchUrl={"api/main-featured-products"}
      />
      <MainCardsSection
        entityType="product"
        heading={"Top Deals"}
        link={"/products/sales"}
        editLink={"/manager/main-sales-products"}
        fetchUrl={"api/main-sales-products"}
      />
      <MainCardsSection
        entityType="category"
        heading={"Shop by Category"}
        link={"/category/all"}
        editLink={"/manager/categories"}
        fetchUrl={"api/categories"}
      />
      <div className="mb-10" />
    </div>
  );
}
