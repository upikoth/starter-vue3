import { axiosInstance } from '@/api/axios'

import type { ICreateRegistrationRequest } from '@/models'

export default {
	create(data: ICreateRegistrationRequest): Promise<void> {
		return axiosInstance.post('/api/v1/registrations', data)
	},
	confirm({ token }: { token: string }): Promise<void> {
		return axiosInstance.patch('/api/v1/registrations', { token })
	}
}
