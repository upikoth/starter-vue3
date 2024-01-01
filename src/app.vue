<script setup lang="ts">
import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import api from '@/api'
import { useUsersStore, useSessionsStore } from '@/stores'
import { UNAUTHORIZED_VIEWS, ViewName, checkIsView } from '@/router'

const usersStore = useUsersStore()
const sessionsStore = useSessionsStore()
const route = useRoute()
const router = useRouter()

watch(
	() => sessionsStore.isUserAuthorized,
	() => {
		if (!sessionsStore.isUserAuthorized) {
			router.push({ name: ViewName.AuthSignInView })
		}
	}
)

async function onCreated() {
	try {
		const { user, session } = await api.sessions.getCurrentSession()
		usersStore.user = user
		sessionsStore.sessionId = session.id
	} catch {
		sessionsStore.isSessionInfoLoaded = true
		return router.push({ name: ViewName.AuthSignInView })
	}

	if (!checkIsView(route.name)) {
		await router.push({ name: ViewName.AuthSignInView })
	}

	if (!checkIsView(route.name)) {
		return
	}

	// Если неавторизован и пытается перейти на страницы требующие авторизации, редиректим на страницу входа.
	if (
		!sessionsStore.isUserAuthorized &&
		!UNAUTHORIZED_VIEWS.has(route.name)
	) {
		sessionsStore.isSessionInfoLoaded = true
		return router.push({ name: ViewName.AuthSignInView })
	}

	// Если авторизован и пытается перейти на страницы не требующие авторизации, редиректим на главную страницу.
	if (
		sessionsStore.isUserAuthorized &&
		UNAUTHORIZED_VIEWS.has(route.name)
	) {
		sessionsStore.isSessionInfoLoaded = true
		return router.push({ name: ViewName.UsersView })
	}

	sessionsStore.isSessionInfoLoaded = true
}

onCreated()
</script>

<template>
	<router-view v-if="sessionsStore.isSessionInfoLoaded" />
</template>
