<script setup lang="ts">
import { useRouter } from 'vue-router'

import UsersForm from '@/components/users/users-form.vue'

import { ViewNameEnum } from '@/router'

const router = useRouter()

function redirectToUsersPage() {
	router.push({ name: ViewNameEnum.UsersView })
}
</script>

<template>
	<q-page class="users-create-view">
		<div class="users-create-view__header">
			<q-btn
				icon="arrow_back"
				color="primary"
				size="sm"
				round
				flat
				@click="redirectToUsersPage"
			/>
			<h1 class="text-h1">
				Создание
			</h1>
		</div>
		<users-form @success="redirectToUsersPage" />
	</q-page>
</template>

<style lang="scss" scoped>
.users-create-view {
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
