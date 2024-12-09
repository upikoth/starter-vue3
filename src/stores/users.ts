import { defineStore } from 'pinia'
import { watch, ref } from 'vue'

import type { UserRole } from '@/generated/app'

import useApi from '@/api'

import { useSessionStore } from '@/stores'

import { IStoreNameEnum } from './index.types'

interface User {
	id: string;
	email: string;
	userRole: UserRole
}

export const useUserStore = defineStore(IStoreNameEnum.User, () => {
	const api = useApi()

	const sessionStore = useSessionStore()

	const user = ref<User>({
		id: '',
		email: '',
		userRole: 'user'
	})

	loadUserData()
	watch(
		() => sessionStore.isAuthorized,
		() => {
			loadUserData()
		}
	)

	async function loadUserData() {
		if (!sessionStore.isAuthorized) {
			return
		}

		try {
			const { data } = await api.users.v1GetCurrentUser(sessionStore.sessionToken)
			user.value = {
				id: data.data.user.id,
				email: data.data.user.email,
				userRole: data.data.user.role
			}
		} catch (err) {
			api.getApiErrorOrMessage(err, 'Ошибка при получении данных пользователя')
		}
	}

	return {
		user
	}
})
