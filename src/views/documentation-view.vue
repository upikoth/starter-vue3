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
			src="https://upikoth.github.io/starter-docs/"
			title="Документация"
		/>
	</ion-page>
</template>

<style lang="scss" scoped>
.documentation-view {

	&__iframe {
		display: flex;
		flex-grow: 1;
		width: 100%;
		border: none;
	}
}
</style>
