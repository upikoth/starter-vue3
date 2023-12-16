const env = import.meta.env

if (typeof env.VITE_API_URL !== 'string') {
	throw new Error('Не задана env переменная VITE_API_URL')
}

if (typeof env.VITE_SENTRY_DNS !== 'string') {
	throw new Error('Не задана env переменная SENTRY_DNS')
}

if (!checkIsNodeEnv(process.env.NODE_ENV)) {
	throw new Error('Не задана env переменная NODE_ENV')
}

export default {
	API_URL: env.VITE_API_URL,
	SENTRY_DNS: env.VITE_SENTRY_DNS,
	NODE_ENV: process.env.NODE_ENV
}

type NodeEnv = 'production' | 'development'

function checkIsNodeEnv(nodeEnv?: string): nodeEnv is NodeEnv {
	return ['production', 'development'].includes(nodeEnv as NodeEnv)
}
