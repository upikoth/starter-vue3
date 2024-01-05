import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import { useUsersStore } from './users'
import { IStoreNameEnum } from './index.types'

export const useSessionsStore = defineStore(IStoreNameEnum.Sessions, () => {
	const usersStore = useUsersStore()

	const sessionId = ref(0)
	const isSessionInfoLoaded = ref(false)

	const isUserAuthorized = computed(() => !!usersStore.user && !!sessionId.value)

	return {
		sessionId,
		isSessionInfoLoaded,
		isUserAuthorized
	}
})
