<script setup lang="ts">
import { useRouter } from 'vue-router'

import { ViewNameEnum } from '@/router'

import UsersForm from '@/components/users/users-form.vue'

const router = useRouter()

function redirectToUsersPage() {
	router.push({ name: ViewNameEnum.UsersView })
}
</script>

<template>
	<q-page class="users-edit-view">
		<div class="users-edit-view__header">
			<q-btn
				icon="arrow_back"
				color="primary"
				size="sm"
				round
				flat
				:to="{ name: ViewNameEnum.UsersView }"
			/>
			<h1 class="text-h1">
				Редактирование
			</h1>
		</div>
		<users-form
			edit
			@success="redirectToUsersPage"
		/>
	</q-page>
</template>

<style lang="scss" scoped>
.users-edit-view {
	display: flex;
	flex-direction: column;
	padding: 16px 20px;

	&__header {
		display: flex;
		align-items: center;
		margin-bottom: 12px;
		gap: 12px;
	}
}
</style>
