import { axiosInstance } from '@/api/axios'

import type {
	ICreateRegistrationRequest,
	IConfirmRegistrationRequest
} from '@/models'

export default {
	create(data: ICreateRegistrationRequest): Promise<void> {
		return axiosInstance.post('/api/v1/registrations', data)
	},
	confirm(data: IConfirmRegistrationRequest): Promise<void> {
		return axiosInstance.patch('/api/v1/registrations', data)
	}
}
