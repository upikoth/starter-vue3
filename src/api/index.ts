import axios from 'axios'
import type { AxiosResponse, AxiosError } from 'axios'

import environment from '@/environment'

import { MILLISECONDS_IN_MINUTE } from '@/constants'

import type { ErrorResponse } from '@/generated/starter'
import {
	HealthApi,
	RegistrationApi
} from '@/generated/starter'

import { useSessionStore } from '@/stores'

import {
	getApiErrorOrMessage,
	checkIsApiErrorField,
	ApiErrorCodeEnum
} from './errors'

export { ApiErrorCodeEnum } from './errors'

export default function useApi() {
	const sessionStore = useSessionStore()

	const axiosInstance = axios.create({
		timeout: MILLISECONDS_IN_MINUTE,
		baseURL: environment.STARTER_API_URL
	})

	axiosInstance.interceptors.response.use(
		(res: AxiosResponse) => res,
		(err: AxiosError) => {
			const errResponse = err.response?.data as ErrorResponse

			if (errResponse.error.code === ApiErrorCodeEnum.ErrorCodeUserUnauthorized) {
				sessionStore.clearSessionToken()
			}

			return Promise.reject(errResponse.error)
		}
	)

	const health = new HealthApi(undefined, undefined, axiosInstance)
	const registrations = new RegistrationApi(undefined, undefined, axiosInstance)

	return {
		health,
		registrations,
		getApiErrorOrMessage,
		checkIsApiErrorField
	}
}
