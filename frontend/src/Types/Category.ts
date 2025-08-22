export interface Category {
  name: string; //ID
  store_id: string; // UUID
  image_url?: string;
  is_deleted: boolean;
  deleted_at?: Date;
  created_at: Date;
  updated_at: Date;
}
