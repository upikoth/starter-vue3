<script setup lang="ts">
import { ref } from 'vue'
import type { QForm } from 'quasar'
import { useRouter } from 'vue-router'

import { EMAIL_VALIDATION_REGEXP } from '@/constants'

import type { V1AuthorizeUsingOauthRequestBodyOauthSourceEnum } from '@/generated/app'

import useApi, { ApiErrorCodeEnum } from '@/api'

import { ViewNameEnum, getDefaultView } from '@/router'

import { useSessionStore } from '@/stores'

import { useNotification } from '@/composables'

const api = useApi()
const notification = useNotification()
const router = useRouter()
const sessionStore = useSessionStore()

const formRef = ref<InstanceType<typeof QForm>>()

const formData = ref({
	email: '',
	password: ''
})

const isOauthVkLoading = ref(false)
const isOauthMailLoading = ref(false)

const isPasswordVisible = ref(false)
const isRecoveryPasswordButtonVisible = ref(false)

const emailRules = [
	(val: string) => !!val || 'Введите email',
	(val: string) => EMAIL_VALIDATION_REGEXP.test(val) || 'Введите корректный email'
]

const passwordRules = [(val: string) => !!val || 'Введите пароль']

async function onSubmit() {
	const isFormDataValid = await formRef.value?.validate()

	if (!isFormDataValid) {
		return
	}

	try {
		const { data } = await api.sessions.v1CreateSession({
			email: formData.value.email,
			password: formData.value.password
		})
		const { session } = data.data
		sessionStore.setSession(session)

		router.push({ name: getDefaultView() })
	} catch (err) {
		notification.error(api.getApiErrorOrMessage(err))

		if (
			api.checkIsApiErrorField(err)
			&& err.code === ApiErrorCodeEnum.ErrCodeCreateSessionWrongEmailOrPassword
		) {
			isRecoveryPasswordButtonVisible.value = true
		}
	}
}

async function authorizeUsingVkOauth() {
	try {
		isOauthVkLoading.value = true
		const { data } = await api.oauth.v1AuthorizeUsingOauth({
			oauthSource: 'vk'
		})

		const { url } = data.data
		window.location.href = url
	} catch (err) {
		notification.error(api.getApiErrorOrMessage(err))
	} finally {
		isOauthVkLoading.value = false
	}
}

async function authorizeUsingMailOauth() {
	try {
		isOauthMailLoading.value = true
		const { data } = await api.oauth.v1AuthorizeUsingOauth({
			oauthSource: 'mail'
		})

		const { url } = data.data
		window.location.href = url
	} catch (err) {
		notification.error(api.getApiErrorOrMessage(err))
	} finally {
		isOauthMailLoading.value = false
	}
}

</script>

<template>
	<q-page class="sign-in-view">
		<q-card class="sign-in-view__card shadow-6">
			<p class="sign-in-view__card-title text-h6">
				Вход в личный кабинет
			</p>
			<div class="sign-in-view__card-oauth">
				<q-btn
					round
					icon="img:/icons/oauth/vk.svg"
					style="background: #0077ff"
					:loading="isOauthVkLoading"
					@click="authorizeUsingVkOauth()"
				/>
				<q-btn
					round
					icon="img:/icons/oauth/mail.svg"
					:loading="isOauthMailLoading"
					@click="authorizeUsingMailOauth()"
				/>
			</div>
			<p class="sign-in-view__card-oauth-after">
				или с помощью
			</p>
			<q-form
				ref="formRef"
				@submit="onSubmit"
			>
				<q-input
					v-model="formData.email"
					label="Email"
					:rules="emailRules"
					type="email"
					lazy-rules
				/>
				<q-input
					v-model="formData.password"
					label="Пароль"
					:rules="passwordRules"
					:type="isPasswordVisible ? 'text' : 'password'"
					lazy-rules
					data-sentry-mask
				>
					<template #append>
						<q-btn
							round
							dense
							flat
							:icon="isPasswordVisible ? 'visibility_off' : 'visibility'"
							@click="isPasswordVisible = !isPasswordVisible"
						/>
					</template>
				</q-input>
				<q-btn
					class="sign-in-view__submit-button"
					type="submit"
					color="primary"
				>
					Войти
				</q-btn>
			</q-form>
			<q-btn
				class="sign-in-view__registration-button"
				flat
				no-caps
				color="primary"
				:to="{ name: ViewNameEnum.AuthSignUpView }"
			>
				Зарегистрироваться
			</q-btn>
			<q-btn
				v-if="isRecoveryPasswordButtonVisible"
				class="sign-in-view__recovery-password-button"
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
.sign-in-view {
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

	&__card-title {
		margin-bottom: 8px;
	}

	&__card-oauth {
		display: flex;
		justify-content: center;
		margin-bottom: 4px;
		gap: 16px;
	}

	&__card-oauth-after {
		display: flex;
		justify-content: center;
		margin-bottom: 4px;
	}

	&__submit-button {
		width: 100%;
		margin-top: 16px;
	}

	&__registration-button {
		width: 100%;
		margin-top: 16px;
	}

	&__recovery-password-button {
		width: 100%;
		margin-top: 8px;
	}
}
</style>
