import { UserRoleEnum } from '@/models'

export const userRoleRoleNameMapping: Record<UserRoleEnum, string> = {
	[UserRoleEnum.User]: 'Пользователь',
	[UserRoleEnum.Admin]: 'Администратор',
	[UserRoleEnum.SuperAdmin]: 'Супер Админ'
}
