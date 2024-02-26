<script setup lang="ts">
import FilesList from '@/components/files/files-list.vue'
</script>

<template>
	<q-page class="files-view">
		<div class="files-view__header">
			<h1>
				Файлы
			</h1>
		</div>
		<files-list class="files-view__list" />
	</q-page>
</template>

<style lang="scss" scoped>
.files-view {
	display: flex;
	flex-direction: column;
	padding: 16px 20px;

	&__header {
		display: flex;
		align-items: center;
		margin-bottom: 16px;
	}

	&__list {
		height: 100px;
		flex-grow: 1;
	}
}
</style>
