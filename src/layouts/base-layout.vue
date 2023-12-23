<script setup lang="ts">
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useRoute, useRouter } from 'vue-router'

import { ViewName } from '@/router'

const $q = useQuasar()
const route = useRoute()
const router = useRouter()

const leftDrawerOpen = ref(false)

const menuList = [
	{
		icon: 'group',
		label: 'Пользователи',
		name: ViewName.UsersView,
		handler: () => router.push({ name: ViewName.UsersView })
	},
	{
		icon: 'admin_panel_settings',
		label: 'Сессии',
		separator: true,
		name: ViewName.SessionsView,
		handler: () => router.push({ name: ViewName.SessionsView })
	},
	{
		icon: 'send',
		label: 'Outbox',
		separator: false
	}
]

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
						<q-separator
							v-if="menuItem.separator"
							:key="'sep' + index"
						/>
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
