import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

export default defineConfig({
	plugins: [
		vue({ template: { transformAssetUrls } }),
		quasar({ sassVariables: 'src/assets/quasar-variables.sass' })
	],
	resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
	server: {
		port: 4001,
		proxy: {
			'/api': {
				target: 'http://localhost:8000',
				changeOrigin: true
			}
		}
	}
})
