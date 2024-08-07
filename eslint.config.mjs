export default {
	ignores: ['node_modules/', 'types/', 'typechain-types/'],
	env: {
		mocha: true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: './tsconfig.json',
		tsconfigRootDir: '.',
	},
	plugins: ['@typescript-eslint'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'xo',
		'xo-typescript',
		'prettier',
	],
	rules: {
		'@typescript-eslint/prefer-readonly-parameter-types': 'warn',
	},
	overrides: [
		{
			files: ['test/**/*.ts'],
			rules: {
				'@typescript-eslint/no-unsafe-call': 'off',
				'@typescript-eslint/no-unsafe-assignment': 'off',
				'@typescript-eslint/naming-convention': 'off',
			},
		},
	],
}
