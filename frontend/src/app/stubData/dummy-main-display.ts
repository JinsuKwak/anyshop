import { MainDisplay, DisplayType } from "@/Types/MainDisplay";

export const dummyMainDisplayItems: MainDisplay[] = [
  {
    id: "m1d2i3s4-p5l6-7890-1234-567890abcdef",
    store_id: "c1d2e3f4-g5h6-7890-1234-567890abcdef",
    type: DisplayType.HERO,
    image_url:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2940&auto=format&fit=crop",
    link_url: "/products",
    cta_label: "Shop Now",
    sort_order: 1,
    is_active: true,
    starts_at: new Date("2025-01-01T00:00:00Z"),
    ends_at: new Date("2025-12-31T23:59:59Z"),
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "n2e3w4i5-t6e7-8901-2345-678901bcdefa",
    store_id: "c1d2e3f4-g5h6-7890-1234-567890abcdef",
    type: DisplayType.PRODUCT,
    product_id: "a1b2c3d4-e5f6-7890-1234-567890abcdef", // Laptop Pro
    image_url:
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=2864&auto=format&fit=crop",
    sort_order: 2,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "o3f4g5h6-i7j8-9012-3456-789012cdefab",
    store_id: "d2e3f4g5-h6i7-8901-2345-678901cdefab",
    type: DisplayType.EXTERNAL_LINK,
    image_url:
      "https://images.unsplash.com/photo-1526657782461-9fe13504a853?q=80&w=2874&auto=format&fit=crop",
    link_url: "https://example.com/blog-post",
    cta_label: "Read More",
    sort_order: 3,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
];
