<script setup lang="ts">
import { ref } from 'vue'
import type { QForm } from 'quasar'
import { useRouter } from 'vue-router'

import api, { getApiErrorOrMessage } from '@/api'
import { EMAIL_VALIDATION_REGEXP } from '@/constants'
import { ViewNameEnum } from '@/router'
import { useNotification } from '@/composables'
import { useSessionsStore, useUsersStore } from '@/stores'

const notification = useNotification()
const router = useRouter()
const usersStore = useUsersStore()
const sessionsStore = useSessionsStore()

const formRef = ref<InstanceType<typeof QForm>>()

const formData = ref({
	email: '',
	password: ''
})

const isPasswordVisible = ref(false)

const emailRules = [
	(val: string) => !!val || 'Введите email',
	(val: string) => EMAIL_VALIDATION_REGEXP.test(val) || 'Введите корректный email'
]

const passwordRules = [
	(val: string) => !!val || 'Введите пароль'
]

async function onSubmit() {
	const isFormDataValid = await formRef.value?.validate()

	if (!isFormDataValid) {
		return
	}

	try {
		const { user, session } = await api.sessions.create({
			email: formData.value.email,
			password: formData.value.password
		})

		usersStore.user = user
		sessionsStore.sessionId = session.id

		router.push({ name: ViewNameEnum.UsersView })
	} catch (err) {
		notification.error(getApiErrorOrMessage(err))
	}
}
</script>

<template>
	<q-page class="sign-in-view">
		<q-card class="sign-in-view__card shadow-6">
			<p class="text-h6">
				Вход в личный кабинет
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
