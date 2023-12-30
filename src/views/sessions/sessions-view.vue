<script setup lang="ts">
import SessionsList from '@/components/sessions/sessions-list.vue'
</script>

<template>
	<q-page class="sessions-view">
		<div class="sessions-view__header">
			<h1>
				Сессии
			</h1>
		</div>
		<sessions-list class="sessions-view__list" />
	</q-page>
</template>

<style lang="scss" scoped>
.sessions-view {
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
