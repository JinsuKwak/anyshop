export enum DisplayType {
  HERO = "HERO",
  PRODUCT = "PRODUCT",
  EXTERNAL_LINK = "EXTERNAL_LINK",
}

export interface MainDisplay {
  id: string; // UUID
  store_id: string; // UUID
  type: DisplayType;
  product_id?: string; // UUID
  image_url?: string;
  link_url?: string;
  cta_label?: string;
  sort_order: number;
  is_active: boolean;
  starts_at?: Date;
  ends_at?: Date;
  created_at: Date;
  updated_at: Date;
}
