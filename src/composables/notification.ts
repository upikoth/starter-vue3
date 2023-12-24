import { useQuasar } from 'quasar'

export function useNotification() {
	const $q = useQuasar()

	function error(message: string) {
		$q.notify({
			message,
			type: 'negative',
			position: $q.screen.xs ? 'top' : 'top-right'
		})
	}

	function success(message: string) {
		$q.notify({
			message,
			type: 'positive',
			position: $q.screen.xs ? 'top' : 'top-right'
		})
	}

	return {
		error,
		success
	}
}
