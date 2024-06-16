<script setup lang="ts">
import { ref } from 'vue'
import type { QTableProps } from 'quasar'

import type { User, UserRole } from '@/generated/starter'

import {
	paginationToLimitOffset
} from '@/utils'

import useApi from '@/api'

import { useSessionStore } from '@/stores'

import { useNotification } from '@/composables'

const api = useApi()
const notification = useNotification()
const sessionStore = useSessionStore()

const userRoleRoleNameMapping = {
	user: 'Пользователь',
	admin: 'Администратор'
}

const rowsPerPageOptions: NonNullable<QTableProps['rowsPerPageOptions']> = [25, 50, 100]
const pagination = ref<NonNullable<QTableProps['pagination']>>({
	page: 1,
	rowsPerPage: rowsPerPageOptions[0]
})

const isUsersLoading = ref(false)
const users = ref<User[]>([])

const columns: QTableProps['columns'] = [
	{
		name: 'id',
		field: 'id',
		label: 'Id',
		required: true,
		align: 'left',
		style: 'width: 300px',
		headerStyle: 'width: 300px'
	},
	{
		name: 'email',
		field: 'email',
		label: 'Email',
		required: true,
		align: 'left'
	},
	{
		name: 'role',
		field: 'role',
		label: 'Роль',
		required: true,
		align: 'left'
	}
]

function onCreated() {
	updateUsersList()
}

async function updateUsersList(
	props?: { pagination: NonNullable<QTableProps['pagination']>}
): Promise<void> {
	try {
		const newPagination = props?.pagination || pagination.value
		const { limit, offset } = paginationToLimitOffset(newPagination)

		isUsersLoading.value = true

		const { data } = await api.users.v1GetUsers(
			sessionStore.sessionToken,
			limit,
			offset
		)
		const { users: newUsers, total } = data.data
		users.value = newUsers

		pagination.value.rowsNumber = total
		pagination.value.page = newPagination.page
		pagination.value.rowsPerPage = newPagination.rowsPerPage
	} catch (err) {
		notification.error(api.getApiErrorOrMessage(err, 'Не удалось получить список пользователей'))
	} finally {
		isUsersLoading.value = false
	}
}

onCreated()
</script>

<template>
	<div
		class="users-list"
	>
		<p
			v-if="!users.length && !isUsersLoading"
			class="text-body1"
		>
			Пользователей пока нет
		</p>
		<q-table
			v-else
			v-model:pagination="pagination"
			class="users-list__table"
			:columns="columns"
			:rows="users"
			:rows-per-page-options="rowsPerPageOptions"
			:loading="isUsersLoading"
			hide-no-data
			@request="updateUsersList"
		>
			<template #body-cell-role="props">
				<q-td :props="props">
					{{ userRoleRoleNameMapping[props.row.role as UserRole] }}
				</q-td>
			</template>
			<template #loading>
				<q-inner-loading
					showing
					color="primary"
				/>
			</template>
		</q-table>
	</div>
</template>

<style lang="scss" scoped>
.users-list {
	display: flex;
	flex-direction: column;

	&__table {
		height: 100px;
		flex-grow: 1;

		:deep(thead tr) {
			position: sticky;
			z-index: 1;
			top: 0;
			background-color: white;
		}
	}
}
</style>
