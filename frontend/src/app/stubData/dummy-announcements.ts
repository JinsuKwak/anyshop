import { Announcement } from "@/types/Announcement";

export const dummyAnnouncements: Announcement[] = [
  {
    id: "1",
    company_id: "11111111-1111-1111-1111-111111111111",
    body: "🎉 New Year Sale! Get up to 30% off selected items.",
    is_active: true,
    starts_at: "2025-01-01T00:00:00.000Z",
    ends_at: "2025-01-15T23:59:59.000Z",
    created_at: new Date("2024-12-30T10:00:00.000Z").toISOString(),
    updated_at: new Date("2024-12-30T10:00:00.000Z").toISOString(),
  },
  {
    id: "2",
    company_id: "22222222-2222-2222-2222-222222222222",
    body: "🚚 Free shipping on orders over $50!",
    is_active: true,
    starts_at: null,
    ends_at: null,
    created_at: new Date("2025-01-10T09:00:00.000Z").toISOString(),
    updated_at: new Date("2025-01-10T09:00:00.000Z").toISOString(),
  },
  {
    id: "3",
    company_id: "33333333-3333-3333-3333-333333333333",
    body: "🛠 Scheduled maintenance on Feb 5th, 12:00–14:00 UTC.",
    is_active: true,
    starts_at: "2025-02-05T12:00:00.000Z",
    ends_at: "2025-02-05T14:00:00.000Z",
    created_at: new Date("2025-01-20T12:00:00.000Z").toISOString(),
    updated_at: new Date("2025-01-25T12:00:00.000Z").toISOString(),
  },
];
