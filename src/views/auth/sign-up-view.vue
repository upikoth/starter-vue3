<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'
import type { QForm } from 'quasar'

import { EMAIL_VALIDATION_REGEXP, DEFAULT_ERROR_MESSAGE_TEXT } from '@/constants'
import { ViewName } from '@/router'
import api, { checkIsApiErrorField, getApiErrorMessageByErrorCode } from '@/api'
import { ApiLoadingState } from '@/models'

const $q = useQuasar()

const formRef = ref<InstanceType<typeof QForm>>()

const formData = ref({
	name: '',
	email: '',
	password: ''
})

const isPasswordVisible = ref(false)
const registrationLoadingState = ref(ApiLoadingState.Initial)

const nameRules = [
	(val: string) => !!val || 'Введите имя'
]

const emailRules = [
	(val: string) => !!val || 'Введите email',
	(val: string) => EMAIL_VALIDATION_REGEXP.test(val) || 'Введите корректный email'
]

const passwordRules = [
	(val: string) => !!val || 'Введите пароль',
	(val: string) => val.length > 5 || 'Длинна пароля должна быть больше 5 символов',
	(val: string) => val.length < 72 || 'Длинна пароля должна быть меньше 72 символов'
]

const isUserRegistered = computed(() => registrationLoadingState.value === ApiLoadingState.LoadedSuccess)

async function onSubmit() {
	const isFormDataValid = await formRef.value?.validate()

	if (!isFormDataValid) {
		return
	}

	try {
		registrationLoadingState.value = ApiLoadingState.Loading
		await api.registrations.create(formData.value)

		registrationLoadingState.value = ApiLoadingState.LoadedSuccess
	} catch (error) {
		registrationLoadingState.value = ApiLoadingState.LoadedError
		let msg = DEFAULT_ERROR_MESSAGE_TEXT

		if (checkIsApiErrorField(error)) {
			msg = getApiErrorMessageByErrorCode(error.code)
		}

		$q.notify({
			type: 'negative',
			message: msg,
			position: 'top'
		})
	}
}
</script>

<template>
	<q-page class="sign-in-view">
		<q-card class="sign-in-view__card shadow-6">
			<p class="text-h6">
				Регистрация
			</p>
			<q-form
				v-if="!isUserRegistered"
				ref="formRef"
				@submit="onSubmit"
			>
				<q-input
					v-model="formData.name"
					label="Имя"
					:rules="nameRules"
					lazy-rules
				/>
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
					:loading="registrationLoadingState === ApiLoadingState.Loading"
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
				class="sign-in-view__registration-button"
				flat
				no-caps
				color="primary"
				:to="{ name: ViewName.AuthSignInView }"
			>
				Войти в личный кабинет
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
