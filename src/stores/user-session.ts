import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import type { IUser } from '@/models'

import { IStoreNameEnum } from './index.types'

export const useUserSessionStore = defineStore(IStoreNameEnum.UserSession, () => {
	const userLocal = ref<IUser | null>(null)
	const sessionIdLocal = ref(0)

	const isSetUserAndSessionIdHasBeenCalled = ref(false)
	const isClearUserAndSessionIdHasBeenCalled = ref(false)

	const user = computed(() => userLocal.value)
	const sessionId = computed(() => sessionIdLocal.value)

	const isUserAuthorized = computed(() => !!user.value && !!sessionId.value)
	const isSessionInfoLoaded = computed(() =>
		isSetUserAndSessionIdHasBeenCalled.value
	|| isClearUserAndSessionIdHasBeenCalled.value)

	function setUserAndSessionId(newUser: IUser | null, newSessionId: number) {
		isSetUserAndSessionIdHasBeenCalled.value = true

		userLocal.value = newUser
		sessionIdLocal.value = newSessionId
	}

	function clearUserAndSessionId() {
		isClearUserAndSessionIdHasBeenCalled.value = true

		userLocal.value = null
		sessionIdLocal.value = 0
	}

	return {
		user,
		sessionId,
		isUserAuthorized,
		isSessionInfoLoaded,
		setUserAndSessionId,
		clearUserAndSessionId
	}
})
