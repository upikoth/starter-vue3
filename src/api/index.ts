import axios from 'axios'

import environment from '@/environment'

import { MILLISECONDS_IN_MINUTE } from '@/constants'

import { HealthApi } from '@/generated/starter'

const axiosInstance = axios.create({
	timeout: MILLISECONDS_IN_MINUTE,
	baseURL: environment.NODE_ENV !== 'development' ? environment.API_URL : undefined
})

const health = new HealthApi(undefined, undefined, axiosInstance)

export default {
	health
}
