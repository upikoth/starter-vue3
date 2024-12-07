<script setup lang="ts">
import { useDark } from '@vueuse/core'
import { useQuasar } from 'quasar'

const $q = useQuasar()

useDark({
	onChanged(dark: boolean) {
		$q.dark.set(dark)
	}
})
</script>

<template>
	<router-view />
</template>
