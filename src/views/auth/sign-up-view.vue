<script setup lang="ts">
import { ref, computed } from 'vue'
import type { QForm, QInput } from 'quasar'

import { EMAIL_VALIDATION_REGEXP } from '@/constants'

import useApi, { ApiErrorCodeEnum } from '@/api'

import { ViewNameEnum } from '@/router'

import { useNotification } from '@/composables'

import { LoadingStateEnum } from '@/models'

const api = useApi()
const notification = useNotification()

const formRef = ref<InstanceType<typeof QForm>>()

const formData = ref({
	email: ''
})

const registrationLoadingState = ref(LoadingStateEnum.LoadingNotStarted)
const isRecoveryPasswordButtonVisible = ref(false)

const userFormRules = {
	email: [
		(val: string) => !!val || 'Введите email',
		(val: string) => EMAIL_VALIDATION_REGEXP.test(val) || 'Введите корректный email'
	]
}

const isUserRegistered = computed(() => registrationLoadingState.value === LoadingStateEnum.LoadedSuccess)

async function onSubmit() {
	const isFormDataValid = await formRef.value?.validate()

	if (!isFormDataValid) {
		return
	}

	try {
		registrationLoadingState.value = LoadingStateEnum.Loading

		await api.registrations.v1CreateRegistration({
			email: formData.value.email
		})

		registrationLoadingState.value = LoadingStateEnum.LoadedSuccess
	} catch (err) {
		registrationLoadingState.value = LoadingStateEnum.LoadedError
		notification.error(api.getApiErrorOrMessage(err, 'Не удалось зарегистрироваться. Попробуйте позже'))

		if (
			api.checkIsApiErrorField(err)
			&& err.code === ApiErrorCodeEnum.ErrCodeRegistrationUserWithThisEmailAlreadyExist
		) {
			isRecoveryPasswordButtonVisible.value = true
		}
	}
}
</script>

<template>
	<q-page class="sign-up-view">
		<q-card class="sign-up-view__card shadow-6">
			<p class="text-h6">
				Регистрация
			</p>
			<q-form
				v-if="!isUserRegistered"
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
					class="sign-up-view__submit-button"
					type="submit"
					color="primary"
					:loading="registrationLoadingState === LoadingStateEnum.Loading"
				>
					Зарегистрироваться
				</q-btn>
			</q-form>
			<p
				v-else
				class="text-body1"
			>
				Отправили письмо на почту.
				<br>
				Перейдите по ссылка в письме, чтобы завершить регистрацию
			</p>
			<q-btn
				class="sign-up-view__back-to-login-button"
				flat
				no-caps
				color="primary"
				:to="{ name: ViewNameEnum.AuthSignInView }"
			>
				Войти в личный кабинет
			</q-btn>
			<q-btn
				v-if="isRecoveryPasswordButtonVisible"
				class="sign-up-view__recovery-password-button"
				flat
				no-caps
				color="primary"
				:to="{ name: ViewNameEnum.AuthRecoveryPasswordView }"
			>
				Восстановить пароль
			</q-btn>
		</q-card>
	</q-page>
</template>

<style lang="scss" scoped>
.sign-up-view {
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

	&__recovery-password-button {
		width: 100%;
		margin-top: 8px;
	}
}
</style>
