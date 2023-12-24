<template>
	<div
		class="users-form-skeleton"
	>
		<q-skeleton
			height="56px"
		/>
		<div class="users-form-skeleton__input-spacer" />
		<q-skeleton
			class="users-form-skeleton__submit-button"
			height="36px"
			width="200px"
		/>
	</div>
</template>

<style lang="scss" scoped>
.users-form-skeleton {
	&__input-spacer {
		height: 20px;
	}

	&__submit-button {
		margin-top: 12px;
	}
}
</style>
