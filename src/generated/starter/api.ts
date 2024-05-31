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
 * RegistrationApi - axios parameter creator
 * @export
 */
export const RegistrationApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
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
 * RegistrationApi - functional programming interface
 * @export
 */
export const RegistrationApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = RegistrationApiAxiosParamCreator(configuration)
    return {
        /**
         * Создать заявку на регистрацию пользователя
         * @param {V1RegistrationsCreateRegistrationRequestBody} v1RegistrationsCreateRegistrationRequestBody Запрос для создания заявки на регистрацию
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async v1CreateRegistration(v1RegistrationsCreateRegistrationRequestBody: V1RegistrationsCreateRegistrationRequestBody, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<V1RegistrationsCreateRegistrationResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.v1CreateRegistration(v1RegistrationsCreateRegistrationRequestBody, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['RegistrationApi.v1CreateRegistration']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * RegistrationApi - factory interface
 * @export
 */
export const RegistrationApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = RegistrationApiFp(configuration)
    return {
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
 * RegistrationApi - object-oriented interface
 * @export
 * @class RegistrationApi
 * @extends {BaseAPI}
 */
export class RegistrationApi extends BaseAPI {
    /**
     * Создать заявку на регистрацию пользователя
     * @param {V1RegistrationsCreateRegistrationRequestBody} v1RegistrationsCreateRegistrationRequestBody Запрос для создания заявки на регистрацию
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RegistrationApi
     */
    public v1CreateRegistration(v1RegistrationsCreateRegistrationRequestBody: V1RegistrationsCreateRegistrationRequestBody, options?: RawAxiosRequestConfig) {
        return RegistrationApiFp(this.configuration).v1CreateRegistration(v1RegistrationsCreateRegistrationRequestBody, options).then((request) => request(this.axios, this.basePath));
    }
}


