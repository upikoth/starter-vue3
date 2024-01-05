import type { ApiErrorCodeEnum } from '@/api'

export type IResponse = IResponseSuccess | IResponseError

export interface IResponseSuccess {
	success: true
	data: unknown
}

export interface IResponseError {
	success: false
	error: IResponseErrorField
}

export interface IResponseErrorField {
	code: ApiErrorCodeEnum
	description: string
}

export enum LoadingStateEnum {
	LoadingNotStarted = 'LOADING_NOT_STARTED',
	Loading = 'LOADING',
	LoadedSuccess = 'LOADED_SUCCESS',
	LoadedError = 'LOADED_ERROR',
}
