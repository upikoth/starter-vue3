const eslintConfig = require('@upikoth/eslint-config-vue3')

module.exports = {
	...eslintConfig,
	rules: {
		...eslintConfig.rules,
		'import/order': [
			'error',
			{
				'newlines-between': 'always',
				groups: ['builtin', 'external', 'internal'],
				pathGroups: [
					{
						group: 'external',
						pattern: '#*',
						position: 'after'
					},
					{
						group: 'internal',
						pattern: '@/environment{/**/*,}',
						position: 'after'
					},
					{
						group: 'internal',
						pattern: '@/constants{/**/*,}',
						position: 'after'
					},
					{
						group: 'internal',
						pattern: '@/utils{/**/*,}',
						position: 'after'
					},
					{
						group: 'internal',
						pattern: '@/api{/**/*,}',
						position: 'after'
					},
					{
						group: 'internal',
						pattern: '@/router{/**/*,}',
						position: 'after'
					},
					{
						group: 'internal',
						pattern: '@/stores{/**/*,}',
						position: 'after'
					},
					{
						group: 'internal',
						pattern: '@/composables{/**/*,}',
						position: 'after'
					},
					{
						group: 'internal',
						pattern: '@/models{/**/*,}',
						position: 'after'
					},
					{
						group: 'internal',
						pattern: '@/components{/**/*,}',
						position: 'after'
					},
					{
						group: 'internal',
						pattern: '{.,..,../..}{/**/*,}',
						position: 'after'
					}
				]
			}
		]
	}
}
