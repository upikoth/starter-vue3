<script setup lang="ts">
import {
	IonPage,
} from '@ionic/vue'

const baseUrl = import.meta.env.BASE_URL
const documentationSrc = baseUrl === '/' ? '/starter-docs/index.html' : 'https://upikoth.github.io/starter-docs/'
</script>

<template>
	<ion-page
		class="documentation-view"
	>
		<iframe
			class="documentation-view__iframe"
			:src="documentationSrc"
			title="Документация"
		/>
	</ion-page>
</template>

<style lang="scss" scoped>
.documentation-view {
	&__iframe {
		display: flex;
		width: 100%;
		flex-grow: 1;
		border: none;
	}
}
</style>
