import type { IResponseErrorField } from '@/models'
import { DEFAULT_ERROR_MESSAGE_TEXT } from '@/constants'

export enum ApiErrorCodeEnum {
	UrlNotFound = 1,
	Unknown = 2,
	ValidationError = 3,
	EntityNotFound = 4,
	UserWithThisEmailAlreadyExist = 5,
}

const apiErrorCodeMessageMapping: Record<ApiErrorCodeEnum, string> = {
	[ApiErrorCodeEnum.Unknown]: DEFAULT_ERROR_MESSAGE_TEXT,
	[ApiErrorCodeEnum.UrlNotFound]: 'Метод не найден',
	[ApiErrorCodeEnum.ValidationError]: 'Проверьте корректность переданных данных',
	[ApiErrorCodeEnum.EntityNotFound]: 'Не найдено',
	[ApiErrorCodeEnum.UserWithThisEmailAlreadyExist]: 'Пользователь с указанной почтой уже зарегистрирован'
}

const allErorCodes = new Set(Object.keys(apiErrorCodeMessageMapping))

export const checkIsApiErrorField = (err: unknown): err is IResponseErrorField => {
	return allErorCodes.has(String((err as IResponseErrorField).code))
}

export const getApiErrorMessageByErrorCode = (code: ApiErrorCodeEnum): string => {
	return apiErrorCodeMessageMapping[code] || ''
}
