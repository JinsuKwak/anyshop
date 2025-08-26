export interface Category {
  id: string; // UUID
  name: string;
  store_id: string; // UUID
  slug: string; // slug TEXT UNIQUE NOT NULL  // slugify lib
  image_url?: string;
  is_deleted: boolean;
  deleted_at?: Date;
  created_at: Date;
  updated_at: Date;
}
