const environment = {
	STARTER_API_URL: '',
	SENTRY_DNS: '',
	NODE_ENV: 'development' as NodeEnv
}

type NodeEnv = 'production' | 'development' | 'test'

export const environmentVariablesChecks = {
	STARTER_API_URL: (value: unknown) => typeof value === 'string' && value !== '',
	SENTRY_DNS: (value: unknown) => typeof value === 'string' && value !== ''
}

export async function loadEnvironmentVariables() {
	const env = await (await fetch(`environment.json?${Date.now()}`)).json()

	Object.entries(environmentVariablesChecks).forEach(([envVariableName, validator]) => {
		if (!validator(env[envVariableName])) {
			throw new Error(`Не задана env переменная ${envVariableName}`)
		}
	})

	Object.assign(environment, {
		STARTER_API_URL: env.STARTER_API_URL,
		SENTRY_DNS: env.SENTRY_DNS,
		NODE_ENV: process.env.NODE_ENV as NodeEnv
	})
}

export default environment
