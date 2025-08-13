import type { ComponentType } from "react";
import { type MenuItem } from "@/utils/menus";

import {
  LogOut,
  Settings,
  CreditCard,
  ShoppingBag,
  ShoppingCart,
  User,
  LayoutGrid,
  Activity,
  TicketPercent,
  Clock4,
  Users,
  ChartNoAxesColumnIncreasing,
} from "lucide-react";
import { ROLE, type RoleLevel, roleToIcon } from "@/utils/roles";

type MenuConfig = {
  commonHeader: {
    labelForAuthed: string;
    labelForGuest: string;
    headerIconByRole: Record<
      RoleLevel,
      ComponentType<{ className?: string; strokeWidth?: number }>
    >;
  };
  authedCommon: MenuItem[];
  guestCommon: MenuItem[];
  roleExtras: Partial<Record<RoleLevel, MenuItem[]>>;
  authedFooter: MenuItem[];
};

// Common Menus (Above Manager Role)
export const MANAGER_PLUS_COMMON: MenuItem[] = [
  { label: "Inventory", href: "/manager/inventory", icon: LayoutGrid },
  { label: "Logs", href: "/manager", icon: Clock4 },
];

// Common Menus (Above OWNER Role)
export const OWNER_PLUS_COMMON: MenuItem[] = [
  { label: "Dashboard", href: "/Owner", icon: ChartNoAxesColumnIncreasing },
  { label: "Promotions", href: "/owner/coupons", icon: TicketPercent },
];

// Quick Actions (Above Manager Role)
const QUICK_BASE_CHILDREN: MenuItem[] = [
  { label: "Add Product", href: "/manager/products/new" },
  { label: "Delete Product", href: "/manager/products/list" },
];

// Quick Actions (Above Owner Role)
const QUICK_OWNER_ADMIN_EXTRA: MenuItem[] = [
  { label: "Add Coupon", href: "/owner/coupons/new" },
  { label: "Add Manager", href: "/owner/members/new?role=manager" },
];

// Quick Actions Builder
function buildQuickActions(role: RoleLevel): MenuItem {
  const children =
    role >= ROLE.OWNER
      ? [...QUICK_BASE_CHILDREN, ...QUICK_OWNER_ADMIN_EXTRA]
      : QUICK_BASE_CHILDREN;

  return {
    label: "Quick Actions",
    icon: Activity,
    children,
  };
}

export const MENU_CONFIG: MenuConfig = {
  commonHeader: {
    labelForAuthed: "My Account",
    labelForGuest: "Welcome",
    headerIconByRole: roleToIcon,
  },

  authedCommon: [
    { label: "My Profile", href: "/account/profile", icon: User },
    { label: "Orders", href: "/account/orders", icon: ShoppingBag },
    {
      label: "Cart",
      icon: ShoppingCart,
      children: [
        { label: "View cart", href: "/cart" },
        { label: "Checkout", href: "/checkout" },
      ],
    },
    // { label: "Wishlist", href: "/account/wishlist", icon: Heart },
    // { label: "Addresses", href: "/account/addresses", icon: MapPin },
    { label: "Payment methods", href: "/account/payments", icon: CreditCard },
  ],

  guestCommon: [
    { label: "Log in", href: "/login" },
    { label: "Create account", href: "/register" },
  ],

  roleExtras: {
    [ROLE.MANAGER]: [buildQuickActions(ROLE.MANAGER)],
    [ROLE.OWNER]: [buildQuickActions(ROLE.OWNER)],
    [ROLE.ADMIN]: [
      buildQuickActions(ROLE.ADMIN),
      {
        label: "Team",
        icon: Users,
        href: "/admin/team",
        children: [
          { label: "Members", href: "/admin/team/members" },
          { label: "Invitations", href: "/admin/team/invitations" },
          { label: "Activity Logs", href: "/admin/team/logs" },
        ],
      },
      { label: "Settings", href: "/settings", icon: Settings },
    ],
  },

  authedFooter: [
    { label: "Log out", icon: LogOut, danger: true, onSelectKey: "logout" },
  ],
};
