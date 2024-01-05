<script setup lang="ts">
import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import api from '@/api'

import { UNAUTHORIZED_VIEWS, ViewNameEnum, checkIsView } from '@/router'

import { useUsersStore, useSessionsStore } from '@/stores'

const usersStore = useUsersStore()
const sessionsStore = useSessionsStore()
const route = useRoute()
const router = useRouter()

watch(
	() => sessionsStore.isUserAuthorized,
	() => {
		if (!sessionsStore.isUserAuthorized) {
			router.push({ name: ViewNameEnum.AuthSignInView })
		}
	}
)

async function onCreated() {
	if (!checkIsView(route.name)) {
		await router.push({ name: ViewNameEnum.AuthSignInView })
	}

	if (!checkIsView(route.name)) {
		return
	}

	try {
		const { user, session } = await api.sessions.getCurrentSession()
		usersStore.user = user
		sessionsStore.sessionId = session.id
	} catch {
		if (!UNAUTHORIZED_VIEWS.has(route.name)) {
			await router.push({ name: ViewNameEnum.AuthSignInView })
			sessionsStore.isSessionInfoLoaded = true
			return
		}
	}

	// Если неавторизован и пытается перейти на страницы требующие авторизации, редиректим на страницу входа.
	if (
		!sessionsStore.isUserAuthorized
		&& !UNAUTHORIZED_VIEWS.has(route.name)
	) {
		sessionsStore.isSessionInfoLoaded = true
		router.push({ name: ViewNameEnum.AuthSignInView })
		return
	}

	// Если авторизован и пытается перейти на страницы не требующие авторизации, редиректим на главную страницу.
	if (
		sessionsStore.isUserAuthorized
		&& UNAUTHORIZED_VIEWS.has(route.name)
	) {
		sessionsStore.isSessionInfoLoaded = true
		router.push({ name: ViewNameEnum.UsersView })
		return
	}

	sessionsStore.isSessionInfoLoaded = true
}

onCreated()
</script>

<template>
	<router-view v-if="sessionsStore.isSessionInfoLoaded" />
</template>
