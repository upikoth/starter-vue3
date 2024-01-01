import { axiosInstance } from '@/api/axios'
import type {
	IGetSessionsRequest,
	IGetSessionsResponse,
	IDeleteSessionRequest,
	ICreateSessionRequest,
	ICreateSessionResponse,
	IGetCurrentSessionResponse
} from '@/models'

export default {
	getAll(params: IGetSessionsRequest): Promise<IGetSessionsResponse> {
		return axiosInstance.get('/api/v1/sessions', { params })
	},

	delete(data: IDeleteSessionRequest): Promise<void> {
		return axiosInstance.delete(`/api/v1/sessions/${data.id}`)
	},

	create(data: ICreateSessionRequest): Promise<ICreateSessionResponse> {
		return axiosInstance.post('/api/v1/sessions', data)
	},

	getCurrentSession(): Promise<IGetCurrentSessionResponse> {
		return axiosInstance.get('/api/v1/session')
	}
}
