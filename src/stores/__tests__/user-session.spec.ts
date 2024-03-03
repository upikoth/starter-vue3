import {
	expect, test, describe, beforeEach
} from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

import { useUserSessionStore } from '@/stores'

import { UserRoleEnum, UserStatusEnum } from '@/models'
import type { IUser } from '@/models'

describe('Проверяет Users store', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
	})

	test('состояние по умолчанию', () => {
		const userSessionStore = useUserSessionStore()

		expect(userSessionStore.user).toBeNull()
		expect(userSessionStore.sessionId).toBeFalsy()
		expect(userSessionStore.isSessionInfoLoaded).toBe(false)
		expect(userSessionStore.isUserAuthorized).toBe(false)
	})

	test('возможность сохранить и сбросить информацию о пользователе', () => {
		const userSessionStore = useUserSessionStore()
		const user: IUser = {
			id: 1,
			email: 'test@test.ru',
			role: UserRoleEnum.User,
			status: UserStatusEnum.Active
		}
		const sessionId = 1

		userSessionStore.setUserAndSessionId(user, sessionId)

		expect(userSessionStore.user).toMatchObject(user)
		expect(userSessionStore.sessionId).toBe(sessionId)
		expect(userSessionStore.isSessionInfoLoaded).toBe(true)
		expect(userSessionStore.isUserAuthorized).toBe(true)

		userSessionStore.clearUserAndSessionId()

		expect(userSessionStore.user).toBeNull()
		expect(userSessionStore.sessionId).toBeFalsy()
		expect(userSessionStore.isSessionInfoLoaded).toBe(true)
		expect(userSessionStore.isUserAuthorized).toBe(false)
	})
})
