import { MENU_CONFIG } from "@/components/navbar/modules/AccountMenuConfig";
import { ROLE, type RoleLevel } from "@/utils/rolesUtil";
import { ComponentType } from "react";
import {
  MANAGER_PLUS_COMMON,
  OWNER_PLUS_COMMON,
} from "@/components/navbar/modules/AccountMenuConfig";

export type MenuItem = {
  label: string;
  href?: string;
  icon?: ComponentType<{ className?: string; strokeWidth?: number }>;
  children?: MenuItem[];
  danger?: boolean;
  onSelectKey?: "logout";
};

export function buildMenu(
  role: RoleLevel,
  isAuthed: boolean,
  config = MENU_CONFIG
) {
  const headerIcon = config.commonHeader.headerIconByRole[role];
  const base = isAuthed ? config.authedCommon : config.guestCommon;
  const plus: MenuItem[] = [
    ...(role >= ROLE.MANAGER ? MANAGER_PLUS_COMMON : []),
    ...(role >= ROLE.OWNER ? OWNER_PLUS_COMMON : []),
  ];

  const extras = config.roleExtras[role] ?? [];
  const footer = isAuthed ? config.authedFooter : [];

  return {
    headerIcon,
    items: {
      base,
      plus,
      extras,
      footer,
    },
  };
}
