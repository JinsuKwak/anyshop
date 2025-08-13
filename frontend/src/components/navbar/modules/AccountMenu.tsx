import Link from "next/link";
import { MenuItem } from "@/utils/menus";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ROLE, type RoleLevel } from "@/utils/roles";
import { buildMenu } from "@/utils/menus";

type AccountMenuProps = {
  user?: {
    name?: string;
    avatarUrl?: string;
    role?: RoleLevel;
  } | null;
  onLogout?: () => void;
};

function MenuItemLeaf({
  item,
  onAction,
}: {
  item: MenuItem;
  onAction?: (key: string) => void;
}) {
  const className = item.danger ? "text-red-600 focus:text-red-600" : "";

  // Type Link
  if (item.href) {
    return (
      <DropdownMenuItem asChild className={className}>
        <Link href={item.href}>
          {item.icon ? <item.icon className="mr-2 size-4" /> : null}
          {item.label}
        </Link>
      </DropdownMenuItem>
    );
  }

  // Type Action (logout)
  if (item.onSelectKey) {
    return (
      <DropdownMenuItem
        className={className}
        onSelect={(e) => {
          e.preventDefault();
          onAction?.(item.onSelectKey!);
        }}
      >
        {item.icon ? <item.icon className="mr-2 size-4" /> : null}
        {item.label}
      </DropdownMenuItem>
    );
  }

  // Type Label
  return (
    <DropdownMenuItem className={className}>
      {item.icon ? <item.icon className="mr-2 size-4" /> : null}
      {item.label}
    </DropdownMenuItem>
  );
}

function MenuItemNode({
  item,
  onAction,
}: {
  item: MenuItem;
  onAction?: (key: string) => void;
}) {
  if (item.children?.length) {
    return (
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>
          {item.icon ? (
            <item.icon className="mr-4 size-4  text-foreground/60" />
          ) : null}
          {item.label}
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
          {item.children.map((child, i) => (
            <MenuItemNode
              key={`${item.label}-${i}`}
              item={child}
              onAction={onAction}
            />
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuSub>
    );
  }
  return <MenuItemLeaf item={item} onAction={onAction} />;
}

export default function AccountMenu({ user, onLogout }: AccountMenuProps) {
  const isAuthed = !!user && user?.role !== ROLE.GUEST;
  const role: RoleLevel = user?.role ?? ROLE.GUEST;
  const { headerIcon: HeaderIcon, items } = buildMenu(role, isAuthed);

  const handleAction = (key: string) => {
    if (key === "logout") onLogout?.();
    // Future actions can be handled here
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className="group mr-6 inline-flex cursor-pointer items-center"
          aria-label="User menu"
        >
          <Avatar
            className="rounded-full border border-border/60 transition-all duration-200 group-hover:shadow-lg group-hover:shadow-black/10 group-hover:border-transparent hover:ring-2 hover:ring-[var(--color-ring)]
             "
          >
            <AvatarImage
              src={user?.avatarUrl ?? "https://github.com/evilrabbit.png"}
              alt={user?.name ?? "User"}
              className="rounded-full ring-0 ring-offset-2 ring-offset-background transition-all duration-200 group-hover:ring-2 group-hover:ring-primary/50 group-hover:scale-105"
            />
            <AvatarFallback className="rounded-full">
              {user?.name?.[0] ?? "U"}
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64" align="end" sideOffset={8}>
        <div className="flex items-center justify-between">
          <DropdownMenuLabel className="flex items-center space-x-2 h-10">
            {isAuthed ? user?.name ?? "My Account" : "Welcome"}
          </DropdownMenuLabel>
          {HeaderIcon ? (
            <HeaderIcon
              className="size-5 mr-1 text-foreground/80"
              strokeWidth={2}
            />
          ) : null}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {items.base.map((item, idx) => (
            <MenuItemNode
              key={`base-${idx}`}
              item={item}
              onAction={handleAction}
            />
          ))}

          {isAuthed ? <DropdownMenuSeparator /> : null}

          {items.plus?.length ? (
            <>
              {items.plus.map((item, idx) => (
                <MenuItemNode
                  key={`plus-${idx}`}
                  item={item}
                  onAction={handleAction}
                />
              ))}
              <DropdownMenuSeparator />
            </>
          ) : null}

          {items.extras?.length ? (
            <>
              {items.extras.map((item, idx) => (
                <MenuItemNode
                  key={`extras-${idx}`}
                  item={item}
                  onAction={handleAction}
                />
              ))}
              <DropdownMenuSeparator />
            </>
          ) : null}

          {items.footer.map((item, idx) => (
            <MenuItemNode
              key={`footer-${idx}`}
              item={item}
              onAction={handleAction}
            />
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
