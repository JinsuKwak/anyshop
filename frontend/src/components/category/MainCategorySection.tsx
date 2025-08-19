import React from "react";
import Link from "next/link";

type Size = "sm" | "md" | "lg";

function MainCategorySection() {
  return (
    <div className="mt-10">
      <Link href="/products/categories" className="hover:underline">
        <h2 className="text-2xl font-bold mb-4">Category</h2>
      </Link>

      {/* <div className={`${gridClass} `}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} size={OPTIONS.size} />
        ))}
      </div> */}
    </div>
  );
}

export default MainCategorySection;
