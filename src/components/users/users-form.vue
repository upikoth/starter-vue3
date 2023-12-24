<script setup lang="ts">
import { ref, computed } from 'vue'
import type { PropType } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { QForm } from 'quasar'

import api, { LoadingStateEnum } from '@/api'
import { ViewName } from '@/router'
import { useNotification } from '@/composables'

import UiAsyncDataWrapper from '@/components/ui/ui-async-data-wrapper.vue'

import UsersFormSkeleton from './users-form-skeleton.vue'

const props = defineProps({
	edit: {
		type: Boolean as PropType<boolean>,
		default: false
	}
})

const route = useRoute()
const router = useRouter()
const notification = useNotification()

const userForm = ref({ name: '' })
const formRef = ref<InstanceType<typeof QForm>>()

const userLoadingState = ref(props.edit ? LoadingStateEnum.LoadingNotStarted : LoadingStateEnum.LoadedSuccess)

const isUserCreateLoading = ref(false)
const isUserUpdateLoading = ref(false)

const userFormRules = {
	name: [
		(val: string) => !!val || 'Введите имя'
	]
}

const userId = computed(() => {
	return Number.parseInt(typeof route.params.id === 'string' ? route.params.id : '')
})

function onCreated() {
	if (props.edit) {
		getUser()
	}
}

async function getUser(): Promise<void> {
	try {
		userLoadingState.value = LoadingStateEnum.Loading

		const { user } = await api.users.get({ id: userId.value })

		const { name } = user
		userForm.value = { name }

		userLoadingState.value = LoadingStateEnum.LoadedSuccess
	} catch {
		userLoadingState.value = LoadingStateEnum.LoadedError
		notification.error('Не удалось получить информацию о пользователе')
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

		const { name } = userForm.value
		await api.users.update({
			id: userId.value,
			name
		})

		notification.success('Информация о пользователе обновлена')

		redirectToUsersPage()
	} catch {
		notification.error('Не удалось обновить информацию о пользователе')
	} finally {
		isUserUpdateLoading.value = false
	}
}

async function createUser() {
	try {
		isUserCreateLoading.value = true

		const { name } = userForm.value
		await api.users.create({ name })

		notification.success('Пользователь создан')

		redirectToUsersPage()
	} catch {
		notification.error('Не удалось создать пользователя')
	} finally {
		isUserCreateLoading.value = false
	}
}

function redirectToUsersPage() {
	router.push({ name: ViewName.UsersView })
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
				v-model="userForm.name"
				label="Имя"
				:rules="userFormRules.name"
				clearable
				lazy-rules
			/>
			<q-btn
				class="users-form__submit-button"
				type="submit"
				color="primary"
				:label="props.edit ? 'Редактировать' : 'Создать'"
				:icon="props.edit ? 'edit' : 'add'"
				:loading="isUserUpdateLoading || isUserCreateLoading"
			/>
		</q-form>
	</ui-async-data-wrapper>
</template>

<style lang="scss" scoped>
.users-form {
	&__submit-button {
		margin-top: 12px;
	}
}
</style>
