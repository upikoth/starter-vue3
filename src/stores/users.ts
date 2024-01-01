import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { IUser } from '@/models'

import { IStoreNameEnum } from './index.types'

export const useUsersStore = defineStore(IStoreNameEnum.User, () => {
	const user = ref<IUser | null>(null)

	return { user }
})
