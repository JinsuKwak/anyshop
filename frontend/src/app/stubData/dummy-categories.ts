import { Category } from "@/Types/Category";

const electronicsId = "cat-e1ec-tron-ics0-000000000001";
const computersId = "cat-c0mp-uter-s000-000000000002";
const accessoriesId = "cat-acce-ssor-ies0-000000000003";

export const dummyCategories: Category[] = [
  // Root Category
  {
    id: electronicsId,
    store_id: "c1d2e3f4-g5h6-7890-1234-567890abcdef",
    name: "Electronics",
    slug: "electronics",
    sort_order: 1,
    is_deleted: false,
    created_at: new Date(),
    updated_at: new Date(),
  },
  // Child of Electronics
  {
    id: computersId,
    store_id: "c1d2e3f4-g5h6-7890-1234-567890abcdef",
    parent_id: electronicsId,
    name: "Computers & Tablets",
    slug: "computers-tablets",
    sort_order: 1,
    is_deleted: false,
    created_at: new Date(),
    updated_at: new Date(),
  },
  // Child of Electronics
  {
    id: accessoriesId,
    store_id: "c1d2e3f4-g5h6-7890-1234-567890abcdef",
    parent_id: electronicsId,
    name: "Accessories",
    slug: "accessories",
    sort_order: 2,
    is_deleted: false,
    created_at: new Date(),
    updated_at: new Date(),
  },
  // Grandchild of Electronics, Child of Computers
  {
    id: "cat-lapt-ops0-0000-000000000004",
    store_id: "c1d2e3f4-g5h6-7890-1234-567890abcdef",
    parent_id: computersId,
    name: "Laptops",
    slug: "laptops",
    sort_order: 1,
    is_deleted: false,
    created_at: new Date(),
    updated_at: new Date(),
  },
  // Grandchild of Electronics, Child of Accessories
  {
    id: "cat-keyb-oard-s000-000000000005",
    store_id: "c1d2e3f4-g5h6-7890-1234-567890abcdef",
    parent_id: accessoriesId,
    name: "Keyboards",
    slug: "keyboards",
    sort_order: 1,
    is_deleted: false,
    created_at: new Date(),
    updated_at: new Date(),
  },
];
