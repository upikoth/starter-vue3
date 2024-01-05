// eslint-disable-next-line no-undef
module.exports = {
	root: true,
	parserOptions: { ecmaVersion: 'latest' },
	extends: [
		'airbnb-base',
		'eslint:recommended',
		'plugin:vue/vue3-recommended',
		'@vue/eslint-config-typescript'
	],
	overrides: [
		{
			files: ['cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}'],
			extends: ['plugin:cypress/recommended']
		}
	],
	rules: {
		quotes: ['error', 'single'],
		indent: ['error', 'tab'],
		'no-tabs': 'off',
		'vue/html-indent': ['error', 'tab'],
		'no-trailing-spaces': 'error',
		'no-console': 'warn',
		'eol-last': ['error', 'always'],
		semi: ['error', 'never'],
		'comma-dangle': ['error', 'never'],
		'max-len': ['error', { code: 120 }],
		'import/no-unresolved': 'off',
		'import/no-extraneous-dependencies': 'off',
		'import/extensions': 'off',
		'no-use-before-define': 'off',
		'import/prefer-default-export': 'off',
		'radix': 'off',
		'implicit-arrow-linebreak': 'off',
		'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
		'prefer-destructuring': ['error', {'object': true, 'array': false}]
	}
}
