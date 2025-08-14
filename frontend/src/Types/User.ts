export interface User {
  id: string; // UUID
  store_id: string; // UUID
  role: number;
  email: string;
  password_hash?: string;
  avatar_url?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  stripe_customer_id?: string;
  is_deleted: boolean;
  deleted_at?: Date;
  created_at: Date;
  updated_at: Date;
}
