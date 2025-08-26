"use client";

import { useRouter } from "next/navigation";
import { Card } from "../../ui/card";
import Image from "next/image";
import NoImageDisplay from "../../placeholder/NoImageDisplay";
import React from "react";
import { CardSize } from "@/lib/redux/slices/appSlice";
import { Category } from "@/types/Category";
import { useState } from "react";

interface ProductCardProps {
  cardSize?: CardSize;
  category: Category;
}

function ProductCard({ category }: ProductCardProps) {
  const router = useRouter();
  const [imgError, setImgError] = useState(false);

  const goDetail = () => router.push(`/category/${category.slug}`);

  return (
    <Card
      className={`overflow-hidden p-0 h-full relative
    transition-all duration-300 ease-out
    hover:shadow-lg hover:scale-[1.02]`}
    >
      <div
        role="link"
        tabIndex={0}
        onClick={goDetail}
        onKeyDown={(e) => e.key === "Enter" && goDetail()}
        className="cursor-pointer h-full flex flex-col"
      >
        {/* Image */}
        <div className="relative w-full h-48 overflow-hidden">
          {category.image_url && !imgError ? (
            <Image
              src={category.image_url}
              alt={category.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-48 bg-[var(--border)]">
              <NoImageDisplay className="w-full h-48" flat />
            </div>
          )}
        </div>
        {/* Contents */}
        <div className="flex flex-1 gap-2 lg:flex-col p-4 lg:pb-3 min-h-20  lg:justify-between">
          <div className={`flex w-full`}>
            <h3 className="font-bold text-lg line-clamp-2">{category.name}</h3>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default ProductCard;
