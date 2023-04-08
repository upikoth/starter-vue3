import { createRouter, createWebHistory } from '@ionic/vue-router'
import HomeView from '../views/home-view.vue'

export enum ViewName {
	HomeView = 'HOME_VIEW',
	AboutView = 'ABOUT_VIEW'
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: ViewName.HomeView,
      component: HomeView
    },
    {
      path: '/about',
      name: ViewName.AboutView,
      component: () => import('@/views/about-view.vue')
    }
  ]
})

export default router
