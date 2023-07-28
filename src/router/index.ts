import { createRouter, createWebHashHistory } from 'vue-router'

import UsersView from '@/views/users-view.vue'

export enum ViewName {
	UsersView = 'USERS_VIEW',
}

const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '',
			component: () => import('@/layouts/base-layout.vue'),
			children: [
				{
					path: '',
					redirect: () => ({ name: ViewName.UsersView })
				},
				{
					path: 'users',
					name: ViewName.UsersView,
					component: UsersView
				}
			]
		},
		{
			path: '/:pathMatch(.*)*',
			redirect: () => ({ name: ViewName.UsersView })
		}
	]
})

export default router
