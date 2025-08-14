export interface Product {
  id: string; // UUID
  store_id: string; // UUID
  name: string;
  sku?: string;
  price_cents: number;
  currency: string;
  is_active: boolean;
  is_deleted: boolean;
  deleted_at?: Date;
  created_at: Date;
  updated_at: Date;
}
