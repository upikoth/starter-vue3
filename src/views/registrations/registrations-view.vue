<script setup lang="ts">
import RegistrationsList from '@/components/registrations/registrations-list.vue'
</script>

<template>
	<q-page class="registrations-view">
		<div class="registrations-view__header">
			<h1>
				Регистрации
			</h1>
		</div>
		<registrations-list class="registrations-view__list" />
	</q-page>
</template>

<style lang="scss" scoped>
.registrations-view {
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
