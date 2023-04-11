import { createRouter, createWebHashHistory } from '@ionic/vue-router'

import HomeView from '@/views/home-view.vue'

export enum ViewName {
	HomeView = 'HOME_VIEW',
	DocumentationView = 'DOCUMENTAITION_VIEW'
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
					redirect: () => ({ name: ViewName.HomeView }),
				},
				{
					path: 'home',
					name: ViewName.HomeView,
					component: HomeView
				},
				{
					path: 'docs',
					name: ViewName.DocumentationView,
					component: () => import('@/views/documentation-view.vue')
				}
			]
		},
		{
			path: '/:pathMatch(.*)*',
			redirect: () => ({ name: ViewName.HomeView }),
		},
  ]
})

export default router
