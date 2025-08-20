import { useAppSelector } from "@/lib/redux/hooks";
import { ROLE, RoleLevel } from "@/utils/rolesUtil";

export function useAuth() {
  const { isAuthenticated, user } = useAppSelector((state) => state.user);
  const role: RoleLevel = user ? (user.role as RoleLevel) : ROLE.GUEST;

  return { isAuthenticated, user, role };
}
