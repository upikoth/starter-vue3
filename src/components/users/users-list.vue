<script setup lang="ts">
import { ref, watch } from 'vue'
import type { QTableProps } from 'quasar'
import { useRouteQuery } from '@vueuse/router'

import type { User, UserRole } from '@/generated/app'

import {
	paginationToLimitOffset
} from '@/utils'

import useApi from '@/api'

import { useSessionStore } from '@/stores'

import { useNotification } from '@/composables'

import { LoadingStateEnum } from '@/models'

const api = useApi()
const notification = useNotification()
const sessionStore = useSessionStore()

const userRoleRoleNameMapping = {
	user: 'Пользователь',
	admin: 'Администратор'
}

const rowsPerPageOptions: NonNullable<QTableProps['rowsPerPageOptions']> = [25, 50, 100]

const page = useRouteQuery('page', 1, { transform: Number })
const rowsPerPage = useRouteQuery('rowsPerPage', rowsPerPageOptions[0], { transform: Number })
const pagination = ref<NonNullable<QTableProps['pagination']>>({
	page: page.value,
	rowsPerPage: rowsPerPage.value
})

watch(pagination, () => {
	if (typeof pagination.value.page === 'number') {
		page.value = pagination.value.page
	}

	if (typeof pagination.value.rowsPerPage === 'number') {
		rowsPerPage.value = pagination.value.rowsPerPage
	}
}, { deep: true })

const usersLoadingState = ref(LoadingStateEnum.LoadingNotStarted)
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

		usersLoadingState.value = LoadingStateEnum.Loading

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

		usersLoadingState.value = LoadingStateEnum.LoadedError
	} catch (err) {
		usersLoadingState.value = LoadingStateEnum.LoadedError
		notification.error(api.getApiErrorOrMessage(err, 'Не удалось получить список пользователей'))
	}
}

onCreated()
</script>

<template>
	<div
		class="users-list"
	>
		<q-table
			v-if="usersLoadingState !== LoadingStateEnum.LoadingNotStarted"
			v-model:pagination="pagination"
			class="users-list__table"
			:columns="columns"
			:rows="users"
			:rows-per-page-options="rowsPerPageOptions"
			:loading="usersLoadingState === LoadingStateEnum.Loading"
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
			<template
				#no-data
			>
				<div
					v-if="usersLoadingState === LoadingStateEnum.LoadedSuccess"
					class="full-width row flex-center"
				>
					<span class="text-body1">
						Пользователей пока нет
					</span>
				</div>
				<div
					v-if="usersLoadingState === LoadingStateEnum.LoadedError"
					class="full-width column flex-center"
				>
					<span class="text-body1">
						Произошла ошибка при получении списка
					</span>
					<q-btn
						flat
						no-caps
						color="primary"
						icon-right="refresh"
						class="q-mt-md"
						@click="updateUsersList()"
					>
						Попробовать еще раз
					</q-btn>
				</div>
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

			body.body--dark & {
				background-color: var(--q-dark);
			}
		}

		:deep(.q-table__bottom--nodata) {
			flex-grow: 9999;
		}
	}
}
</style>
