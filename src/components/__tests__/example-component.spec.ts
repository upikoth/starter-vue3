import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import ExampleComponent from '../example-component.vue'

describe('ExampleComponent', () => {
	it('корректно отображается текст', () => {
		const wrapper = mount(ExampleComponent)

		expect(wrapper.text()).toContain('example component')
	})
})
