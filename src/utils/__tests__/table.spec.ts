import { expect, test } from 'vitest'

import { paginationToLimitOffset } from '@/utils'

test.each([
	{
		pagination: {},
		expected: {
			limit: 10,
			offset: 0
		}
	},
	{
		pagination: {
			page: 1,
			rowsPerPage: 50
		},
		expected: {
			limit: 50,
			offset: 0
		}
	},
	{
		pagination: {
			page: 2,
			rowsPerPage: 20
		},
		expected: {
			limit: 20,
			offset: 20
		}
	}
])('Тестирует функцию paginationToLimitOffset', ({ pagination, expected }) => {
	expect(paginationToLimitOffset(pagination)).toMatchObject(expected)
})
