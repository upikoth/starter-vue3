import axios from 'axios'

import { MILLISECONDS_IN_MINUTE } from '@/constants'

const axiosInstance = axios.create({
	timeout: MILLISECONDS_IN_MINUTE,
	baseURL: import.meta.env.DEV ? '' : import.meta.env.VITE_API_URL
})

export { axiosInstance }
