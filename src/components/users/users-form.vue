<script setup lang="ts">
import { ref, computed } from 'vue'
import type { PropType } from 'vue'
import { useRoute } from 'vue-router'
import type { QForm, QInput } from 'quasar'
import { useQuasar } from 'quasar'

import api, { LoadingStateEnum, getApiErrorOrMessage } from '@/api'
import { useNotification } from '@/composables'
import { UserStatusEnum } from '@/models'
import { EMAIL_VALIDATION_REGEXP } from '@/constants'

import UiAsyncDataWrapper from '@/components/ui/ui-async-data-wrapper.vue'

import UsersFormSkeleton from './users-form-skeleton.vue'

const props = defineProps({
	edit: {
		type: Boolean as PropType<boolean>,
		default: false
	}
})

const emit = defineEmits({ success: null })

const route = useRoute()
const notification = useNotification()
const $q = useQuasar()

const userForm = ref({
	email: '',
	password: '',
	passwordRepeat: ''
})
const userStatus = ref(UserStatusEnum.Active)
const formRef = ref<InstanceType<typeof QForm>>()

const userLoadingState = ref(props.edit ? LoadingStateEnum.LoadingNotStarted : LoadingStateEnum.LoadedSuccess)

const isUserCreateLoading = ref(false)
const isUserUpdateLoading = ref(false)
const isUserBlockLoading = ref(false)
const isUserUnblockLoading = ref(false)

const passwordField = ref<InstanceType<typeof QInput>>()
const passwordRepeatField = ref<InstanceType<typeof QInput>>()

const isPasswordVisible = ref(false)
const isPasswordRepeatVisible = ref(false)

const userFormRules = {
	email: [
		(val: string) => !!val || 'Введите email',
		(val: string) => EMAIL_VALIDATION_REGEXP.test(val) || 'Введите корректный email'
	],
	password: [
		(val: string) => !!val || 'Введите пароль',
		(val: string) => val === userForm.value.passwordRepeat || 'Пароли должны совпадать'
	],
	passwordRepeat: [
		(val: string) => !!val || 'Введите пароль',
		(val: string) => val === userForm.value.password || 'Пароли должны совпадать'
	]
}

const userId = computed(() => {
	return Number.parseInt(typeof route.params.id === 'string' ? route.params.id : '')
})

const isUserBlocked = computed(() => userStatus.value === UserStatusEnum.Blocked)

function onCreated() {
	if (props.edit) {
		getUser()
	}
}

async function getUser(): Promise<void> {
	try {
		userLoadingState.value = LoadingStateEnum.Loading

		const { user } = await api.users.get({ id: userId.value })

		const { email, status } = user
		userForm.value.email = email
		userStatus.value = status

		userLoadingState.value = LoadingStateEnum.LoadedSuccess
	} catch (err) {
		userLoadingState.value = LoadingStateEnum.LoadedError
		notification.error(getApiErrorOrMessage(err, 'Не удалось получить информацию о пользователе'))
	}
}

async function onSubmit() {
	const isFormDataValid = await formRef.value?.validate()

	if (!isFormDataValid) {
		return
	}

	if (props.edit) {
		updateUser()
	} else {
		createUser()
	}
}

async function updateUser() {
	try {
		isUserUpdateLoading.value = true

		const { email } = userForm.value
		await api.users.update({
			id: userId.value,
			email
		})

		notification.success('Информация о пользователе обновлена')

		emit('success')
	} catch (err) {
		notification.error(getApiErrorOrMessage(err, 'Не удалось обновить информацию о пользователе'))
	} finally {
		isUserUpdateLoading.value = false
	}
}

async function createUser() {
	try {
		isUserCreateLoading.value = true

		const { email, password } = userForm.value
		await api.users.create({
			email,
			password
		})

		notification.success('Пользователь создан')

		emit('success')
	} catch (err) {
		notification.error(getApiErrorOrMessage(err, 'Не удалось создать пользователя'))
	} finally {
		isUserCreateLoading.value = false
	}
}

async function blockUser() {
	try {
		isUserBlockLoading.value = true

		await api.users.update({
			id: userId.value,
			status: UserStatusEnum.Blocked
		})

		notification.success('Пользователь заблокирован')

		emit('success')
	} catch (err) {
		notification.error(getApiErrorOrMessage(err, 'Не удалось заблокировать пользователя'))
	} finally {
		isUserBlockLoading.value = false
	}
}

async function unblockUser() {
	try {
		isUserUnblockLoading.value = true

		await api.users.update({
			id: userId.value,
			status: UserStatusEnum.Active
		})

		notification.success('Пользователь разблокирован')

		emit('success')
	} catch (err) {
		notification.error(getApiErrorOrMessage(err, 'Не удалось разблокировать пользователя'))
	} finally {
		isUserUnblockLoading.value = false
	}
}

onCreated()
</script>

<template>
	<ui-async-data-wrapper :state="userLoadingState">
		<template #loading>
			<users-form-skeleton />
		</template>

		<template #error>
			<p class="text-subtitle1">
				Не удалось получить информацию о пользователе
			</p>
		</template>

		<q-form
			ref="formRef"
			class="users-form"
			@submit="onSubmit"
		>
			<q-input
				v-model="userForm.email"
				label="Email"
				:rules="userFormRules.email"
				type="email"
				lazy-rules
			/>
			<q-input
				ref="passwordField"
				v-model="userForm.password"
				label="Пароль"
				:rules="userFormRules.password"
				:type="isPasswordVisible ? 'text' : 'password'"
				lazy-rules
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
				v-model="userForm.passwordRepeat"
				label="Повторите пароль"
				:rules="userFormRules.passwordRepeat"
				:type="isPasswordRepeatVisible ? 'text' : 'password'"
				lazy-rules
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
			<div class="users-form__action-buttons">
				<q-btn
					v-if="props.edit"
					:color="isUserBlocked ? 'positive' : 'negative'"
					:label="isUserBlocked ? 'Разблокировать' : 'Заблокировать'"
					:icon="$q.screen.xs ? undefined : isUserBlocked ? 'add' : 'delete'"
					:loading="isUserBlockLoading || isUserUnblockLoading"
					outline
					@click="isUserBlocked ? unblockUser() : blockUser()"
				/>
				<q-space />
				<q-btn
					type="submit"
					color="primary"
					:label="props.edit ? 'Сохранить' : 'Создать'"
					:icon="$q.screen.xs ? undefined : props.edit ? 'edit' : 'add'"
					:loading="isUserUpdateLoading || isUserCreateLoading"
				/>
			</div>
		</q-form>
	</ui-async-data-wrapper>
</template>

<style lang="scss" scoped>
.users-form {
	&__action-buttons {
		display: flex;
		margin-top: 12px;
	}
}
</style>
