import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar, Notify } from 'quasar'
import * as Sentry from '@sentry/vue'
import langRu from 'quasar/lang/ru'

import environment, { loadEnvironmentVariables } from '@/environment'

import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

import '@/assets/styles/index.scss'

import App from './app.vue'
import router from './router'

async function initApp() {
	await loadEnvironmentVariables()

	const app = createApp(App)

	if (environment.NODE_ENV !== 'development') {
		Sentry.init({
			app,
			dsn: environment.SENTRY_DNS,
			integrations: [
				new Sentry.BrowserTracing({
					tracePropagationTargets: [window.location.host, /^\//],
					routingInstrumentation: Sentry.vueRouterInstrumentation(router)
				}),
				new Sentry.Replay()
			],
			tracesSampleRate: 1.0,
			replaysSessionSampleRate: 1.0,
			replaysOnErrorSampleRate: 1.0
		})
	}

	app.use(Quasar, {
		plugins: { Notify },
		config: { screen: { bodyClasses: true } },
		lang: langRu
	})
	app.use(createPinia())
	app.use(router)

	router.isReady().then(() => {
		app.mount('#app')
	})
}

initApp()
