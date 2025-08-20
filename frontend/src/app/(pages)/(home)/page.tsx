"use client";

import MainCarousel from "@/components/carousel/MainCarousel";
import MainProductsSection from "@/components/product/MainProductsSection";
import MainCategorySection from "@/components/category/MainCategorySection";

export default function Home() {
  return (
    <div className="container py-10 space-y-12">
      <MainCarousel />
      <MainProductsSection
        heading={"Featured Products"}
        link={"/products/all"}
        editLink={"/manager/main-featured-products"}
        fetchUrl={"/main-featured-products"}
      />
      <MainProductsSection
        heading={"On Sale"}
        link={"/products/sales"}
        editLink={"/manager/main-sales-products"}
        fetchUrl={"/main-sales-products"}
      />
      <MainCategorySection />
    </div>
  );
}
