import axios from 'axios'
import type { AxiosResponse, AxiosError } from 'axios'
import { useRouter } from 'vue-router'

import environment from '@/environment'

import { MILLISECONDS_IN_MINUTE } from '@/constants'

import { type ErrorResponse, OauthApi } from '@/generated/app'
import {
	HealthApi,
	RegistrationsApi,
	SessionsApi,
	PasswordRecoveryRequestsApi,
	UsersApi
} from '@/generated/app'

import { ViewNameEnum } from '@/router'

import { useSessionStore } from '@/stores'

import {
	getApiErrorOrMessage,
	checkIsApiErrorField,
	ApiErrorCodeEnum
} from './errors'

export { ApiErrorCodeEnum } from './errors'

export default function useApi() {
	const sessionStore = useSessionStore()
	const router = useRouter()

	const axiosInstance = axios.create({
		timeout: MILLISECONDS_IN_MINUTE,
		baseURL: environment.API_URL
	})

	axiosInstance.interceptors.response.use(
		(res: AxiosResponse) => res,
		(err: AxiosError) => {
			const errResponse = err.response?.data as ErrorResponse

			if (errResponse.error.code === ApiErrorCodeEnum.ErrCodeUserUnauthorized) {
				sessionStore.clearSession()
				router.push({ name: ViewNameEnum.AuthSignInView })
			}

			return Promise.reject(errResponse.error)
		}
	)

	const health = new HealthApi(undefined, undefined, axiosInstance)
	const registrations = new RegistrationsApi(undefined, undefined, axiosInstance)
	const sessions = new SessionsApi(undefined, undefined, axiosInstance)
	const passwordRecoveryRequest = new PasswordRecoveryRequestsApi(undefined, undefined, axiosInstance)
	const users = new UsersApi(undefined, undefined, axiosInstance)
	const oauth = new OauthApi(undefined, undefined, axiosInstance)

	return {
		health,
		registrations,
		sessions,
		passwordRecoveryRequest,
		users,
		oauth,
		getApiErrorOrMessage,
		checkIsApiErrorField
	}
}
