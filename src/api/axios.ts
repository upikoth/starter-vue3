import axios from 'axios'

import environment from '@/environment'

import { MILLISECONDS_IN_MINUTE } from '@/constants'

import { useUserSessionStore } from '@/stores'

import type { IResponse, IResponseError } from '@/models'

import { ApiErrorCodeEnum } from './errors'

const axiosInstance = axios.create({
	timeout: MILLISECONDS_IN_MINUTE,
	baseURL: environment.NODE_ENV !== 'development' ? environment.API_URL : undefined
})

axiosInstance.interceptors.response.use(
	// @ts-ignore
	(res) => {
		const responseData = res.data as IResponse

		if (!responseData.success) {
			return Promise.reject(responseData.error)
		}

		return responseData.data
	},
	async (err) => {
		const responseData = err.response.data as IResponseError

		if (responseData.error.code === ApiErrorCodeEnum.Unauthorized) {
			const userSessionStore = useUserSessionStore()

			userSessionStore.clearUserAndSessionId()
		}

		return Promise.reject(responseData.error)
	}
)

export { axiosInstance }
