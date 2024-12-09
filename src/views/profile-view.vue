<script setup lang="ts">
import { ref } from 'vue'

import useApi from '@/api'

import { useUserStore } from '@/stores'

import { useNotification } from '@/composables'

import { LoadingStateEnum } from '@/models'

const api = useApi()
const notification = useNotification()
const userStore = useUserStore()

const passwordRecoveryLoadingState = ref(LoadingStateEnum.LoadingNotStarted)

async function recoveryPassword() {
	try {
		passwordRecoveryLoadingState.value = LoadingStateEnum.Loading

		await api.passwordRecoveryRequest.v1CreatePasswordRecoveryRequest({
			email: userStore.user.email
		})

		notification.success('Письмо для смены пароля отправлено на вашу почту')
		passwordRecoveryLoadingState.value = LoadingStateEnum.LoadedSuccess
	} catch (err) {
		passwordRecoveryLoadingState.value = LoadingStateEnum.LoadedError
		notification.error(api.getApiErrorOrMessage(err, 'Не удалось изменить пароль. Попробуйте позже'))
	}
}
</script>

<template>
	<q-page
		class="profile-view"
	>
		<div class="profile-view__header">
			<h1>
				Профиль
			</h1>
		</div>
		<q-btn
			class="profile-view__reset-password-btn"
			color="primary"
			:loading="passwordRecoveryLoadingState === LoadingStateEnum.Loading"
			@click="recoveryPassword"
		>
			Изменить пароль
		</q-btn>
	</q-page>
</template>

<style lang="scss" scoped>
.profile-view {
	display: flex;
	flex-direction: column;
	padding: 16px 20px;

	&__header {
		display: flex;
		align-items: center;
		margin-bottom: 16px;
	}

	&__reset-password-btn {
		align-self: flex-start;
	}
}
</style>
