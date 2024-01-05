<script setup lang="ts">
import UsersForm from '@/components/users/users-form.vue'
</script>

<template>
	<q-page class="users-edit-view">
		<div class="users-edit-view__header">
			<h1 class="text-h1">
				Мой профиль
			</h1>
		</div>
		<users-form
			edit
		/>
	</q-page>
</template>

<style lang="scss" scoped>
.users-edit-view {
	display: flex;
	flex-direction: column;
	padding: 16px 20px;

	&__header {
		display: flex;
		align-items: center;
		margin-bottom: 12px;
		gap: 12px;
	}
}
</style>
