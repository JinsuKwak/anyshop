import type { ComponentType } from "react";
import { User, UserCheck, UserStar, UserCog } from "lucide-react";

export type RoleLevel = 1 | 2 | 3 | 4 | 5;

export const ROLE = {
  GUEST: 1,
  MEMBER: 2,
  MANAGER: 3,
  OWNER: 4,
  ADMIN: 5,
} as const;

export function roleToLabel(role: RoleLevel): string {
  switch (role) {
    case ROLE.GUEST:
      return "Guest";
    case ROLE.MEMBER:
      return "Member";
    case ROLE.MANAGER:
      return "Manager";
    case ROLE.OWNER:
      return "Owner";
    case ROLE.ADMIN:
      return "Admin";
  }
}

export const roleToIcon: Record<
  RoleLevel,
  ComponentType<{ className?: string; strokeWidth?: number }>
> = {
  [ROLE.GUEST]: User,
  [ROLE.MEMBER]: User,
  [ROLE.MANAGER]: UserCheck,
  [ROLE.OWNER]: UserStar,
  [ROLE.ADMIN]: UserCog,
};

export function isAtLeast(
  userRole: RoleLevel,
  requiredRole: RoleLevel
): boolean {
  return userRole >= requiredRole;
}
