const environment = {
	API_URL: '',
	SENTRY_DNS: '',
	S3_DOMAIN_NAME: '',
	NODE_ENV: 'development' as NodeEnv
}

type NodeEnv = 'production' | 'development' | 'test'

export const environmentVariablesChecks = {
	API_URL: (value: unknown) => typeof value === 'string' && value !== '',
	SENTRY_DNS: (value: unknown) => typeof value === 'string' && value !== '',
	S3_DOMAIN_NAME: (value: unknown) => typeof value === 'string' && value !== ''
}

export async function loadEnvironmentVariables() {
	const env = await (await fetch(`environment.json?${Date.now()}`)).json()

	Object.entries(environmentVariablesChecks).forEach(([envVariableName, validator]) => {
		if (!validator(env[envVariableName])) {
			throw new Error(`Не задана env переменная ${envVariableName}`)
		}
	})

	Object.assign(environment, {
		API_URL: env.API_URL,
		SENTRY_DNS: env.SENTRY_DNS,
		S3_DOMAIN_NAME: env.S3_DOMAIN_NAME,
		NODE_ENV: process.env.NODE_ENV as NodeEnv
	})
}

export default environment
