import { axiosInstance } from '@/api/axios'


export default {
	getHealth(): Promise<void> {
		return axiosInstance.get('/api/v1/health')
	}
}
