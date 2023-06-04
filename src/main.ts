import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { IonicVue } from '@ionic/vue';

import App from './app.vue'
import router from './router'

import './assets/css/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(IonicVue)
app.use(router)

router.isReady().then(() => {
	app.mount('#app');
});
