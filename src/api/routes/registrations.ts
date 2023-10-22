import { axiosInstance } from '@/api/axios'

export interface ICreateRegistrationRequest {
	name: string;
	email: string;
	password: string;
}

export interface IConfirmRegistrationRequest {
	token: string
}

export default {
	create(data: ICreateRegistrationRequest): Promise<void> {
		return axiosInstance.post('/api/v1/registrations', data)
	},
	confirm(data: IConfirmRegistrationRequest): Promise<void> {
		return axiosInstance.patch('/api/v1/registrations', data)
	}
}
