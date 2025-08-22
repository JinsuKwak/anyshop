"use client";

import { useRouter } from "next/navigation";
import { Card, CardFooter } from "../../ui/card";
import type { Product } from "@/Types/Product";
import Image from "next/image";
import NoImageDisplay from "../../NoImageDisplay";
import LinkMadeBy from "./LinkMadeBy";
import React from "react";
import { oswald } from "@/app/fonts";
import { formatPrice } from "@/utils/stringUtil";
import { CardSize } from "@/lib/redux/slices/appSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { useState } from "react";

interface ProductCardProps {
  cardSize?: CardSize;
  product: Product;
}

function ProductCard({ cardSize = "lg", product }: ProductCardProps) {
  const router = useRouter();
  const [imgError, setImgError] = useState(false);
  const appState = useSelector((state: RootState) => state.app);

  const OPTIONS = {
    showMadeBy: appState.options.showMadeBy,
    showSKU: appState.options.showSKU,
    showOnDiscount: appState.options.showOnDiscount,
    isRed: appState.options.isRed,
    showSoldOut: appState.options.showSoldOut,
  };

  const flexWidth = cardSize === "lg" ? "w-[70%]" : "w-[60%]";

  const discountLabel =
    product.discount_type === "percent"
      ? `-${product.discount_percent ?? 0}%`
      : `-${formatPrice(product.discount_amount_cents ?? 0)}`;

  const goDetail = () => router.push(`/products/${product.id}`);

  const formattedFinalPrice = formatPrice(product.final_price_cents);
  const [final_dollars, final_cents] = formattedFinalPrice.split(".");
  const formattedOriginalPrice = formatPrice(product.price_cents);

  let meta: React.ReactNode[] = [];

  if (OPTIONS.showSKU && OPTIONS.showMadeBy) {
    meta = ["\u00A0", "\u00A0"];
  } else if (OPTIONS.showSKU || OPTIONS.showMadeBy) {
    meta = ["\u00A0"];
  }

  if (OPTIONS.showSKU) {
    meta[0] = product.sku ? <>SKU: {product.sku}</> : "\u00A0";
  }
  if (OPTIONS.showMadeBy) {
    const madeByNode = product.made_by ? (
      <LinkMadeBy key="madeby" made_by={product.made_by} />
    ) : (
      "\u00A0"
    );

    if (OPTIONS.showSKU) {
      if (!product.sku) {
        meta[0] = madeByNode;
      } else {
        meta[1] = madeByNode;
      }
    } else {
      meta[0] = madeByNode;
    }
  }
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
          {product.product_thumbnailUrl && !imgError ? (
            <Image
              src={product.product_thumbnailUrl}
              alt={product.name}
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

          {/* SALE Badge */}
          {OPTIONS.showOnDiscount && product.on_discount && (
            <div
              className={`absolute top-2 right-2 ${
                OPTIONS.isRed ? "bg-red-500" : "bg-[var(--color-primary)]"
              } text-white text-xs font-bold px-2 py-1 rounded-md shadow`}
            >
              SALE
            </div>
          )}
        </div>

        {/* Contents */}
        <div className="flex flex-1 gap-2 lg:flex-col p-4 lg:pb-3 min-h-20  lg:justify-between">
          {/* Name / Meta */}
          <div className={`flex ${flexWidth} lg:w-full`}>
            <div className={`${flexWidth} flex-1`}>
              <h3 className="font-bold text-md line-clamp-2 leading-5">
                {product.name}
              </h3>

              {meta.length > 0 && (
                <div className="flex flex-col mt-1 text-xs text-gray-600 truncate">
                  {meta.map((content, i) => (
                    <p key={i} className="last:mb-2 leading-xs">
                      {content}
                    </p>
                  ))}
                </div>
              )}
            </div>
            {OPTIONS.showOnDiscount && product.on_discount && (
              <span
                className="hidden lg:inline-flex items-center rounded-full px-2 py-0.5
                     text-[10px] font-medium bg-red-50 text-red-600 ring-1 ring-red-200 h-fit whitespace-nowrap"
              >
                Save {discountLabel.replace("-", "")}
              </span>
            )}
          </div>

          {/* Price */}
          <div className="h-fit flex-1 lg:flex-none ">
            <div className="flex flex-col lg:gap-2 lg:flex-row justify-self-end text-end lg:justify-self-start">
              <p
                className={`text-xl font-bold ${oswald.className} font-medium tabular-nums leading-5`}
              >
                <span className="relative -top-1 text-sm">$</span>
                {final_dollars}
                <span className="relative -top-1.5 text-xs">{final_cents}</span>
              </p>
              {product.on_discount && (
                <div className="self-end">
                  <p
                    className={`text-xs ${oswald.className}  font-light text-gray-600 tabular-nums leading-5 justify-self-end lg:justify-self-start line-through`}
                  >
                    ${formattedOriginalPrice}
                  </p>
                </div>
              )}
              {OPTIONS.showOnDiscount && product.on_discount && (
                <span
                  className="inline-flex lg:hidden items-center rounded-full px-2 py-0.5 
                     text-[10px] font-medium bg-red-50 text-red-600 ring-1 ring-red-200 h-fit mt-1 whitespace-nowrap"
                >
                  Save {discountLabel.replace("-", "")}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>{" "}
      {/* SOLD OUT Overlay */}
      {OPTIONS.showSoldOut && product.stock_level <= 0 && (
        <div className="absolute top-0 left-0 w-full bg-[var(--color-primary)] py-2 flex justify-center">
          <span className="text-white text-sm font-bold tracking-wider uppercase">
            SOLD OUT
          </span>
        </div>
      )}
    </Card>
  );
}

export default ProductCard;
