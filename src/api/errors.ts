import type { ErrorResponseError } from '@/generated/app'

const DEFAULT_ERROR_MESSAGE_TEXT = 'Произошла ошибка. Попробуйте позже'

export enum ApiErrorCodeEnum {
	ErrorCodeValidationByOpenapi = '1',
	ErrorCodeUserUnauthorized = '2',

	ErrorCodeRegistrationSMTPSendEmail = '100',
	ErrorCodeRegistrationYdbCreateRegistration = '101',
	ErrorCodeRegistrationYdbFindUser = '102',
	ErrorCodeRegistrationUserWithThisEmailAlreadyExist = '103',

	ErrorCodeRegistrationYdbCheckConfirmationToken = '200',
	ErrorCodeRegistrationRegistrationNotFound = '201',
	ErrorCodeRegistrationGeneratePasswordHash = '202',
	ErrorCodeRegistrationCreateSession = '203',

	ErrorCodeSessionsCreateSessionDbError = '300',
	ErrorCodeSessionsCreateSessionWrongEmailOrPassword = '301',

	ErrorCodeSessionsDeleteSessionDbError = '400',
	ErrorCodeSessionsDeleteSessionNotFound = '401',

	ErrorCodePasswordRecoveryRequestYdbFindUser = '500',
	ErrorCodePasswordRecoveryRequestYdbCreatePasswordRecoveryRequest = '501',
	ErrorCodePasswordRecoveryRequestSMTPSendEmail = '502',

	ErrorCodePasswordRecoveryRequestYdbCheckConfirmationToken = '600',
	ErrorCodePasswordRecoveryRequestPasswordRecoveryRequestNotFound = '601',
	ErrorCodePasswordRecoveryRequestGeneratePasswordHash = '602',
	ErrorCodePasswordRecoveryRequestCreateSession = '603',
	ErrorCodePasswordRecoveryRequestUpdateUserPassword = '604',

	ErrorCodeUsersGetListForbidden = '700',
	ErrorCodeUsersGetListDBError = '701',

	ErrorCodeSessionsCheckTokenDBError = '800',

	ErrorCodeOauthSourceNotExist = '900',
}

const apiErrorCodeMessageMapping: Record<ApiErrorCodeEnum, string> = {
	[ApiErrorCodeEnum.ErrorCodeValidationByOpenapi]: 'Не удалось выполнить действие. Один из параметров задан неверно',
	[ApiErrorCodeEnum.ErrorCodeUserUnauthorized]: 'Авторизуйтесь для выполнения действия',

	[ApiErrorCodeEnum.ErrorCodeRegistrationSMTPSendEmail]: 'Не удалось зарегистрироваться. Попробуйте позже',
	[ApiErrorCodeEnum.ErrorCodeRegistrationYdbCreateRegistration]:
		'Не удалось зарегистрироваться. Попробуйте позже',
	[ApiErrorCodeEnum.ErrorCodeRegistrationYdbFindUser]: 'Не удалось зарегистрироваться. Попробуйте позже',
	[ApiErrorCodeEnum.ErrorCodeRegistrationUserWithThisEmailAlreadyExist]:
		'Пользователь с указанным email уже существует',

	[ApiErrorCodeEnum.ErrorCodeRegistrationYdbCheckConfirmationToken]:
		'Не удалось зарегистрироваться. Попробуйте позже',
	[ApiErrorCodeEnum.ErrorCodeRegistrationRegistrationNotFound]:
		'Регистрация не найдена. Попробуйте зарегистрироваться заново',
	[ApiErrorCodeEnum.ErrorCodeRegistrationGeneratePasswordHash]:
		'Не удалось зарегистрироваться. Попробуйте позже',
	[ApiErrorCodeEnum.ErrorCodeRegistrationCreateSession]:
		'Не удалось зарегистрироваться. Попробуйте позже',

	[ApiErrorCodeEnum.ErrorCodeSessionsCreateSessionDbError]:
		DEFAULT_ERROR_MESSAGE_TEXT,
	[ApiErrorCodeEnum.ErrorCodeSessionsCreateSessionWrongEmailOrPassword]:
		'Неверные email или пароль',

	[ApiErrorCodeEnum.ErrorCodeSessionsDeleteSessionDbError]:
		DEFAULT_ERROR_MESSAGE_TEXT,
	[ApiErrorCodeEnum.ErrorCodeSessionsDeleteSessionNotFound]:
		DEFAULT_ERROR_MESSAGE_TEXT,

	[ApiErrorCodeEnum.ErrorCodePasswordRecoveryRequestYdbFindUser]:
		DEFAULT_ERROR_MESSAGE_TEXT,
	[ApiErrorCodeEnum.ErrorCodePasswordRecoveryRequestYdbCreatePasswordRecoveryRequest]:
		DEFAULT_ERROR_MESSAGE_TEXT,
	[ApiErrorCodeEnum.ErrorCodePasswordRecoveryRequestSMTPSendEmail]:
		DEFAULT_ERROR_MESSAGE_TEXT,

	[ApiErrorCodeEnum.ErrorCodePasswordRecoveryRequestYdbCheckConfirmationToken]:
		DEFAULT_ERROR_MESSAGE_TEXT,
	[ApiErrorCodeEnum.ErrorCodePasswordRecoveryRequestPasswordRecoveryRequestNotFound]:
		'Запрос не найден. Попробуйте заново',
	[ApiErrorCodeEnum.ErrorCodePasswordRecoveryRequestGeneratePasswordHash]:
		DEFAULT_ERROR_MESSAGE_TEXT,
	[ApiErrorCodeEnum.ErrorCodePasswordRecoveryRequestCreateSession]:
		DEFAULT_ERROR_MESSAGE_TEXT,
	[ApiErrorCodeEnum.ErrorCodePasswordRecoveryRequestUpdateUserPassword]:
		DEFAULT_ERROR_MESSAGE_TEXT,

	[ApiErrorCodeEnum.ErrorCodeUsersGetListForbidden]:
	DEFAULT_ERROR_MESSAGE_TEXT,
	[ApiErrorCodeEnum.ErrorCodeUsersGetListDBError]:
	DEFAULT_ERROR_MESSAGE_TEXT,

	[ApiErrorCodeEnum.ErrorCodeSessionsCheckTokenDBError]:
	DEFAULT_ERROR_MESSAGE_TEXT,

	[ApiErrorCodeEnum.ErrorCodeOauthSourceNotExist]:
	DEFAULT_ERROR_MESSAGE_TEXT
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
