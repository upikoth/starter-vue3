import { axiosInstance } from '@/api/axios'
import type { IGetUsersRequest, IGetUsersResponse } from '@/models'

export default {
	getAll(params: IGetUsersRequest): Promise<IGetUsersResponse> {
		return axiosInstance.get('/api/v1/users', { params })
	}
}
