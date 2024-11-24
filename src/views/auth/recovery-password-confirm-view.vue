<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { QForm, QInput } from 'quasar'

import useApi, { ApiErrorCodeEnum } from '@/api'

import { ViewNameEnum, getDefaultView } from '@/router'

import { useSessionStore } from '@/stores'

import { useNotification } from '@/composables'

import { LoadingStateEnum } from '@/models'

const api = useApi()
const router = useRouter()
const route = useRoute()
const notification = useNotification()
const sessionStore = useSessionStore()

const confirmationPasswordRecoveryRequestState = ref(LoadingStateEnum.LoadingNotStarted)

const formRef = ref<InstanceType<typeof QForm>>()

const formData = ref({
	password: '',
	passwordRepeat: ''
})

const isPasswordVisible = ref(false)
const isPasswordRepeatVisible = ref(false)

const passwordField = ref<InstanceType<typeof QInput>>()
const passwordRepeatField = ref<InstanceType<typeof QInput>>()

const userFormRules = {
	password: [
		(val: string) => !!val || 'Введите пароль',
		(val: string) => val === formData.value.passwordRepeat || 'Пароли должны совпадать'
	],
	passwordRepeat: [
		(val: string) => !!val || 'Введите пароль',
		(val: string) => val === formData.value.password || 'Пароли должны совпадать'
	]
}

const confirmationToken = computed(() => {
	const { token } = route.query

	return typeof token === 'string' ? token : ''
})

async function onSubmit() {
	const isFormDataValid = await formRef.value?.validate()

	if (!isFormDataValid) {
		return
	}

	try {
		confirmationPasswordRecoveryRequestState.value = LoadingStateEnum.Loading
		const { data } = await api.passwordRecoveryRequest.v1ConfirmPasswordRecoveryRequest({
			confirmationToken: confirmationToken.value,
			newPassword: formData.value.password
		})
		const { session } = data.data
		sessionStore.setSession(session)

		notification.success('Восстановление пароля успешно завершено')

		await router.push({ name: getDefaultView() })
		confirmationPasswordRecoveryRequestState.value = LoadingStateEnum.LoadedSuccess
	} catch (error) {
		if (api.checkIsApiErrorField(error)
			&& error.code === ApiErrorCodeEnum.ErrCodePasswordRecoveryRequestCreatingSession
		) {
			router.push({ name: ViewNameEnum.AuthSignInView })
		} else {
			confirmationPasswordRecoveryRequestState.value = LoadingStateEnum.LoadedError
		}
	}
}
</script>

<template>
	<q-page class="recovery-password-confirm-view">
		<q-card class="recovery-password-confirm-view__card shadow-6">
			<p class="text-h6">
				Восстановление пароля
			</p>
			<q-form
				v-if="
					confirmationPasswordRecoveryRequestState === LoadingStateEnum.LoadingNotStarted
						|| confirmationPasswordRecoveryRequestState === LoadingStateEnum.Loading
						|| confirmationPasswordRecoveryRequestState === LoadingStateEnum.LoadedSuccess
				"
				ref="formRef"
				@submit="onSubmit"
			>
				<q-input
					ref="passwordField"
					v-model.trim="formData.password"
					label="Пароль"
					:rules="userFormRules.password"
					:type="isPasswordVisible ? 'text' : 'password'"
					lazy-rules
					data-sentry-mask
					@update:model-value="passwordRepeatField?.resetValidation()"
				>
					<template #append>
						<q-icon
							:name="isPasswordVisible ? 'visibility' : 'visibility_off'"
							class="cursor-pointer"
							@click="isPasswordVisible = !isPasswordVisible"
						/>
					</template>
				</q-input>
				<q-input
					ref="passwordRepeatField"
					v-model.trim="formData.passwordRepeat"
					label="Повторите пароль"
					:rules="userFormRules.passwordRepeat"
					:type="isPasswordRepeatVisible ? 'text' : 'password'"
					lazy-rules
					data-sentry-mask
					@update:model-value="passwordField?.resetValidation()"
				>
					<template #append>
						<q-icon
							:name="isPasswordRepeatVisible ? 'visibility' : 'visibility_off'"
							class="cursor-pointer"
							@click="isPasswordRepeatVisible = !isPasswordRepeatVisible"
						/>
					</template>
				</q-input>
				<q-btn
					class="recovery-password-confirm-view__submit-button"
					type="submit"
					color="primary"
					:loading="confirmationPasswordRecoveryRequestState === LoadingStateEnum.Loading"
				>
					Восстановить пароль
				</q-btn>
			</q-form>
			<p
				v-if="confirmationPasswordRecoveryRequestState === LoadingStateEnum.LoadedError"
				class="text-body1"
			>
				<q-icon
					name="error"
					size="sm"
					color="negative"
				/>
				Не удалось завершить восстановление пароля. Попробуйте позже или обратитесь в поддержку
			</p>
			<q-btn
				class="recovery-password-confirm-view__back-to-login-button"
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
.recovery-password-confirm-view {
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
