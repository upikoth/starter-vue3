<script setup lang="ts">
import { ref } from 'vue'
import type { QTableProps } from 'quasar'

import environment from '@/environment'

import { paginationToLimitOffset } from '@/utils'

import api, { getApiErrorOrMessage } from '@/api'

import { useUsersStore } from '@/stores'

import { useNotification } from '@/composables'

import type { IFile } from '@/models'

const notification = useNotification()
const usersStore = useUsersStore()

const rowsPerPageOptions: NonNullable<QTableProps['rowsPerPageOptions']> = [25, 50, 100]
const pagination = ref<NonNullable<QTableProps['pagination']>>({
	page: 1,
	rowsPerPage: rowsPerPageOptions[0]
})

const isFilesLoading = ref(false)

const files = ref<IFile[]>([])

function onCreated() {
	updateFilesList()
}

async function updateFilesList(
	props?: { pagination: NonNullable<QTableProps['pagination']>}
): Promise<void> {
	try {
		if (!usersStore.user) {
			return
		}

		const newPagination = props?.pagination || pagination.value
		const { limit, offset } = paginationToLimitOffset(newPagination)

		isFilesLoading.value = true

		const { files: newFiles, total } = await api.files.getAll({
			limit,
			offset,
			uploadedByUserId: usersStore.user.id
		})

		files.value = newFiles

		pagination.value.rowsNumber = total
		pagination.value.page = newPagination.page
		pagination.value.rowsPerPage = newPagination.rowsPerPage
	} catch (err) {
		notification.error(getApiErrorOrMessage(err, 'Не удалось получить список регистраций'))
	} finally {
		isFilesLoading.value = false
	}
}

onCreated()
</script>

<template>
	<div>
		{{ files }}

		<img
			v-if="files.length"
			:src="`${environment.S3_DOMAIN_NAME}/${files[0].s3Path}`"
			alt=""
		>
	</div>
</template>
