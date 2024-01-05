<script setup lang="ts">
import { ref } from 'vue'
import type { QTableProps } from 'quasar'

import api, { getApiErrorOrMessage } from '@/api'
import type { IRegistration } from '@/models'
import { paginationToLimitOffset } from '@/utils'
import { useNotification } from '@/composables'

const notification = useNotification()

const rowsPerPageOptions: NonNullable<QTableProps['rowsPerPageOptions']> = [25, 50, 100]
const pagination = ref<NonNullable<QTableProps['pagination']>>({
	page: 1,
	rowsPerPage: rowsPerPageOptions[0]
})

const isRegistrationsLoading = ref(false)
const deletingRegistrationsSet = ref(new Set())

const registrations = ref<IRegistration[]>([])

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
	updateRegistrationsList()
}

async function updateRegistrationsList(
	props?: { pagination: NonNullable<QTableProps['pagination']>}
): Promise<void> {
	try {
		const newPagination = props?.pagination || pagination.value
		const { limit, offset } = paginationToLimitOffset(newPagination)

		isRegistrationsLoading.value = true

		const { registrations: newRegistrations, total } = await api.registrations.getAll({
			limit: limit,
			offset: offset
		})

		registrations.value = newRegistrations

		pagination.value.rowsNumber = total
		pagination.value.page = newPagination.page
		pagination.value.rowsPerPage = newPagination.rowsPerPage
	} catch (err) {
		notification.error(getApiErrorOrMessage(err, 'Не удалось получить список регистраций'))
	} finally {
		isRegistrationsLoading.value = false
	}
}

async function deleteRegistration(sessionId: number) {
	try {
		deletingRegistrationsSet.value.add(sessionId)

		await api.registrations.delete({ id: sessionId })

		updateRegistrationsList()
	} catch (err) {
		notification.error(getApiErrorOrMessage(err, 'Не удалось удалить регистрацию'))
	} finally {
		deletingRegistrationsSet.value.delete(sessionId)
	}
}

onCreated()
</script>

<template>
	<div class="registrations-list">
		<p
			v-if="!registrations.length && !isRegistrationsLoading"
			class="text-body1"
		>
			Сессий пока нет
		</p>
		<q-table
			v-else
			v-model:pagination="pagination"
			class="registrations-list__table"
			:columns="columns"
			:rows="registrations"
			:rows-per-page-options="rowsPerPageOptions"
			:loading="isRegistrationsLoading"
			hide-no-data
			@request="updateRegistrationsList"
		>
			<template #body-cell-actions="props">
				<q-td :props="props">
					<q-btn
						icon="delete"
						color="primary"
						size="sm"
						:loading="deletingRegistrationsSet.has(props.row.id)"
						round
						outline
						@click="deleteRegistration(props.row.id)"
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
.registrations-list {
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
