
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

export enum ApiErrorCode {}
