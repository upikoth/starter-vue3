<script setup lang="ts">
import { computed, ref } from 'vue'
import { useQuasar } from 'quasar'
import { useRoute, useRouter } from 'vue-router'

import { checkIsUserHasAccessToAction } from '@/utils'

import api, { getApiErrorOrMessage } from '@/api'

import { ViewNameEnum } from '@/router'

import { useSessionsStore, useUsersStore } from '@/stores'

import { useNotification } from '@/composables'

import { UserActionEnum } from '@/models'

const $q = useQuasar()
const route = useRoute()
const router = useRouter()
const notification = useNotification()

const sessionsStore = useSessionsStore()
const usersStore = useUsersStore()

const leftDrawerOpen = ref(false)

const menuList = computed(() => ([
	{
		icon: 'person',
		label: 'Мой профиль',
		name: ViewNameEnum.UsersCurrentUserView,
		handler: () => router.push({ name: ViewNameEnum.UsersCurrentUserView }),
		isVisible: () => usersStore.user
			&& checkIsUserHasAccessToAction(usersStore.user, UserActionEnum.GetMyUserInfo)
	},
	{
		icon: 'group',
		label: 'Пользователи',
		name: ViewNameEnum.UsersView,
		handler: () => router.push({ name: ViewNameEnum.UsersView }),
		isVisible: () => usersStore.user
			&& checkIsUserHasAccessToAction(usersStore.user, UserActionEnum.GetAnyUserInfo)
	},
	{
		icon: 'admin_panel_settings',
		label: 'Сессии',
		name: ViewNameEnum.SessionsView,
		handler: () => router.push({ name: ViewNameEnum.SessionsView }),
		isVisible: () => usersStore.user
			&& checkIsUserHasAccessToAction(usersStore.user, UserActionEnum.GetAnySession)
	},
	{
		icon: 'app_registration',
		label: 'Регистрации',
		name: ViewNameEnum.RegistrationsView,
		handler: () => router.push({ name: ViewNameEnum.RegistrationsView }),
		isVisible: () => usersStore.user
			&& checkIsUserHasAccessToAction(usersStore.user, UserActionEnum.GetAnyRegistration)
	},
	{
		icon: 'logout',
		label: 'Выйти',
		separator: true,
		handler: async () => {
			try {
				await api.sessions.delete({ id: sessionsStore.sessionId })

				usersStore.user = null
				sessionsStore.sessionId = 0

				await router.push({ name: ViewNameEnum.AuthSignInView })
			} catch (err) {
				notification.error(getApiErrorOrMessage(err, 'Не удалось выйти из приложения'))
			}
		},
		isVisible: () => usersStore.user
				&& checkIsUserHasAccessToAction(usersStore.user, UserActionEnum.DeleteMySession)
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
