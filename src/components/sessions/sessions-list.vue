<script setup lang="ts">
import { ref } from 'vue'
import type { QTableProps } from 'quasar'

import api from '@/api'
import type { ISession } from '@/models'
import { paginationToLimitOffset } from '@/utils'
import { useNotification } from '@/composables'

const notification = useNotification()

const rowsPerPageOptions: NonNullable<QTableProps['rowsPerPageOptions']> = [25, 50, 100]
const pagination = ref<NonNullable<QTableProps['pagination']>>({
	page: 1,
	rowsPerPage: rowsPerPageOptions[0]
})

const isSessionsLoading = ref(false)
const sessions = ref<ISession[]>([])

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
		name: 'userId',
		field: 'userId',
		label: 'Id пользователя',
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
	updateSessionsList()
}

async function updateSessionsList(
	props?: { pagination: NonNullable<QTableProps['pagination']>}
): Promise<void> {
	try {
		const newPagination = props?.pagination || pagination.value
		const { limit, offset } = paginationToLimitOffset(newPagination)

		isSessionsLoading.value = true

		const { sessions: newSessions, total } = await api.sessions.getAll({
			limit: limit,
			offset: offset
		})

		sessions.value = newSessions

		pagination.value.rowsNumber = total
		pagination.value.page = newPagination.page
		pagination.value.rowsPerPage = newPagination.rowsPerPage
	} catch {
		notification.error('Не удалось получить список сессий')
	} finally {
		isSessionsLoading.value = false
	}
}

onCreated()
</script>

<template>
	<div class="sessions-list">
		<q-table
			v-model:pagination="pagination"
			class="sessions-list__table"
			:columns="columns"
			:rows="sessions"
			:rows-per-page-options="rowsPerPageOptions"
			:loading="isSessionsLoading"
			hide-no-data
			@request="updateSessionsList"
		>
			<template #body-cell-actions="props">
				<q-td :props="props">
					<q-btn
						icon="delete"
						color="primary"
						size="sm"
						round
						outline
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
.sessions-list {
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