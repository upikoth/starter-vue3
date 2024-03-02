import { expect, test } from 'vitest'

import { environmentVariablesChecks } from '@/environment'

test.each(Object.entries(environmentVariablesChecks))(
	'Проверяет что в окружении есть переменная с именем %s',
	(envVariableName, validator) => {
		expect(validator(process.env[envVariableName])).toBeTruthy()
	}
)
