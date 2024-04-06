import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
	{ languageOptions: { globals: globals.browser } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	{
		env: {
			browser: true,
			es2021: true,
			node: true
		},
		overrides: [],
		parser: '@typescript-eslint/parser',
		extends: [
			'eslint:recommended',
			'plugin:@typescript-eslint/recommended',
			'prettier',
			'plugin:prettier/recommended'
		],
		parserOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module'
		},
		plugins: ['@typescript-eslint', 'prettier'],
		rules: {
			'prettier/prettier': 'error',
			'no-case-declarations': 'off',
			'no-constant-condition': 'off',
			'@typescript-eslint/ban-ts-comment': 'off'
		}
	}
];
