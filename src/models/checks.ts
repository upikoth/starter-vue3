import { UserRole } from '@/generated/app'

export function checkIsUserRole(role: unknown):role is UserRole {
	return Object.values(UserRole).includes(role as UserRole)
}
