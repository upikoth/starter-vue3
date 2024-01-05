import { axiosInstance } from '@/api/axios'

import type {
	IGetUsersRequest,
	IGetUsersResponse,
	IGetUserRequest,
	IGetUserResponse,
	ICreateUserRequest,
	ICreateUserResponse,
	IUpdateUserRequest,
	IUpdateUserResponse
} from '@/models'

export default {
	getAll(params: IGetUsersRequest): Promise<IGetUsersResponse> {
		return axiosInstance.get('/api/v1/users', { params })
	},

	get(data: IGetUserRequest): Promise<IGetUserResponse> {
		return axiosInstance.get(`/api/v1/users/${data.id}`)
	},

	create(data: ICreateUserRequest): Promise<ICreateUserResponse> {
		return axiosInstance.post('/api/v1/users', data)
	},

	update(data: IUpdateUserRequest): Promise<IUpdateUserResponse> {
		return axiosInstance.patch(`/api/v1/users/${data.id}`, data)
	}
}
