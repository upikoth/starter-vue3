import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { BreakpointEnum } from '@/constants'

import { IStoreNameEnum } from './index.types'

export const useScreenStore = defineStore(IStoreNameEnum.Screen, () => {
	const windowWidth = ref(window.innerWidth)

	window.onresize = () => {
		windowWidth.value = window.innerWidth
	}

	const isXs = computed(() => windowWidth.value >= BreakpointEnum.Xs && windowWidth.value < BreakpointEnum.Sm)
	const isSm = computed(() => windowWidth.value >= BreakpointEnum.Sm && windowWidth.value < BreakpointEnum.Md)
	const isMd = computed(() => windowWidth.value >= BreakpointEnum.Md && windowWidth.value < BreakpointEnum.Lg)
	const isLg = computed(() => windowWidth.value >= BreakpointEnum.Lg && windowWidth.value < BreakpointEnum.Xl)
	const isXl = computed(() => windowWidth.value >= BreakpointEnum.Xl)

	const isSmDown = computed(() => isXs.value || isSm.value)
	const isMdDown = computed(() => isXs.value || isSm.value || isMd.value)
	const isLgDown = computed(() => isXs.value || isSm.value || isMd.value || isLg.value)

	const isSmUp = computed(() => isSm.value || isMd.value || isLg.value || isXl.value)
	const isMdUp = computed(() => isMd.value || isLg.value || isXl.value)
	const isLgUp = computed(() => isLg.value || isXl.value)

	return {
		isXs,
		isSm,
		isMd,
		isLg,
		isXl,
		isSmDown,
		isMdDown,
		isLgDown,
		isSmUp,
		isMdUp,
		isLgUp,
	}
})
