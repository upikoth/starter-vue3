import { createRouter, createWebHashHistory } from 'vue-router'

export enum ViewNameEnum {
	AuthSignInView = 'AUTH_SIGN_IN_VIEW',
	AuthSignUpView = 'AUTH_SIGN_UP_VIEW',
	AuthSignUpConfirm = 'AUTH_SIGN_UP_CONFIRM_VIEW',
	Home = 'HOME',
}

export const UNAUTHORIZED_VIEWS = new Set([
	ViewNameEnum.AuthSignInView,
	ViewNameEnum.AuthSignUpConfirm,
	ViewNameEnum.AuthSignUpView
])
export const ALL_VIEWS = new Set(Object.values(ViewNameEnum))

export function checkIsView(view: unknown): view is ViewNameEnum {
	return ALL_VIEWS.has(view as ViewNameEnum)
}

export function getDefaultView(): ViewNameEnum {
	return ViewNameEnum.Home
}

const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/auth',
			component: () => import('@/layouts/auth-layout.vue'),
			children: [
				{
					path: 'sign-in',
					name: ViewNameEnum.AuthSignInView,
					component: () => import('@/views/auth/sign-in-view.vue')
				},
				{
					path: 'sign-up',
					name: ViewNameEnum.AuthSignUpView,
					component: () => import('@/views/auth/sign-up-view.vue')
				},
				{
					path: 'sign-up-confirm',
					name: ViewNameEnum.AuthSignUpConfirm,
					component: () => import('@/views/auth/sign-up-confirm-view.vue')
				}
			]
		},
		{
			path: '/:pathMatch(.*)*',
			redirect: () => ({ name: ViewNameEnum.AuthSignInView })
		}
	]
})

export default router
