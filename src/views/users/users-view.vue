<script setup lang="ts">
import { useQuasar } from 'quasar'

import { checkIsUserHasAccessToAction } from '@/utils'

import { ViewNameEnum } from '@/router'

import { useUsersStore } from '@/stores'

import { UserActionEnum } from '@/models'

import UsersList from '@/components/users/users-list.vue'

const $q = useQuasar()
const usersStore = useUsersStore()
</script>

<template>
	<q-page
		v-if="usersStore.user"
		class="users-view"
	>
		<div class="users-view__header">
			<h1>
				Пользователи
			</h1>
			<q-space />
			<q-btn
				v-if="checkIsUserHasAccessToAction(usersStore.user, UserActionEnum.CreateUser)"
				icon="add"
				:label="$q.screen.lt.sm ? '' : 'Создать'"
				size="md"
				color="primary"
				:to="{ name: ViewNameEnum.UsersCreateView }"
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
	}

	&__list {
		height: 100px;
		flex-grow: 1;
	}
}
</style>
