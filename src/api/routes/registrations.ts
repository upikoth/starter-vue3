import { axiosInstance } from '@/api/axios'

import type {
	ICreateRegistrationRequest,
	IConfirmRegistrationRequest,
	IGetRegistrationsRequest,
	IGetRegistrationsResponse,
	IDeleteRegistrationRequest
} from '@/models'

export default {
	getAll(params: IGetRegistrationsRequest): Promise<IGetRegistrationsResponse> {
		return axiosInstance.get('/api/v1/registrations', { params })
	},

	delete(data: IDeleteRegistrationRequest): Promise<void> {
		return axiosInstance.delete(`/api/v1/registrations/${data.id}`)
	},

	create(data: ICreateRegistrationRequest): Promise<void> {
		return axiosInstance.post('/api/v1/registrations', data)
	},

	confirm(data: IConfirmRegistrationRequest): Promise<void> {
		return axiosInstance.patch('/api/v1/registrations', data)
	}
}
