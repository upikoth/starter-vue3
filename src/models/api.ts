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

export enum ApiLoadingStateEnum {
	Initial = 'initial',
	Loading = 'loading',
	LoadedSuccess = 'loaded-success',
	LoadedError = 'loaded-error'
}
