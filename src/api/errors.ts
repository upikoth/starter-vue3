import type { ErrorResponseError } from '@/generated/app'

const DEFAULT_ERROR_MESSAGE_TEXT = 'Произошла ошибка. Попробуйте позже'

export enum ApiErrorCodeEnum {
	ErrCodeValidationByOpenapi = '1',
	ErrCodeUserUnauthorized = '2',
	ErrCodeInterval = '3',

	ErrCodeRegistrationUserWithThisEmailAlreadyExist = '100',
	ErrCodeRegistrationNotFound = '101',
	ErrCodeRegistrationCreatingSession = '102',

	ErrCodeCreateSessionWrongEmailOrPassword = '200',
	ErrCodeSessionNotFound = '201',

	ErrCodePasswordRecoveryRequestNotFound = '300',
	ErrCodePasswordRecoveryRequestCreatingSession = '301',

	ErrCodeUsersGetListForbidden = '400',

	ErrCodeOauthSourceNotExist = '500',
}

const apiErrorCodeMessageMapping: Record<ApiErrorCodeEnum, string> = {
	[ApiErrorCodeEnum.ErrCodeValidationByOpenapi]: 'Не удалось выполнить действие. Один из параметров задан неверно',
	[ApiErrorCodeEnum.ErrCodeUserUnauthorized]: 'Авторизуйтесь для выполнения действия',
	[ApiErrorCodeEnum.ErrCodeInterval]: DEFAULT_ERROR_MESSAGE_TEXT,

	[ApiErrorCodeEnum.ErrCodeRegistrationUserWithThisEmailAlreadyExist]:
		'Пользователь с указанным email уже существует',
	[ApiErrorCodeEnum.ErrCodeRegistrationNotFound]: 'Регистрация не найдена. Попробуйте зарегистрироваться заново',
	[ApiErrorCodeEnum.ErrCodeRegistrationCreatingSession]: DEFAULT_ERROR_MESSAGE_TEXT,

	[ApiErrorCodeEnum.ErrCodeCreateSessionWrongEmailOrPassword]:
		'Неверные email или пароль',
	[ApiErrorCodeEnum.ErrCodeSessionNotFound]: DEFAULT_ERROR_MESSAGE_TEXT,

	[ApiErrorCodeEnum.ErrCodePasswordRecoveryRequestNotFound]:
		'Запрос не найден. Попробуйте заново',
	[ApiErrorCodeEnum.ErrCodePasswordRecoveryRequestCreatingSession]: DEFAULT_ERROR_MESSAGE_TEXT,

	[ApiErrorCodeEnum.ErrCodeUsersGetListForbidden]: DEFAULT_ERROR_MESSAGE_TEXT,

	[ApiErrorCodeEnum.ErrCodeOauthSourceNotExist]: DEFAULT_ERROR_MESSAGE_TEXT

}

const allErrorCodes = new Set(Object.keys(apiErrorCodeMessageMapping))

export const checkIsApiErrorField = (err: unknown): err is ErrorResponseError =>
	allErrorCodes.has(String((err as ErrorResponseError).code))

const getApiErrorMessageByErrorCode = (code: ApiErrorCodeEnum): string =>
	apiErrorCodeMessageMapping[code] || DEFAULT_ERROR_MESSAGE_TEXT

export const getApiErrorOrMessage = (err: unknown, message?: string): string => {
	if (checkIsApiErrorField(err)) {
		return getApiErrorMessageByErrorCode(err.code as ApiErrorCodeEnum)
	}

	return message || DEFAULT_ERROR_MESSAGE_TEXT
}
