import { useQuasar } from 'quasar'

export function useNotification() {
	const $q = useQuasar()

	function error(message: string) {
		$q.notify({
			message,
			type: 'negative',
			position: $q.screen.xs ? 'top' : 'bottom-right'
		})
	}

	return { error }
}
