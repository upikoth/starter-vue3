import type { ErrorResponseError } from '@/generated/starter'

const DEFAULT_ERROR_MESSAGE_TEXT = 'Произошла ошибка. Попробуйте позже'

export enum ApiErrorCodeEnum {
	ErrorCodeValidationByOpenapi = '1',
	ErrorCodeUserUnauthorized = '2',

	ErrorCodeRegistrationSMTPSendEmail = '100',
	ErrorCodeRegistrationYdbStarterCreateRegistration = '101',
	ErrorCodeRegistrationYdbStarterFindUser = '102',
	ErrorCodeRegistrationUserWithThisEmailAlreadyExist = '103',

	ErrorCodeRegistrationYdbStarterCheckConfirmationToken = '200',
	ErrorCodeRegistrationRegistrationNotFound = '201',
	ErrorCodeRegistrationGeneratePasswordHash = '202',
	ErrorCodeRegistrationCreateSession = '203'
}

const apiErrorCodeMessageMapping: Record<ApiErrorCodeEnum, string> = {
	[ApiErrorCodeEnum.ErrorCodeValidationByOpenapi]: 'Не удалось выполнить действие. Один из параметров задан неверно',
	[ApiErrorCodeEnum.ErrorCodeUserUnauthorized]: 'Авторизуйтесь для выполнения действия',

	[ApiErrorCodeEnum.ErrorCodeRegistrationSMTPSendEmail]: 'Не удалось зарегистрироваться. Попробуйте позже',
	[ApiErrorCodeEnum.ErrorCodeRegistrationYdbStarterCreateRegistration]:
		'Не удалось зарегистрироваться. Попробуйте позже',
	[ApiErrorCodeEnum.ErrorCodeRegistrationYdbStarterFindUser]: 'Не удалось зарегистрироваться. Попробуйте позже',
	[ApiErrorCodeEnum.ErrorCodeRegistrationUserWithThisEmailAlreadyExist]:
		'Пользователь с указанным email уже существует',

	[ApiErrorCodeEnum.ErrorCodeRegistrationYdbStarterCheckConfirmationToken]:
		'Не удалось зарегистрироваться. Попробуйте позже',
	[ApiErrorCodeEnum.ErrorCodeRegistrationRegistrationNotFound]:
		'Регистрация не найдена. Попробуйте зарегистрироваться заново',
	[ApiErrorCodeEnum.ErrorCodeRegistrationGeneratePasswordHash]:
		'Не удалось зарегистрироваться. Попробуйте позже',
	[ApiErrorCodeEnum.ErrorCodeRegistrationCreateSession]:
		'Не удалось зарегистрироваться. Попробуйте позже'
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
