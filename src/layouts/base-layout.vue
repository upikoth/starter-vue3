<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { ViewName } from '@/router'

const route = useRoute()
const router = useRouter()

const leftDrawerOpen = ref(false)

const menuList = [
	{
		icon: 'group',
		label: 'Пользователи',
		separator: true,
		name: ViewName.UsersView,
		handler: () => router.push({ name: ViewName.UsersView })
	},
	{
		icon: 'send',
		label: 'Outbox',
		separator: false
	},
	{
		icon: 'delete',
		label: 'Trash',
		separator: false
	},
	{
		icon: 'error',
		label: 'Spam',
		separator: true
	},
	{
		icon: 'settings',
		label: 'Settings',
		separator: false
	},
	{
		icon: 'feedback',
		label: 'Send Feedback',
		separator: false
	},
	{
		icon: 'help',
		iconColor: 'primary',
		label: 'Help',
		separator: false
	}
]

function toggleLeftDrawer() {
	leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<template>
	<q-layout view="lHh lpR lFf">
		<q-header elevated>
			<q-toolbar>
				<q-btn
					dense
					flat
					round
					icon="menu"
					@click="toggleLeftDrawer"
				/>

				<q-toolbar-title>
					Header
				</q-toolbar-title>
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

		<q-footer elevated>
			<q-toolbar>
				<q-toolbar-title>
					Footer
				</q-toolbar-title>
			</q-toolbar>
		</q-footer>
	</q-layout>
</template>
