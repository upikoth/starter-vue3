<script setup lang="ts">
import { ref, computed } from 'vue'
import type { QForm, QInput } from 'quasar'

import { EMAIL_VALIDATION_REGEXP } from '@/constants'

// import api, { getApiErrorOrMessage } from '@/api'

import { ViewNameEnum } from '@/router'

import { useNotification } from '@/composables'

import { LoadingStateEnum } from '@/models'

const notification = useNotification()

const formRef = ref<InstanceType<typeof QForm>>()

const formData = ref({
	email: '',
	password: '',
	passwordRepeat: ''
})

const registrationLoadingState = ref(LoadingStateEnum.LoadingNotStarted)

const isPasswordVisible = ref(false)
const isPasswordRepeatVisible = ref(false)

const passwordField = ref<InstanceType<typeof QInput>>()
const passwordRepeatField = ref<InstanceType<typeof QInput>>()

const userFormRules = {
	email: [
		(val: string) => !!val || 'Введите email',
		(val: string) => EMAIL_VALIDATION_REGEXP.test(val) || 'Введите корректный email'
	],
	password: [
		(val: string) => !!val || 'Введите пароль',
		(val: string) => val === formData.value.passwordRepeat || 'Пароли должны совпадать'
	],
	passwordRepeat: [
		(val: string) => !!val || 'Введите пароль',
		(val: string) => val === formData.value.password || 'Пароли должны совпадать'
	]
}

const isUserRegistered = computed(() => registrationLoadingState.value === LoadingStateEnum.LoadedSuccess)

async function onSubmit() {
	// const isFormDataValid = await formRef.value?.validate()

	// if (!isFormDataValid) {
	// 	return
	// }

	// try {
	// 	registrationLoadingState.value = LoadingStateEnum.Loading

	// 	await api.registrations.create({
	// 		email: formData.value.email,
	// 		password: formData.value.password
	// 	})

	// 	registrationLoadingState.value = LoadingStateEnum.LoadedSuccess
	// } catch (err) {
	// 	registrationLoadingState.value = LoadingStateEnum.LoadedError
	// 	notification.error(getApiErrorOrMessage(err, 'Не удалось удалить сессию'))
	// }
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
				<q-input
					ref="passwordField"
					v-model="formData.password"
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
					v-model="formData.passwordRepeat"
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
				Регистрация прошла успешно.
				<br>
				Перейдите по ссылка в письме, чтобы активировать учетную запись
			</p>
			<q-btn
				class="sign-up-view__registration-button"
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

	&__submit-button {
		width: 100%;
		margin-top: 16px;
	}

	&__registration-button {
		width: 100%;
		margin-top: 16px;
	}
}
</style>
