import type { ErrorResponseError } from '@/generated/starter'

const DEFAULT_ERROR_MESSAGE_TEXT = 'Произошла ошибка. Попробуйте позже'

enum ApiErrorCodeEnum {
	ErrorCodeValidationByOpenapi = '1',
	ErrorCodeRegistrationSMTPSendEmail = '2',
	ErrorCodeRegistrationYdbStarterCreateEmail = '3',
}

const apiErrorCodeMessageMapping: Record<ApiErrorCodeEnum, string> = {
	[ApiErrorCodeEnum.ErrorCodeValidationByOpenapi]: 'Не удалось выполнить действие. Один из параметров задан неверно',
	[ApiErrorCodeEnum.ErrorCodeRegistrationSMTPSendEmail]: 'Не удалось зарегистрироваться. Попробуйте позже',
	[ApiErrorCodeEnum.ErrorCodeRegistrationYdbStarterCreateEmail]: 'Не удалось зарегистрироваться. Попробуйте позже'
}

const allErrorCodes = new Set(Object.keys(apiErrorCodeMessageMapping))

const checkIsApiErrorField = (err: unknown): err is ErrorResponseError =>
	allErrorCodes.has(String((err as ErrorResponseError).code))

const getApiErrorMessageByErrorCode = (code: ApiErrorCodeEnum): string =>
	apiErrorCodeMessageMapping[code] || DEFAULT_ERROR_MESSAGE_TEXT

export const getApiErrorOrMessage = (err: unknown, message?: string): string => {
	if (checkIsApiErrorField(err)) {
		return getApiErrorMessageByErrorCode(err.code as ApiErrorCodeEnum)
	}

	return message || DEFAULT_ERROR_MESSAGE_TEXT
}
