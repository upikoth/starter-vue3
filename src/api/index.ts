import axios from 'axios'

import environment from '@/environment'

import { MILLISECONDS_IN_MINUTE } from '@/constants'

import {
	HealthApi,
	RegistrationApi
} from '@/generated/starter'

import { getApiErrorOrMessage } from './errors'

export default function useApi() {
	const axiosInstance = axios.create({
		timeout: MILLISECONDS_IN_MINUTE,
		baseURL: environment.STARTER_API_URL
	})

	const health = new HealthApi(undefined, undefined, axiosInstance)
	const registrations = new RegistrationApi(undefined, undefined, axiosInstance)

	return {
		health,
		registrations,
		getApiErrorOrMessage
	}
}
