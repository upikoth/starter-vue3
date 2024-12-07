import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

export default defineConfig({
	plugins: [
		vue({ template: { transformAssetUrls } }),
		quasar(
			{
				sassVariables: fileURLToPath(
					new URL('./src/assets/quasar-variables.sass', import.meta.url)
				)
			}
		)
	],
	resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } }
})
