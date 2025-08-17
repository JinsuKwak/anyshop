export interface Product {
  id: string; // UUID
  store_id: string; // UUID
  name: string;
  made_by?: string; // Maker, Brand, Artis toggle default false
  sku?: string; // SKU toggle deafult: false
  price_cents: number;
  on_discount: boolean; // on sale label toggle (main / products page each)
  discount_type?: "percent" | "fixed" | "no_discount";
  discount_percent?: number;
  discount_amount_cents?: number;
  final_price_cents: number;
  product_thumbnailUrl?: string;
  product_imageUrls?: string[];
  stock_level: number; //<-- sold out toggle
  currency: string;
  is_active: boolean;
  is_deleted: boolean;
  deleted_at?: Date;
  created_at: Date;
  updated_at: Date;
}
