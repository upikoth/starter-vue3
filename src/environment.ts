const environment = {
	API_URL: '',
	SENTRY_DSN: '',
	ENVIRONMENT: ''
}

export const environmentVariablesChecks = {
	API_URL: (value: unknown) => typeof value === 'string' && value !== '',
	SENTRY_DSN: (value: unknown) => typeof value === 'string' && value !== '',
	ENVIRONMENT: (value: unknown) => typeof value === 'string' && value !== ''
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
		SENTRY_DSN: env.SENTRY_DSN,
		ENVIRONMENT: env.ENVIRONMENT
	})
}

export default environment
