<script setup lang="ts">
import { useQuasar } from 'quasar'

import { ViewName } from '@/router'

import UsersList from '@/components/users/users-list.vue'

const $q = useQuasar()
</script>

<template>
	<q-page class="users-view">
		<div class="users-view__header">
			<h1>
				Пользователи
			</h1>
			<q-space />
			<q-btn
				icon="add"
				:label="$q.screen.lt.sm ? '' : 'Создать'"
				size="md"
				color="primary"
				:to="{ name: ViewName.UsersCreateView }"
			/>
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
