import type { IResponseErrorField } from '@/types'
import { DEFAULT_ERROR_MESSAGE_TEXT } from '@/constants'

export enum ApiErrorCode {
	UserWithEmailAlreadyExist = '1005',
	UnknownError = '1004'
}

const apiErrorMessageByErrorCode: Record<ApiErrorCode, string> = {
	[ApiErrorCode.UnknownError]: DEFAULT_ERROR_MESSAGE_TEXT,
	[ApiErrorCode.UserWithEmailAlreadyExist]: 'Пользователь с указанной почтой уже зарегистрирован'
}

const allErorCodes = new Set(Object.keys(apiErrorMessageByErrorCode))

export const checkIsApiErrorField = (err: unknown): err is IResponseErrorField => {
	return allErorCodes.has((err as IResponseErrorField).code)
}

export const getApiErrorMessageByErrorCode = (code: ApiErrorCode): string => {
	return apiErrorMessageByErrorCode[code] || ''
}
