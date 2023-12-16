import type { QTableProps } from 'quasar'

export function paginationToLimitOffset(
	pagination: NonNullable<QTableProps['pagination']>
): { limit: number, offset: number } {
	const { page = 0, rowsPerPage = 10 } = pagination
	const limit = rowsPerPage
	const offset = (page - 1) * rowsPerPage

	return {
		limit,
		offset
	}
}
