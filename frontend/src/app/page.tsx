"use client";

import { useFetch } from "@/hooks/useFetch";
import { Product } from "@/Types/Product";

export default function Home() {
  const { data: products, error, loading } = useFetch<Product[]>("/products");

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>

      {loading && <p>Loading products...</p>}

      {error && <p className="text-red-500">Error: {error.message}</p>}

      {products && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 shadow-sm">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-700 mb-1">SKU: {product.sku}</p>
              <p className="text-lg font-bold text-gray-900">
                ${(product.price_cents / 100).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
