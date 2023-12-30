import { axiosInstance } from '@/api/axios'
import type {
	IGetSessionsRequest,
	IGetSessionsResponse
} from '@/models'

export default {
	getAll(params: IGetSessionsRequest): Promise<IGetSessionsResponse> {
		return axiosInstance.get('/api/v1/sessions', { params })
	}
}
