import { expect, test } from 'vitest'

import { EMAIL_VALIDATION_REGEXP } from '@/constants'

test.each([
	{
		email: 'test@test.ru',
		isValid: true
	},
	{
		email: 'qwer123',
		isValid: false
	}
])('Проверяет EMAIL_VALIDATION_REGEXP', ({ email, isValid }) => {
	expect(EMAIL_VALIDATION_REGEXP.test(email)).toBe(isValid)
})
