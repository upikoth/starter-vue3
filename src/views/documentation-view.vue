<script setup lang="ts">
import {
	IonPage,
} from '@ionic/vue'
</script>

<template>
	<ion-page
		class="documentation-view"
	>
		<iframe
			class="documentation-view__iframe"
			src="/starter-docs/index.html"
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
