import { Product } from "@/types/Product";
import { dummyProducts } from "./dummy-data";

// For demonstration, we'll just take a slice of the existing products.
export const dummyFeaturedProducts: Product[] = dummyProducts.slice(0, 13);
