"use client";

import React from "react";
import { use } from "react";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = use(params);
  return <p className="mt-30">{id}</p>;
}

export default ProductDetailPage;
