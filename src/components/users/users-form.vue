<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import api from '@/api'
import { useNotification } from '@/composables'

const route = useRoute()
const notification = useNotification()

const userForm = ref({ name: '' })

function onCreated() {
	getUser()
}

async function getUser(): Promise<void> {
	try {
		const id = Number.parseInt(typeof route.params.id === 'string' ? route.params.id : '')
		const { user } = await api.users.get({ id })

		const { name } = user

		userForm.value = { name }
	} catch {
		notification.error('Не удалось информацию о пользователе')
	}
}

onCreated()
</script>

<template>
	<form class="users-form">
		<q-input v-model="userForm.name" />
	</form>
</template>
