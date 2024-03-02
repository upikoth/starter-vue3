<script setup lang="ts">
import { ref } from 'vue'
import type { QTableProps } from 'quasar'

import { userRoleRoleNameMapping } from '@/constants'

import {
	paginationToLimitOffset,
	checkIsUserHasAccessToAction
} from '@/utils'

import api, { getApiErrorOrMessage } from '@/api'

import { ViewNameEnum } from '@/router'

import { useUsersStore } from '@/stores'

import { useNotification } from '@/composables'

import { UserRoleEnum, UserActionEnum, UserStatusEnum } from '@/models'
import type {
	IUser
} from '@/models'

const notification = useNotification()
const usersStore = useUsersStore()

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
		name: 'role',
		field: 'role',
		label: 'Роль',
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
			limit,
			offset,
			status: filters.value.status
		})

		users.value = newUsers

		pagination.value.rowsNumber = total
		pagination.value.page = newPagination.page
		pagination.value.rowsPerPage = newPagination.rowsPerPage
	} catch (err) {
		notification.error(getApiErrorOrMessage(err, 'Не удалось получить список пользователей'))
	} finally {
		isUsersLoading.value = false
	}
}

function resetUsersList() {
	pagination.value.page = 1
	pagination.value.rowsPerPage = rowsPerPageOptions[0]

	updateUsersList()
}

function checkIsUserCanUpdateAthonerUser(userToUpdate: IUser) {
	if (!usersStore.user) {
		return false
	}

	if (checkIsUserHasAccessToAction(usersStore.user, UserActionEnum.UpdateAnyUserInfo)) {
		return true
	}

	switch (userToUpdate.role) {
		case UserRoleEnum.SuperAdmin:
			return false
		case UserRoleEnum.Admin:
			return checkIsUserHasAccessToAction(usersStore.user, UserActionEnum.UpdateAnyUserWuthRoleAdminInfo)
		case UserRoleEnum.User:
			return checkIsUserHasAccessToAction(usersStore.user, UserActionEnum.UpdateAnyUserWuthRoleUserInfo)
		default: {
			const exhaustiveCheck: never = userToUpdate.role
			return exhaustiveCheck
		}
	}
}

onCreated()
</script>

<template>
	<div
		v-if="usersStore.user"
		class="users-list"
	>
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
					{{ userRoleRoleNameMapping[props.row.role as UserRoleEnum] }}
				</q-td>
			</template>
			<template #body-cell-actions="props">
				<q-td :props="props">
					<q-btn
						v-if="checkIsUserCanUpdateAthonerUser(props.row)"
						icon="edit"
						color="primary"
						size="sm"
						round
						outline
						:to="usersStore.user?.id === props.row.id ?
							{ name: ViewNameEnum.UsersCurrentUserView } :
							{ name: ViewNameEnum.UsersEditView, params: { id: props.row.id } }
						"
					/>
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
