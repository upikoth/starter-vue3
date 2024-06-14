<script setup lang="ts">
import { ref, computed } from 'vue'
import type { QForm, QInput } from 'quasar'

import { EMAIL_VALIDATION_REGEXP } from '@/constants'

import useApi from '@/api'

import { ViewNameEnum } from '@/router'

import { useNotification } from '@/composables'

import { LoadingStateEnum } from '@/models'

const api = useApi()
const notification = useNotification()

const formRef = ref<InstanceType<typeof QForm>>()

const formData = ref({
	email: ''
})

const passwordRecoveryLoadingState = ref(LoadingStateEnum.LoadingNotStarted)

const userFormRules = {
	email: [
		(val: string) => !!val || 'Введите email',
		(val: string) => EMAIL_VALIDATION_REGEXP.test(val) || 'Введите корректный email'
	]
}

const isRequestForRecoverySended = computed(() => passwordRecoveryLoadingState.value === LoadingStateEnum.LoadedSuccess)

async function onSubmit() {
	const isFormDataValid = await formRef.value?.validate()

	if (!isFormDataValid) {
		return
	}

	try {
		passwordRecoveryLoadingState.value = LoadingStateEnum.Loading

		await api.passwordRecoveryRequest.v1CreatePasswordRecoveryRequest({
			email: formData.value.email
		})

		passwordRecoveryLoadingState.value = LoadingStateEnum.LoadedSuccess
	} catch (err) {
		passwordRecoveryLoadingState.value = LoadingStateEnum.LoadedError
		notification.error(api.getApiErrorOrMessage(err, 'Не удалось восстановить пароль. Попробуйте позже'))
	}
}
</script>

<template>
	<q-page class="recovery-password-view">
		<q-card class="recovery-password-view__card shadow-6">
			<p class="text-h6">
				Восстановление пароля
			</p>
			<q-form
				v-if="!isRequestForRecoverySended"
				ref="formRef"
				@submit="onSubmit"
			>
				<q-input
					v-model="formData.email"
					label="Email"
					:rules="userFormRules.email"
					type="email"
					lazy-rules
				/>
				<q-btn
					class="recovery-password-view__submit-button"
					type="submit"
					color="primary"
					:loading="passwordRecoveryLoadingState === LoadingStateEnum.Loading"
				>
					Восстановить пароль
				</q-btn>
			</q-form>
			<p
				v-else
				class="text-body1"
			>
				Отправили письмо на почту.
				<br>
				Перейдите по ссылка в письме, чтобы восстановить пароль
			</p>
			<q-btn
				class="recovery-password-view__back-to-login-button"
				flat
				no-caps
				color="primary"
				:to="{ name: ViewNameEnum.AuthSignInView }"
			>
				Войти в личный кабинет
			</q-btn>
		</q-card>
	</q-page>
</template>

<style lang="scss" scoped>
.recovery-password-view {
	display: flex;
	align-items: center;
	justify-content: center;

	&__card {
		width: 400px;
		padding: 24px;

		body.screen--xs & {
			display: flex;
			width: 100%;
			height: 100vh;
			flex-direction: column;
			justify-content: center;
		}
	}

	&__submit-button,
	&__back-to-login-button {
		width: 100%;
		margin-top: 16px;
	}
}
</style>
