module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	collectCoverageFrom: [
		"./src/**/*.{ts,tsx}",
		"!**/node_modules/**",
		"!**/vendor/**",
	],
	coveragePathIgnorePatterns: ["<rootDir>/src/cli.ts"],
}
