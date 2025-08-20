import { User } from "@/Types/User";

export const dummyUsers: User[] = [
  {
    id: "e1f2g3h4-i5j6-7890-1234-567890abcdef",
    store_id: "c1d2e3f4-g5h6-7890-1234-567890abcdef",
    role: 5,
    email: "admin@example.com",
    password_hash: "password123",
    avatar_url: "https://i.pravatar.cc/150?u=alice@example.com",
    first_name: "Alice",
    last_name: "Johnson",
    phone: "123-456-7890",
    is_deleted: false,
    created_at: new Date("2025-01-10T08:00:00Z"),
    updated_at: new Date("2025-01-10T08:00:00Z"),
  },
  {
    id: "f2g3h4i5-j6k7-8901-2345-678901bcdefa",
    store_id: "d2e3f4g5-h6i7-8901-2345-678901cdefab",
    role: 2,
    email: "customer@example.com",
    password_hash: "password123",
    avatar_url: "https://i.pravatar.cc/150?u=bob@example.com",
    first_name: "Bob",
    last_name: "Smith",
    phone: "098-765-4321",
    stripe_customer_id: "cus_abcdef123456",
    is_deleted: false,
    created_at: new Date("2025-02-15T11:45:00Z"),
    updated_at: new Date("2025-02-15T11:45:00Z"),
  },
];
