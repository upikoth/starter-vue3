import axios from 'axios'

import { MILLISECONDS_IN_MINUTE } from '@/constants'
import type { IResponse, IResponseError } from '@/types'

import environment from '@/environment'

const axiosInstance = axios.create({
	timeout: MILLISECONDS_IN_MINUTE,
	baseURL: environment.API_URL
})

axiosInstance.interceptors.response.use(
	(res) => {
		const responseData = res.data as IResponse

		if (!responseData.success) {
			return Promise.reject(responseData.error)
		}

		return responseData.data
	},
	async (err) => {
		const responseData = err.response.data as IResponseError

		return Promise.reject(responseData.error)
	}
)

export { axiosInstance }
