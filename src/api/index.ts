import health from './routes/health'
import registrations from './routes/registrations'
import users from './routes/users'

export * from './routes/health'
export * from './routes/registrations'
export * from './routes/users'

export * from './errors'

export enum LoadingStateEnum {
	LoadingNotStarted = 'LOADING_NOT_STARTED',
	Loading = 'LOADING',
	LoadedSuccess = 'LOADED_SUCCESS',
	LoadedError = 'LOADED_ERROR',
}

export default {
	health,
	users,
	registrations
}
