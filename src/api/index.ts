import axios from 'axios'
import type { AxiosResponse, AxiosError } from 'axios'
import { useRouter } from 'vue-router'

import environment from '@/environment'

import { MILLISECONDS_IN_MINUTE } from '@/constants'

import type { ErrorResponse } from '@/generated/starter'
import {
	HealthApi,
	RegistrationsApi,
	SessionsApi
} from '@/generated/starter'

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
		baseURL: environment.STARTER_API_URL
	})

	axiosInstance.interceptors.request.use(
		async (req) => {
			if (sessionStore.isAuthorized) {
				req.headers['Authorization-Token'] = sessionStore.sessionToken
			}
			return req
		}
	)

	axiosInstance.interceptors.response.use(
		(res: AxiosResponse) => res,
		(err: AxiosError) => {
			const errResponse = err.response?.data as ErrorResponse

			if (errResponse.error.code === ApiErrorCodeEnum.ErrorCodeUserUnauthorized) {
				sessionStore.clearSession()
				router.push({ name: ViewNameEnum.AuthSignInView })
			}

			return Promise.reject(errResponse.error)
		}
	)

	const health = new HealthApi(undefined, undefined, axiosInstance)
	const registrations = new RegistrationsApi(undefined, undefined, axiosInstance)
	const sessions = new SessionsApi(undefined, undefined, axiosInstance)

	return {
		health,
		registrations,
		sessions,
		getApiErrorOrMessage,
		checkIsApiErrorField
	}
}
