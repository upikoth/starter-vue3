/* tslint:disable */
/* eslint-disable */
/**
 * Starter schema
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from './configuration';
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
import type { RequestArgs } from './base';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, BaseAPI, RequiredError, operationServerMap } from './base';

/**
 * 
 * @export
 * @interface ErrorResponse
 */
export interface ErrorResponse {
    /**
     * 
     * @type {boolean}
     * @memberof ErrorResponse
     */
    'success': boolean;
    /**
     * 
     * @type {object}
     * @memberof ErrorResponse
     */
    'data': object;
    /**
     * 
     * @type {ErrorResponseError}
     * @memberof ErrorResponse
     */
    'error': ErrorResponseError;
}
/**
 * 
 * @export
 * @interface ErrorResponseError
 */
export interface ErrorResponseError {
    /**
     * 
     * @type {string}
     * @memberof ErrorResponseError
     */
    'code': string;
    /**
     * 
     * @type {string}
     * @memberof ErrorResponseError
     */
    'description': string;
}
/**
 * 
 * @export
 * @interface SuccessResponse
 */
export interface SuccessResponse {
    /**
     * 
     * @type {boolean}
     * @memberof SuccessResponse
     */
    'success': boolean;
    /**
     * 
     * @type {object}
     * @memberof SuccessResponse
     */
    'data': object;
}
/**
 * 
 * @export
 * @interface V1RegistrationsConfirmRegistrationRequestBody
 */
export interface V1RegistrationsConfirmRegistrationRequestBody {
    /**
     * 
     * @type {string}
     * @memberof V1RegistrationsConfirmRegistrationRequestBody
     */
    'confirmationToken': string;
    /**
     * 
     * @type {string}
     * @memberof V1RegistrationsConfirmRegistrationRequestBody
     */
    'password': string;
}
/**
 * 
 * @export
 * @interface V1RegistrationsConfirmRegistrationResponse
 */
export interface V1RegistrationsConfirmRegistrationResponse {
    /**
     * 
     * @type {boolean}
     * @memberof V1RegistrationsConfirmRegistrationResponse
     */
    'success': boolean;
    /**
     * 
     * @type {V1RegistrationsConfirmRegistrationResponseData}
     * @memberof V1RegistrationsConfirmRegistrationResponse
     */
    'data': V1RegistrationsConfirmRegistrationResponseData;
}
/**
 * 
 * @export
 * @interface V1RegistrationsConfirmRegistrationResponseData
 */
export interface V1RegistrationsConfirmRegistrationResponseData {
    /**
     * 
     * @type {V1RegistrationsConfirmRegistrationResponseDataSession}
     * @memberof V1RegistrationsConfirmRegistrationResponseData
     */
    'session': V1RegistrationsConfirmRegistrationResponseDataSession;
}
/**
 * 
 * @export
 * @interface V1RegistrationsConfirmRegistrationResponseDataSession
 */
export interface V1RegistrationsConfirmRegistrationResponseDataSession {
    /**
     * 
     * @type {string}
     * @memberof V1RegistrationsConfirmRegistrationResponseDataSession
     */
    'id': string;
    /**
     * 
     * @type {string}
     * @memberof V1RegistrationsConfirmRegistrationResponseDataSession
     */
    'token': string;
}
/**
 * 
 * @export
 * @interface V1RegistrationsCreateRegistrationRequestBody
 */
export interface V1RegistrationsCreateRegistrationRequestBody {
    /**
     * 
     * @type {string}
     * @memberof V1RegistrationsCreateRegistrationRequestBody
     */
    'email': string;
}
/**
 * 
 * @export
 * @interface V1RegistrationsCreateRegistrationResponse
 */
export interface V1RegistrationsCreateRegistrationResponse {
    /**
     * 
     * @type {boolean}
     * @memberof V1RegistrationsCreateRegistrationResponse
     */
    'success': boolean;
    /**
     * 
     * @type {V1RegistrationsCreateRegistrationResponseData}
     * @memberof V1RegistrationsCreateRegistrationResponse
     */
    'data': V1RegistrationsCreateRegistrationResponseData;
}
/**
 * 
 * @export
 * @interface V1RegistrationsCreateRegistrationResponseData
 */
export interface V1RegistrationsCreateRegistrationResponseData {
    /**
     * 
     * @type {string}
     * @memberof V1RegistrationsCreateRegistrationResponseData
     */
    'id': string;
    /**
     * 
     * @type {string}
     * @memberof V1RegistrationsCreateRegistrationResponseData
     */
    'email': string;
}
/**
 * 
 * @export
 * @interface V1SessionsCreateSessionRequestBody
 */
export interface V1SessionsCreateSessionRequestBody {
    /**
     * 
     * @type {string}
     * @memberof V1SessionsCreateSessionRequestBody
     */
    'email': string;
    /**
     * 
     * @type {string}
     * @memberof V1SessionsCreateSessionRequestBody
     */
    'password': string;
}
/**
 * 
 * @export
 * @interface V1SessionsCreateSessionResponse
 */
export interface V1SessionsCreateSessionResponse {
    /**
     * 
     * @type {boolean}
     * @memberof V1SessionsCreateSessionResponse
     */
    'success': boolean;
    /**
     * 
     * @type {V1RegistrationsConfirmRegistrationResponseData}
     * @memberof V1SessionsCreateSessionResponse
     */
    'data': V1RegistrationsConfirmRegistrationResponseData;
}

/**
 * HealthApi - axios parameter creator
 * @export
 */
export const HealthApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Получить информацию о работоспособности приложения
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        v1CheckHealth: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/v1/health`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * HealthApi - functional programming interface
 * @export
 */
export const HealthApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = HealthApiAxiosParamCreator(configuration)
    return {
        /**
         * Получить информацию о работоспособности приложения
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async v1CheckHealth(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<SuccessResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.v1CheckHealth(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['HealthApi.v1CheckHealth']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * HealthApi - factory interface
 * @export
 */
export const HealthApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = HealthApiFp(configuration)
    return {
        /**
         * Получить информацию о работоспособности приложения
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        v1CheckHealth(options?: any): AxiosPromise<SuccessResponse> {
            return localVarFp.v1CheckHealth(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * HealthApi - object-oriented interface
 * @export
 * @class HealthApi
 * @extends {BaseAPI}
 */
export class HealthApi extends BaseAPI {
    /**
     * Получить информацию о работоспособности приложения
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof HealthApi
     */
    public v1CheckHealth(options?: RawAxiosRequestConfig) {
        return HealthApiFp(this.configuration).v1CheckHealth(options).then((request) => request(this.axios, this.basePath));
    }
}



/**
 * RegistrationsApi - axios parameter creator
 * @export
 */
export const RegistrationsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Подтверждение заявки на регистрацию
         * @param {V1RegistrationsConfirmRegistrationRequestBody} v1RegistrationsConfirmRegistrationRequestBody Запрос для подтверждения регистрации, создание пользователя с заданным паролем и авторизации
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        v1ConfirmRegistration: async (v1RegistrationsConfirmRegistrationRequestBody: V1RegistrationsConfirmRegistrationRequestBody, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'v1RegistrationsConfirmRegistrationRequestBody' is not null or undefined
            assertParamExists('v1ConfirmRegistration', 'v1RegistrationsConfirmRegistrationRequestBody', v1RegistrationsConfirmRegistrationRequestBody)
            const localVarPath = `/api/v1/registrations`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PATCH', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(v1RegistrationsConfirmRegistrationRequestBody, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Создать заявку на регистрацию пользователя
         * @param {V1RegistrationsCreateRegistrationRequestBody} v1RegistrationsCreateRegistrationRequestBody Запрос для создания заявки на регистрацию
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        v1CreateRegistration: async (v1RegistrationsCreateRegistrationRequestBody: V1RegistrationsCreateRegistrationRequestBody, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'v1RegistrationsCreateRegistrationRequestBody' is not null or undefined
            assertParamExists('v1CreateRegistration', 'v1RegistrationsCreateRegistrationRequestBody', v1RegistrationsCreateRegistrationRequestBody)
            const localVarPath = `/api/v1/registrations`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(v1RegistrationsCreateRegistrationRequestBody, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * RegistrationsApi - functional programming interface
 * @export
 */
export const RegistrationsApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = RegistrationsApiAxiosParamCreator(configuration)
    return {
        /**
         * Подтверждение заявки на регистрацию
         * @param {V1RegistrationsConfirmRegistrationRequestBody} v1RegistrationsConfirmRegistrationRequestBody Запрос для подтверждения регистрации, создание пользователя с заданным паролем и авторизации
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async v1ConfirmRegistration(v1RegistrationsConfirmRegistrationRequestBody: V1RegistrationsConfirmRegistrationRequestBody, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<V1RegistrationsConfirmRegistrationResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.v1ConfirmRegistration(v1RegistrationsConfirmRegistrationRequestBody, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['RegistrationsApi.v1ConfirmRegistration']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * Создать заявку на регистрацию пользователя
         * @param {V1RegistrationsCreateRegistrationRequestBody} v1RegistrationsCreateRegistrationRequestBody Запрос для создания заявки на регистрацию
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async v1CreateRegistration(v1RegistrationsCreateRegistrationRequestBody: V1RegistrationsCreateRegistrationRequestBody, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<V1RegistrationsCreateRegistrationResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.v1CreateRegistration(v1RegistrationsCreateRegistrationRequestBody, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['RegistrationsApi.v1CreateRegistration']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * RegistrationsApi - factory interface
 * @export
 */
export const RegistrationsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = RegistrationsApiFp(configuration)
    return {
        /**
         * Подтверждение заявки на регистрацию
         * @param {V1RegistrationsConfirmRegistrationRequestBody} v1RegistrationsConfirmRegistrationRequestBody Запрос для подтверждения регистрации, создание пользователя с заданным паролем и авторизации
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        v1ConfirmRegistration(v1RegistrationsConfirmRegistrationRequestBody: V1RegistrationsConfirmRegistrationRequestBody, options?: any): AxiosPromise<V1RegistrationsConfirmRegistrationResponse> {
            return localVarFp.v1ConfirmRegistration(v1RegistrationsConfirmRegistrationRequestBody, options).then((request) => request(axios, basePath));
        },
        /**
         * Создать заявку на регистрацию пользователя
         * @param {V1RegistrationsCreateRegistrationRequestBody} v1RegistrationsCreateRegistrationRequestBody Запрос для создания заявки на регистрацию
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        v1CreateRegistration(v1RegistrationsCreateRegistrationRequestBody: V1RegistrationsCreateRegistrationRequestBody, options?: any): AxiosPromise<V1RegistrationsCreateRegistrationResponse> {
            return localVarFp.v1CreateRegistration(v1RegistrationsCreateRegistrationRequestBody, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * RegistrationsApi - object-oriented interface
 * @export
 * @class RegistrationsApi
 * @extends {BaseAPI}
 */
export class RegistrationsApi extends BaseAPI {
    /**
     * Подтверждение заявки на регистрацию
     * @param {V1RegistrationsConfirmRegistrationRequestBody} v1RegistrationsConfirmRegistrationRequestBody Запрос для подтверждения регистрации, создание пользователя с заданным паролем и авторизации
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RegistrationsApi
     */
    public v1ConfirmRegistration(v1RegistrationsConfirmRegistrationRequestBody: V1RegistrationsConfirmRegistrationRequestBody, options?: RawAxiosRequestConfig) {
        return RegistrationsApiFp(this.configuration).v1ConfirmRegistration(v1RegistrationsConfirmRegistrationRequestBody, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Создать заявку на регистрацию пользователя
     * @param {V1RegistrationsCreateRegistrationRequestBody} v1RegistrationsCreateRegistrationRequestBody Запрос для создания заявки на регистрацию
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RegistrationsApi
     */
    public v1CreateRegistration(v1RegistrationsCreateRegistrationRequestBody: V1RegistrationsCreateRegistrationRequestBody, options?: RawAxiosRequestConfig) {
        return RegistrationsApiFp(this.configuration).v1CreateRegistration(v1RegistrationsCreateRegistrationRequestBody, options).then((request) => request(this.axios, this.basePath));
    }
}



/**
 * SessionsApi - axios parameter creator
 * @export
 */
export const SessionsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Получить информацию валидна ли текущая сессия
         * @param {string} authorizationToken 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        v1CheckCurrentSession: async (authorizationToken: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'authorizationToken' is not null or undefined
            assertParamExists('v1CheckCurrentSession', 'authorizationToken', authorizationToken)
            const localVarPath = `/api/v1/session`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (authorizationToken != null) {
                localVarHeaderParameter['Authorization-Token'] = String(authorizationToken);
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Создание сессии пользователя
         * @param {V1SessionsCreateSessionRequestBody} v1SessionsCreateSessionRequestBody Запрос для создания сессии для пользователя
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        v1CreateSession: async (v1SessionsCreateSessionRequestBody: V1SessionsCreateSessionRequestBody, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'v1SessionsCreateSessionRequestBody' is not null or undefined
            assertParamExists('v1CreateSession', 'v1SessionsCreateSessionRequestBody', v1SessionsCreateSessionRequestBody)
            const localVarPath = `/api/v1/sessions`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(v1SessionsCreateSessionRequestBody, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * SessionsApi - functional programming interface
 * @export
 */
export const SessionsApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = SessionsApiAxiosParamCreator(configuration)
    return {
        /**
         * Получить информацию валидна ли текущая сессия
         * @param {string} authorizationToken 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async v1CheckCurrentSession(authorizationToken: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<SuccessResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.v1CheckCurrentSession(authorizationToken, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['SessionsApi.v1CheckCurrentSession']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * Создание сессии пользователя
         * @param {V1SessionsCreateSessionRequestBody} v1SessionsCreateSessionRequestBody Запрос для создания сессии для пользователя
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async v1CreateSession(v1SessionsCreateSessionRequestBody: V1SessionsCreateSessionRequestBody, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<V1SessionsCreateSessionResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.v1CreateSession(v1SessionsCreateSessionRequestBody, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['SessionsApi.v1CreateSession']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * SessionsApi - factory interface
 * @export
 */
export const SessionsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = SessionsApiFp(configuration)
    return {
        /**
         * Получить информацию валидна ли текущая сессия
         * @param {string} authorizationToken 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        v1CheckCurrentSession(authorizationToken: string, options?: any): AxiosPromise<SuccessResponse> {
            return localVarFp.v1CheckCurrentSession(authorizationToken, options).then((request) => request(axios, basePath));
        },
        /**
         * Создание сессии пользователя
         * @param {V1SessionsCreateSessionRequestBody} v1SessionsCreateSessionRequestBody Запрос для создания сессии для пользователя
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        v1CreateSession(v1SessionsCreateSessionRequestBody: V1SessionsCreateSessionRequestBody, options?: any): AxiosPromise<V1SessionsCreateSessionResponse> {
            return localVarFp.v1CreateSession(v1SessionsCreateSessionRequestBody, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * SessionsApi - object-oriented interface
 * @export
 * @class SessionsApi
 * @extends {BaseAPI}
 */
export class SessionsApi extends BaseAPI {
    /**
     * Получить информацию валидна ли текущая сессия
     * @param {string} authorizationToken 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SessionsApi
     */
    public v1CheckCurrentSession(authorizationToken: string, options?: RawAxiosRequestConfig) {
        return SessionsApiFp(this.configuration).v1CheckCurrentSession(authorizationToken, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Создание сессии пользователя
     * @param {V1SessionsCreateSessionRequestBody} v1SessionsCreateSessionRequestBody Запрос для создания сессии для пользователя
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SessionsApi
     */
    public v1CreateSession(v1SessionsCreateSessionRequestBody: V1SessionsCreateSessionRequestBody, options?: RawAxiosRequestConfig) {
        return SessionsApiFp(this.configuration).v1CreateSession(v1SessionsCreateSessionRequestBody, options).then((request) => request(this.axios, this.basePath));
    }
}



