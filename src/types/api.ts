import type { ApiErrorCode } from '@/api'

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
	code: ApiErrorCode
	description: string
	details?: string
}

export enum ApiLoadingState {
	Initial = 'initial',
	Loading = 'loading',
	LoadedSuccess = 'loaded-success',
	LoadedError = 'loaded-error'
}
