import { createRouter, createWebHashHistory } from 'vue-router'

import { useSessionStore } from '@/stores'

export enum ViewNameEnum {
	AuthSignInView = 'AUTH_SIGN_IN_VIEW',
	AuthSignUpView = 'AUTH_SIGN_UP_VIEW',
	AuthSignUpConfirmView = 'AUTH_SIGN_UP_CONFIRM_VIEW',
	AuthRecoveryPasswordView = 'AUTH_RECOVERY_PASSWORD_VIEW',
	AuthRecoveryPasswordConfirmView = 'AUTH_RECOVERY_PASSWORD_CONFIRM_VIEW',
	UsersView = 'USERS_VIEW',
	HomeView = 'HOME_VIEW',
}

export const UNAUTHORIZED_VIEWS = new Set([
	ViewNameEnum.AuthSignInView,
	ViewNameEnum.AuthSignUpConfirmView,
	ViewNameEnum.AuthSignUpView,
	ViewNameEnum.AuthRecoveryPasswordView,
	ViewNameEnum.AuthRecoveryPasswordConfirmView
])
export const ALL_VIEWS = new Set(Object.values(ViewNameEnum))

export function checkIsView(view: unknown): view is ViewNameEnum {
	return ALL_VIEWS.has(view as ViewNameEnum)
}

export function getDefaultView(): ViewNameEnum {
	return ViewNameEnum.HomeView
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
					name: ViewNameEnum.AuthSignUpConfirmView,
					component: () => import('@/views/auth/sign-up-confirm-view.vue')
				},
				{
					path: 'recovery-password',
					name: ViewNameEnum.AuthRecoveryPasswordView,
					component: () => import('@/views/auth/recovery-password-view.vue')
				},
				{
					path: 'recovery-password-confirm',
					name: ViewNameEnum.AuthRecoveryPasswordConfirmView,
					component: () => import('@/views/auth/recovery-password-confirm-view.vue')
				}
			]
		},
		{
			path: '/',
			component: () => import('@/layouts/base-layout.vue'),
			children: [
				{
					path: '',
					redirect: () => ({ name: ViewNameEnum.HomeView })
				},
				{
					path: 'home',
					name: ViewNameEnum.HomeView,
					component: () => import('@/views/home-view.vue')
				},
				{
					path: 'users',
					name: ViewNameEnum.UsersView,
					component: () => import('@/views/users/users-view.vue')
				}
			]
		},
		{
			path: '/:pathMatch(.*)*',
			redirect: () => ({ name: ViewNameEnum.AuthSignInView })
		}
	]
})

router.beforeEach((to, _, next) => {
	if (!checkIsView(to.name)) {
		return next()
	}

	const sessionStore = useSessionStore()

	if (
		!sessionStore.isAuthorized
		&& !UNAUTHORIZED_VIEWS.has(to.name)
	) {
		return next({ name: ViewNameEnum.AuthSignInView })
	}

	if (
		sessionStore.isAuthorized
		&& UNAUTHORIZED_VIEWS.has(to.name)
	) {
		return next({ name: getDefaultView() })
	}

	return next()
})

export default router
