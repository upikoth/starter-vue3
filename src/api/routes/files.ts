import { axiosInstance } from '@/api/axios'

import type {
	IUploadFileRequest,
	IUploadFileResponse,
	IGetFileRequest,
	IGetFileResponse,
	IGetFilesRequest,
	IGetFilesResponse,
	IDeleteFileRequest
} from '@/models'

export default {
	upload(data: IUploadFileRequest): Promise<IUploadFileResponse> {
		return axiosInstance.post('/api/v1/files', data)
	},

	get(data: IGetFileRequest): Promise<IGetFileResponse> {
		return axiosInstance.get(`/api/v1/files/${data.id}`)
	},

	getAll(params: IGetFilesRequest): Promise<IGetFilesResponse> {
		return axiosInstance.get('/api/v1/files', { params })
	},

	delete(data: IDeleteFileRequest): Promise<void> {
		return axiosInstance.delete(`/api/v1/files/${data.id}`)
	}
}
