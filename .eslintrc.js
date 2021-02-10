module.exports = {
	env: {
		es2021: true,
		node: true,
	},
	extends: ["plugin:prettier/recommended"],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: 12,
		sourceType: "module",
	},
	plugins: ["@typescript-eslint", "prettier"],
	rules: {
		"prettier/prettier": "error",
	},
	overrides: [
		{
			files: ["tests/*"],
			globals: {
				describe: true,
				it: true,
				expect: true,
			},
		},
	],
}
