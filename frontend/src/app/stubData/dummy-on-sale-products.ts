import { Product } from "@/Types/Product";
import { dummyProducts } from "./dummy-data";

// For demonstration, we'll just take a different slice of the existing products.
export const dummyOnSaleProducts: Product[] = dummyProducts.slice(2, 7);
