<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { ViewNameEnum } from '@/router'
import api from '@/api'
import { ApiLoadingStateEnum } from '@/models'
import { useNotification } from '@/composables'

const router = useRouter()
const route = useRoute()
const notification = useNotification()

const confirmationRegistrationState = ref(ApiLoadingStateEnum.Initial)

const registrationConfirmationToken = computed(() => {
	const { token } = route.query

	return typeof token === 'string' ? token : ''
})

function onCreated() {
	confirmRegistration()
}

async function confirmRegistration() {
	if (!registrationConfirmationToken.value) {
		return
	}

	try {
		confirmationRegistrationState.value = ApiLoadingStateEnum.Loading
		await api.registrations.confirm({ token: registrationConfirmationToken.value })

		confirmationRegistrationState.value = ApiLoadingStateEnum.LoadedSuccess

		notification.success('Учетная запись активирована')

		router.push({ name: ViewNameEnum.AuthSignInView })
	} catch (error) {
		confirmationRegistrationState.value = ApiLoadingStateEnum.LoadedError
	}
}

onCreated()
</script>

<template>
	<q-page class="sign-in-view">
		<q-card class="sign-in-view__card shadow-6">
			<p class="text-h6">
				Активация учетной записи
			</p>
			<p
				v-if="confirmationRegistrationState === ApiLoadingStateEnum.Initial"
				class="text-body1"
			>
				<q-icon
					name="warning"
					size="sm"
					color="warning"
				/>
				Некорректная ссылка активации. Попробуйте позже или обратитесь к администратору
			</p>
			<p
				v-if="confirmationRegistrationState === ApiLoadingStateEnum.Loading"
				class="text-body1"
			>
				Происходит активация, подождите...
			</p>
			<p
				v-if="confirmationRegistrationState === ApiLoadingStateEnum.LoadedSuccess"
				class="text-body1"
			>
				<q-icon
					name="done"
					size="sm"
					color="positive"
				/>
				Учетная запись активирована
			</p>
			<p
				v-if="confirmationRegistrationState === ApiLoadingStateEnum.LoadedError"
				class="text-body1"
			>
				<q-icon
					name="error"
					size="sm"
					color="negative"
				/>
				Не удалось активировать учетную запись. Попробуйте позже или обратитесь к администратору
			</p>
			<q-btn
				class="sign-in-view__registration-button"
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

	&__registration-button {
		width: 100%;
		margin-top: 16px;
	}
}
</style>
