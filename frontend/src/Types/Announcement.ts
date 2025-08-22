export interface Announcement {
  id: string;
  company_id: string;
  body: string;
  is_active: boolean;
  starts_at?: string | null;
  ends_at?: string | null;
  created_at: string;
  updated_at: string;
}
