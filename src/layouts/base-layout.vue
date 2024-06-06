<script setup lang="ts">
import { computed, ref } from 'vue'
import { useQuasar } from 'quasar'
import { useRoute, useRouter } from 'vue-router'

import useApi from '@/api'

import { ViewNameEnum } from '@/router'

import { useSessionStore } from '@/stores'

import { useNotification } from '@/composables'

const $q = useQuasar()
const api = useApi()
const route = useRoute()
const router = useRouter()
const notification = useNotification()

const sessionStore = useSessionStore()

const leftDrawerOpen = ref(false)

const menuList = computed(() => ([
	{
		icon: 'person',
		label: 'Мой профиль',
		name: ViewNameEnum.Home,
		handler: () => router.push({ name: ViewNameEnum.Home }),
		isVisible: () => true
	},
	{
		icon: 'logout',
		label: 'Выйти',
		separator: true,
		handler: async () => {
			try {
				// await api.sessions.delete({ id: userSessionStore.sessionId })

				sessionStore.clearSession()

				await router.push({ name: ViewNameEnum.AuthSignInView })
			} catch (err) {
				notification.error(api.getApiErrorOrMessage(err, 'Не удалось выйти из приложения'))
			}
		},
		isVisible: () => true
	}
].filter((menuItem) => menuItem.isVisible())))

function toggleLeftDrawer() {
	leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<template>
	<q-layout view="lHh LpR lFf">
		<q-header
			v-if="$q.screen.gt.xs"
			elevated
		>
			<q-toolbar>
				<q-btn
					dense
					flat
					round
					icon="menu"
					@click="toggleLeftDrawer"
				/>
			</q-toolbar>
		</q-header>

		<q-drawer
			v-model="leftDrawerOpen"
			show-if-above
			side="left"
			bordered
		>
			<q-scroll-area class="fit">
				<q-list>
					<template
						v-for="(menuItem, index) in menuList"
						:key="index"
					>
						<q-separator
							v-if="menuItem.separator"
						/>
						<q-item
							v-ripple
							clickable
							:active="menuItem.name === route.name"
							@click="menuItem.handler"
						>
							<q-item-section avatar>
								<q-icon :name="menuItem.icon" />
							</q-item-section>
							<q-item-section>
								{{ menuItem.label }}
							</q-item-section>
						</q-item>
					</template>
				</q-list>
			</q-scroll-area>
		</q-drawer>

		<q-page-container>
			<router-view />
		</q-page-container>

		<q-footer
			v-if="$q.screen.xs"
			elevated
		>
			<q-toolbar>
				<q-btn
					dense
					flat
					round
					icon="menu"
					@click="toggleLeftDrawer"
				/>
			</q-toolbar>
		</q-footer>
	</q-layout>
</template>
