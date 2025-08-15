"use client";

import { useFetch } from "@/hooks/useFetch";
import { Product } from "@/Types/Product";
import { MainProductCardSkeleton } from "@/components/skeletons/MainProductCardSkeleton";
import { ErrorDisplay } from "@/components/ErrorDisplay";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

function FeaturedProducts() {
  const {
    data: products,
    error,
    loading,
  } = useFetch<Product[]>("/api/main-featured-products");

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">Featured Products</h2>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <MainProductCardSkeleton key={i} />
          ))}
        </div>
      )}

      {error && <ErrorDisplay message={error.message} />}

      {products && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              {/* You can add an Image component here later */}
              <div className="w-full h-48 bg-gray-200"></div>
              <CardHeader>
                <h3 className="font-semibold text-lg">{product.name}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">SKU: {product.sku}</p>
              </CardContent>
              <CardFooter>
                <p className="text-lg font-bold">
                  ${(product.price_cents / 100).toFixed(2)}
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default FeaturedProducts;
