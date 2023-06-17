module.exports = {
	transform: {
		'^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': 'babel-jest',
	},
	transformIgnorePatterns: ['./node_modules/'],
	modulePaths: ['<rootDir>/src'],
	testEnvironment: 'jsdom',
	setupFiles: ['<rootDir>/src/tests/setEnvVars.js'],
};
