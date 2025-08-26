import { Cart } from "@/types/Cart";

const cartId = "cart-1234-5678-9012-abcdefghijkl";
const storeId = "c1d2e3f4-g5h6-7890-1234-567890abcdef";
const userId = "e1f2g3h4-i5j6-7890-1234-567890abcdef"; // Alice

export const dummyCart: Cart = {
  id: cartId,
  store_id: storeId,
  user_id: userId,
  currency: "USD",
  created_at: new Date(),
  updated_at: new Date(),
  items: [
    {
      id: "item-abcd-efgh-ijkl-mnopqrstuv",
      store_id: storeId,
      cart_id: cartId,
      product_id: "a1b2c3d4-e5f6-7890-1234-567890abcdef", // Laptop Pro
      quantity: 1,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: "item-efgh-ijkl-mnop-qrstuvwxyz",
      store_id: storeId,
      cart_id: cartId,
      product_id: "b2c3d4e5-f6g7-8901-2345-678901bcdefa", // Wireless Mouse
      quantity: 2,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ],
};
