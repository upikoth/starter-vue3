<script setup lang="ts">
import { computed } from 'vue'
import type { PropType } from 'vue'

import { LoadingStateEnum } from '@/models'

const props = defineProps({
	state: {
		type: String as PropType<LoadingStateEnum>,
		required: true
	}
})

const isLoading = computed(() => props.state === LoadingStateEnum.Loading)

const isSuccessLoaded = computed(() => props.state === LoadingStateEnum.LoadedSuccess)

const isErorrLoaded = computed(() => props.state === LoadingStateEnum.LoadedError)
</script>

<template>
	<div class="ui-async-data-wrapper">
		<slot
			v-if="isLoading"
			name="loading"
		/>
		<slot v-if="isSuccessLoaded" />
		<slot
			v-if="isErorrLoaded"
			name="error"
		/>
	</div>
</template>
