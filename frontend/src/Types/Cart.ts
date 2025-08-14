export interface CartItem {
  id: string; // UUID
  store_id: string; // UUID
  cart_id: string; // UUID
  product_id: string; // UUID
  quantity: number;
  created_at: Date;
  updated_at: Date;
}

export interface Cart {
  id: string; // UUID
  store_id: string; // UUID
  user_id?: string; // UUID
  guest_token?: string;
  currency: string; // CHAR(3)
  created_at: Date;
  updated_at: Date;
  items: CartItem[];
}
