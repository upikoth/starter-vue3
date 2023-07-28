import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar, Notify } from 'quasar'

import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

import App from './app.vue'
import router from './router'

const app = createApp(App)

app.use(Quasar, { plugins: { Notify } })
app.use(createPinia())
app.use(router)

router.isReady().then(() => {
	app.mount('#app')
})
