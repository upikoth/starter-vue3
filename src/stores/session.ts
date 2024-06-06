import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useLocalStorage } from '@vueuse/core'

import useApi from '@/api'

import { IStoreNameEnum } from './index.types'

export const useSessionStore = defineStore(IStoreNameEnum.Session, () => {
	const api = useApi()

	const tokenStorage = useLocalStorage<string | null>('auth-token-storage', null)

	const token = computed(() => tokenStorage.value)
	const isAuthorized = computed(() => !!token.value)

	function setSessionToken(newToken: string) {
		tokenStorage.value = newToken
	}

	function clearSessionToken() {
		tokenStorage.value = null
	}

	async function checkSession() {
		if (!token.value) {
			return
		}

		try {
			await api.sessions.v1GetCurrentSession(token.value)
		} catch (err) {
			clearSessionToken()
			api.getApiErrorOrMessage(err, 'Ошибка при проверке сессии пользователя')
		}
	}

	return {
		token,
		isAuthorized,
		setSessionToken,
		clearSessionToken,
		checkSession
	}
})
