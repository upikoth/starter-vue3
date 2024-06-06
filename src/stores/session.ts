import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useLocalStorage } from '@vueuse/core'

import useApi from '@/api'

import { IStoreNameEnum } from './index.types'

interface Session {
	id: string;
	token: string;
}

export const useSessionStore = defineStore(IStoreNameEnum.Session, () => {
	const api = useApi()

	const tokenStorage = useLocalStorage<string | null>('auth-token-storage', null)

	const session = computed(():Session => {
		let res = {
			id: '',
			token: ''
		}

		try {
			if (tokenStorage.value) {
				res = JSON.parse(tokenStorage.value)
			}
		} catch {
			// Не нужно дополнительной обработки.
		}

		return res
	})

	const sessionToken = computed(() => session.value.token)
	const sessionId = computed(() => session.value.id)
	const isAuthorized = computed(() => !!sessionToken.value)

	function setSession(newSession: Session) {
		tokenStorage.value = JSON.stringify(newSession)
	}

	function clearSession() {
		tokenStorage.value = null
	}

	async function checkSession() {
		if (!sessionToken.value) {
			return
		}

		try {
			await api.sessions.v1CheckCurrentSession(sessionToken.value)
		} catch (err) {
			clearSession()
			api.getApiErrorOrMessage(err, 'Ошибка при проверке сессии пользователя')
		}
	}

	return {
		sessionId,
		sessionToken,
		isAuthorized,
		setSession,
		clearSession,
		checkSession
	}
})
