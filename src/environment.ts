const environment = {
	API_URL: '',
	SENTRY_DNS: '',
	S3_DOMAIN_NAME: '',
	NODE_ENV: 'development' as NodeEnv
}

type NodeEnv = 'production' | 'development'

function checkIsNodeEnv(nodeEnv?: string): nodeEnv is NodeEnv {
	return ['production', 'development'].includes(nodeEnv as NodeEnv)
}

export async function loadEnvironmentVariables() {
	const env = await (await fetch('environment.json')).json()

	if (typeof env.VITE_API_URL !== 'string') {
		throw new Error('Не задана env переменная VITE_API_URL')
	}

	if (typeof env.VITE_SENTRY_DNS !== 'string') {
		throw new Error('Не задана env переменная SENTRY_DNS')
	}

	if (typeof env.S3_DOMAIN_NAME !== 'string') {
		throw new Error('Не задана env переменная S3_DOMAIN_NAME')
	}

	if (!checkIsNodeEnv(process.env.NODE_ENV)) {
		throw new Error('Не задана env переменная NODE_ENV')
	}

	Object.assign(environment, {
		API_URL: env.VITE_API_URL,
		SENTRY_DNS: env.VITE_SENTRY_DNS,
		S3_DOMAIN_NAME: env.S3_DOMAIN_NAME,
		NODE_ENV: process.env.NODE_ENV
	})
}

export default environment
