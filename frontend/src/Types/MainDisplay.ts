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
  image_url: string;
  link_url: string;
  cta_label: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}
