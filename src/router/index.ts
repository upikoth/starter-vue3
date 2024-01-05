import { createRouter, createWebHashHistory } from 'vue-router'

import { useSessionsStore } from '@/stores'

export enum ViewNameEnum {
	AuthSignInView = 'AUTH_SIGN_IN_VIEW',
	AuthSignUpView = 'AUTH_SIGN_UP_VIEW',
	AuthSignUpConfirmEmail = 'AUTH_SIGN_UP_CONFIRM_EMAIL',
	UsersView = 'USERS_VIEW',
	UsersCreateView = 'USERS_CREATE_VIEW',
	UsersEditView = 'USER_VIEW',
	UsersCurrentUserView = 'USERS_CURRENT_USER_VIEW',
	SessionsView = 'SESSIONS_VIEW',
	RegistrationsView = 'REGISTRATIONS_VIEW'
}

export const UNAUTHORIZED_VIEWS = new Set([
	ViewNameEnum.AuthSignInView,
	ViewNameEnum.AuthSignUpConfirmEmail,
	ViewNameEnum.AuthSignUpView
])
export const ALL_VIEWS = new Set(Object.values(ViewNameEnum))

export function checkIsView(view: unknown): view is ViewNameEnum {
	return ALL_VIEWS.has(view as ViewNameEnum)
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
					path: 'sign-up-confirm-email',
					name: ViewNameEnum.AuthSignUpConfirmEmail,
					component: () => import('@/views/auth/sign-up-confirm-email-view.vue')
				}
			]
		},
		{
			path: '/',
			component: () => import('@/layouts/base-layout.vue'),
			children: [
				{
					path: '',
					redirect: () => ({ name: ViewNameEnum.UsersView })
				},
				{
					path: 'users',
					name: ViewNameEnum.UsersView,
					component: () => import('@/views/users/users-view.vue')
				},
				{
					path: 'users/create',
					name: ViewNameEnum.UsersCreateView,
					component: () => import('@/views/users/users-create-view.vue')
				},
				{
					path: 'users/:id',
					name: ViewNameEnum.UsersEditView,
					component: () => import('@/views/users/users-edit-view.vue')
				},
				{
					path: 'users/current-user',
					name: ViewNameEnum.UsersCurrentUserView,
					component: () => import('@/views/users/users-current-user-view.vue')
				},
				{
					path: 'sessions',
					name: ViewNameEnum.SessionsView,
					component: () => import('@/views/sessions/sessions-view.vue')
				},
				{
					path: 'registrations',
					name: ViewNameEnum.RegistrationsView,
					component: () => import('@/views/registrations/registrations-view.vue')
				}
			]
		},
		{
			path: '/:pathMatch(.*)*',
			redirect: () => ({ name: ViewNameEnum.UsersView })
		}
	]
})

router.beforeEach((to, _, next) => {
	if (!checkIsView(to.name)) {
		return next()
	}

	const sessionsStore = useSessionsStore()

	if (!sessionsStore.isSessionInfoLoaded) {
		return next()
	}

	// Если неавторизован и пытается перейти на страницы требующие авторизации, редиректим на страницу входа.
	if (
		!sessionsStore.isUserAuthorized
		&& !UNAUTHORIZED_VIEWS.has(to.name)
	) {
		return next({ name: ViewNameEnum.AuthSignInView })
	}

	// Если авторизован и пытается перейти на страницы не требующие авторизации, редиректим на главную страницу.
	if (
		sessionsStore.isUserAuthorized
		&& UNAUTHORIZED_VIEWS.has(to.name)
	) {
		return next({ name: ViewNameEnum.UsersView })
	}

	return next()
})

export default router
