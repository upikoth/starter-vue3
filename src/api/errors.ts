import type { IResponseErrorField } from '@/models'

const DEFAULT_ERROR_MESSAGE_TEXT = 'Произошла ошибка. Попробуйте позже'

export enum ApiErrorCodeEnum {
	UrlNotFound = 1,
	Unknown = 2,
	ValidationError = 3,
	EntityNotFound = 4,
	UserWithThisEmailAlreadyExist = 5,
	EmailOrPasswordInvalid = 6,
	SessionAlreadyExist = 7,
	UserBlocked = 8,
	Unauthorized = 9,
}

const apiErrorCodeMessageMapping: Record<ApiErrorCodeEnum, string> = {
	[ApiErrorCodeEnum.Unknown]: DEFAULT_ERROR_MESSAGE_TEXT,
	[ApiErrorCodeEnum.UrlNotFound]: 'Метод не найден',
	[ApiErrorCodeEnum.ValidationError]: 'Проверьте корректность переданных данных',
	[ApiErrorCodeEnum.EntityNotFound]: 'Сущность, над которой нужно совершить действие не найдена',
	[ApiErrorCodeEnum.UserWithThisEmailAlreadyExist]: 'Пользователь с указанной почтой уже зарегистрирован',
	[ApiErrorCodeEnum.EmailOrPasswordInvalid]: 'Email или пароль указаны некорректно',
	[ApiErrorCodeEnum.SessionAlreadyExist]: 'Сессия уже существует',
	[ApiErrorCodeEnum.UserBlocked]: 'Пользователь заблокирован',
	[ApiErrorCodeEnum.Unauthorized]: 'Пользователь не авторизован'
}

const allErrorCodes = new Set(Object.keys(apiErrorCodeMessageMapping))

const checkIsApiErrorField = (err: unknown): err is IResponseErrorField => {
	return allErrorCodes.has(String((err as IResponseErrorField).code))
}

const getApiErrorMessageByErrorCode = (code: ApiErrorCodeEnum): string => {
	return apiErrorCodeMessageMapping[code] || DEFAULT_ERROR_MESSAGE_TEXT
}

export const getApiErrorOrMessage = (err: unknown, message?: string): string => {
	if (checkIsApiErrorField(err)) {
		return getApiErrorMessageByErrorCode(err.code)
	}

	return message || DEFAULT_ERROR_MESSAGE_TEXT
}
