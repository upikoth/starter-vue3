import { createRouter, createWebHashHistory } from 'vue-router'

export enum ViewName {
	AuthSignInView = 'AUTH_SIGN_IN_VIEW',
	AuthSignUpView = 'AUTH_SIGN_UP_VIEW',
	AuthSignUpConfirmEmail = 'AUTH_SIGN_UP_CONFIRM_EMAIL',
	UsersView = 'USERS_VIEW',
	UsersCreateView = 'USERS_CREATE_VIEW',
	UsersEditView = 'USER_VIEW',
	SessionsView = 'SESSIONS_VIEW',
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
					name: ViewName.AuthSignInView,
					component: () => import('@/views/auth/sign-in-view.vue')
				},
				{
					path: 'sign-up',
					name: ViewName.AuthSignUpView,
					component: () => import('@/views/auth/sign-up-view.vue')
				},
				{
					path: 'sign-up-confirm-email',
					name: ViewName.AuthSignUpConfirmEmail,
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
					redirect: () => ({ name: ViewName.UsersView })
				},
				{
					path: 'users',
					name: ViewName.UsersView,
					component: () => import('@/views/users/users-view.vue')
				},
				{
					path: 'users/create',
					name: ViewName.UsersCreateView,
					component: () => import('@/views/users/users-create-view.vue')
				},
				{
					path: 'users/:id',
					name: ViewName.UsersEditView,
					component: () => import('@/views/users/users-edit-view.vue')
				},
				{
					path: 'sessions',
					name: ViewName.SessionsView,
					component:  () => import('@/views/sessions/sessions-view.vue')
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
