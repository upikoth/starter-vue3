<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import api from '@/api'

import { UNAUTHORIZED_VIEWS, ViewNameEnum, checkIsView } from '@/router'

import { useUserSessionStore } from '@/stores'

const userSessionStore = useUserSessionStore()
const route = useRoute()
const router = useRouter()

const isSessionChecked = ref(false)

watch(
	() => userSessionStore.isUserAuthorized,
	() => {
		if (!userSessionStore.isUserAuthorized) {
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

		userSessionStore.setUserAndSessionId(user, session.id)
	} catch {
		if (!UNAUTHORIZED_VIEWS.has(route.name)) {
			await router.push({ name: ViewNameEnum.AuthSignInView })
			userSessionStore.clearUserAndSessionId()
			isSessionChecked.value = true
			return
		}
	}

	// Если неавторизован и пытается перейти на страницы требующие авторизации, редиректим на страницу входа.
	if (
		!userSessionStore.isUserAuthorized
		&& !UNAUTHORIZED_VIEWS.has(route.name)
	) {
		isSessionChecked.value = true
		router.push({ name: ViewNameEnum.AuthSignInView })
		return
	}

	// Если авторизован и пытается перейти на страницы не требующие авторизации, редиректим на главную страницу.
	if (
		userSessionStore.isUserAuthorized
		&& UNAUTHORIZED_VIEWS.has(route.name)
	) {
		isSessionChecked.value = true
		router.push({ name: ViewNameEnum.UsersView })
		return
	}

	isSessionChecked.value = true
}

onCreated()
</script>

<template>
	<router-view v-if="isSessionChecked" />
</template>
