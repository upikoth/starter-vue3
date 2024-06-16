<script setup lang="ts">
import { useRouter } from 'vue-router'

import { getDefaultView } from '@/router'

import { useSessionStore, UserAction } from '@/stores'

import UsersList from '@/components/users/users-list.vue'

const router = useRouter()
const sessionStore = useSessionStore()

if (!sessionStore.hasAccessToAction(UserAction.GetAnyUserInfo)) {
	router.push({ name: getDefaultView() })
}
</script>

<template>
	<q-page
		class="users-view"
	>
		<div class="users-view__header">
			<h1>
				Пользователи
			</h1>
		</div>
		<users-list class="users-view__list" />
	</q-page>
</template>

<style lang="scss" scoped>
.users-view {
	display: flex;
	flex-direction: column;
	padding: 16px 20px;

	&__header {
		display: flex;
		align-items: center;
		margin-bottom: 12px;
	}

	&__list {
		height: 100px;
		flex-grow: 1;
	}
}
</style>
