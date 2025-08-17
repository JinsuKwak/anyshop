"use client";

import MainCarousel from "@/components/carousel/MainCarousel";
import MainProducts from "@/components/product/MainProducts";

export default function Home() {
  return (
    <div className="container py-10 space-y-12">
      <MainCarousel />
      <MainProducts
        heading={"Featured Products"}
        link={"/products/all"}
        fetchUrl={"/main-featured-products"}
      />
      <MainProducts
        heading={"On Sale"}
        link={"/products/sales"}
        fetchUrl={"/main-sales-products"}
      />
    </div>
  );
}
