export interface Category {
  id: string; // UUID
  store_id: string; // UUID
  parent_id?: string; // UUID
  name: string;
  slug?: string;
  image_url?: string;
  sort_order: number;
  is_deleted: boolean;
  deleted_at?: Date;
  created_at: Date;
  updated_at: Date;
}
