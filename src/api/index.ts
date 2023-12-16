import health from './routes/health'
import registrations from './routes/registrations'
import users from './routes/users'

export * from './routes/health'
export * from './routes/registrations'
export * from './routes/users'

export * from './errors'

export default {
	health,
	users,
	registrations
}
