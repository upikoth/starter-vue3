<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

import { getDefaultView } from '@/router'

import { useSessionStore } from '@/stores'

import { checkIsUserRole } from '@/models'

const router = useRouter()
const route = useRoute()
const sessionStore = useSessionStore()

const { id, token, userRole } = route.query

if (typeof id === 'string' && typeof token === 'string' && checkIsUserRole(userRole)) {
	sessionStore.setSession({
		id,
		token,
		userRole
	})
}

router.push({ name: getDefaultView() })
</script>

<template>
	<div />
</template>
