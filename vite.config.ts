import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

const env = loadEnv('', process.cwd())

export default defineConfig({
	plugins: [
		vue({
			template: {
				transformAssetUrls
			}
		}),
		quasar({
			sassVariables: 'src/assets/quasar-variables.sass'
		})
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	},
	server: {
		port: 8000,
		proxy: {
			'/api': {
				target: env.VITE_API_URL,
				changeOrigin: true
			}
		}
	}
})
