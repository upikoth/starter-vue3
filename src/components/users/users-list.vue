<script setup lang="ts">
import { ref } from 'vue'
import type { QTableProps } from 'quasar'
import { useRouter } from 'vue-router'

import api from '@/api'
import type { IUser } from '@/models'
import { UserStatusEnum } from '@/models'
import { paginationToLimitOffset } from '@/utils'
import { ViewName } from '@/router'
import { useNotification } from '@/composables'

const router = useRouter()
const notification = useNotification()

const rowsPerPageOptions: NonNullable<QTableProps['rowsPerPageOptions']> = [25, 50, 100]
const pagination = ref<NonNullable<QTableProps['pagination']>>({
	page: 1,
	rowsPerPage: rowsPerPageOptions[0]
})

const filters = ref({ status: UserStatusEnum.Active })

const isUsersLoading = ref(false)
const users = ref<IUser[]>([])

const columns: QTableProps['columns'] = [
	{
		name: 'id',
		field: 'id',
		label: 'Id',
		required: true,
		align: 'left',
		style: 'width: 50px',
		headerStyle: 'width: 50px'
	},
	{
		name: 'email',
		field: 'email',
		label: 'Email',
		required: true,
		align: 'left'
	},
	{
		name: 'actions',
		field: 'actions',
		label: 'Действия',
		align: 'right',
		style: 'width: 100px',
		headerStyle: 'width: 100px'
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

		const { users: newUsers, total } = await api.users.getAll({
			limit: limit,
			offset: offset,
			status: filters.value.status
		})

		users.value = newUsers

		pagination.value.rowsNumber = total
		pagination.value.page = newPagination.page
		pagination.value.rowsPerPage = newPagination.rowsPerPage
	} catch {
		notification.error('Не удалось получить список пользователей')
	} finally {
		isUsersLoading.value = false
	}
}

function resetUsersList() {
	pagination.value.page = 1
	pagination.value.rowsPerPage = rowsPerPageOptions[0]

	updateUsersList()
}

function redirectToUserPage(id: number) {
	router.push({
		name: ViewName.UsersEditView,
		params: { id }
	})
}

onCreated()
</script>

<template>
	<div class="users-list">
		<q-tabs
			v-model="filters.status"
			class="users-list__tabs"
			align="left"
			inline-label
			@update:model-value="resetUsersList"
		>
			<q-tab
				:name="UserStatusEnum.Active"
				label="Активные"
			/>
			<q-tab
				:name="UserStatusEnum.Blocked"
				label="Заблокированные"
			/>
		</q-tabs>
		<p
			v-if="!users.length"
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
			@row-click="(_, row) => redirectToUserPage(row.id)"
		>
			<template #body-cell-actions="props">
				<q-td :props="props">
					<q-btn
						icon="edit"
						color="primary"
						size="sm"
						round
						outline
						:to="{ name: ViewName.UsersEditView, params: { id: props.row.id } }"
					/>
				</q-td>
			</template>
			<template #body-cell-name="props">
				<q-td :props="props">
					<span :class="{ 'text-negative': props.row.status === UserStatusEnum.Blocked }">
						{{ props.row.name }}
					</span>
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

	&__tabs {
		margin-bottom: 8px;
	}

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
