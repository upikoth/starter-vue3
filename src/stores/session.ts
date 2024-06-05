import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import { IStoreNameEnum } from './index.types'

export const useSessionStore = defineStore(IStoreNameEnum.Session, () => {
	const token = ref<string | null>(null)

	const isAuthorized = computed(() => !!token.value)

	function setSessionToken(newToken: string) {
		token.value = newToken
	}

	function clearSessionToken() {
		token.value = null
	}

	return {
		token,
		isAuthorized,
		setSessionToken,
		clearSessionToken
	}
})
