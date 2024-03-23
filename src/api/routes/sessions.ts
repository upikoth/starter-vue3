import { axiosInstance } from '@/api/axios'

import type {
	IGetSessionsRequest,
	IGetSessionsResponseData,
	IDeleteSessionRequest,
	ICreateSessionRequest,
	ICreateSessionResponseData,
	IGetCurrentSessionResponseData
} from '@/models'

export default {
	getAll(params: IGetSessionsRequest): Promise<IGetSessionsResponseData> {
		return axiosInstance.get('/api/v1/sessions', { params })
	},

	delete(data: IDeleteSessionRequest): Promise<void> {
		return axiosInstance.delete(`/api/v1/sessions/${data.id}`)
	},

	create(data: ICreateSessionRequest): Promise<ICreateSessionResponseData> {
		return axiosInstance.post('/api/v1/sessions', data)
	},

	getCurrentSession(): Promise<IGetCurrentSessionResponseData> {
		return axiosInstance.get('/api/v1/session')
	}
}
