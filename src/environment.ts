const env = import.meta.env

if (typeof env.VITE_API_URL !== 'string') {
	throw new Error('ENV: VITE_API_URL не задана')
}

if (typeof env.VITE_SENTRY_DNS !== 'string') {
	throw new Error('ENV: SENTRY_DNS не задана')
}

export default {
	API_URL: env.VITE_API_URL,
	SENTRY_DNS: env.VITE_SENTRY_DNS
}
