<script setup lang="ts">
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import type { QTableProps } from 'quasar'

import api from '@/api'
import type { IUser } from '@/models'
import { paginationToLimitOffset } from '@/utils'

const $q = useQuasar()

const rowsPerPageOptions: QTableProps['rowsPerPageOptions'] = [5, 10, 25, 50, 100]
const pagination = ref<NonNullable<QTableProps['pagination']>>({
	page: 1,
	rowsPerPage: rowsPerPageOptions[0]
})

const users = ref<IUser[]>([])

const columns: QTableProps['columns'] = [
	{
		name: 'id',
		field: 'id',
		label: 'Id',
		required: true,
		align: 'left'
	},
	{
		name: 'name',
		field: 'name',
		label: 'Name',
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

		const { users: newUsers, total } = await api.users.getAll({
			limit: limit,
			offset: offset
		})

		users.value = newUsers

		pagination.value.rowsNumber = total
		pagination.value.page = newPagination.page
		pagination.value.rowsPerPage = newPagination.rowsPerPage
	} catch {
		$q.notify({
			type: 'negative',
			message: 'Не удалось получить список пользователей',
			position: 'top'
		})
	}
}

onCreated()
</script>

<template>
	<q-table
		v-model:pagination="pagination"
		title="Пользователи"
		:columns="columns"
		:rows="users"
		:rows-per-page-options="rowsPerPageOptions"
		@request="updateUsersList"
	/>
</template>
