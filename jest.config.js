/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: 'ts-jest',
	transform: {
		'^.+\\.ts?$': 'ts-jest',
	},
	transformIgnorePatterns: ['./node_modules/'],
	modulePaths: ['<rootDir>/src'],
	testEnvironment: 'jsdom',
	setupFiles: ['<rootDir>/src/tests/setEnvVars.js'],
};
