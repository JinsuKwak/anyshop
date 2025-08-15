"use client";

import MainCarousel from "@/components/carousel/MainCarousel";
import FeaturedProducts from "@/components/product/FeaturedProducts";
import OnSaleProducts from "@/components/product/OnSaleProducts";

export default function Home() {
  return (
    <div className="container py-10 space-y-12">
      <MainCarousel />
      <FeaturedProducts />
      <OnSaleProducts />
    </div>
  );
}
