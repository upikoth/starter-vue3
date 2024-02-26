import health from './routes/health'
import registrations from './routes/registrations'
import users from './routes/users'
import sessions from './routes/sessions'
import files from './routes/files'

export * from './errors'

export default {
	health,
	users,
	registrations,
	sessions,
	files
}
