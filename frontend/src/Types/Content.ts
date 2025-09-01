export interface Content {
  id: string; // UUID
  slug: string; // slug TEXT UNIQUE NOT NULL  // slugify lib & this can be ID
  title: string; // UUID
  content: string; // Rich Text HTML
  createdAt?: string;
  updatedAt?: string;
}
