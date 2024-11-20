module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'] }],
    },
    transformIgnorePatterns: [
        '/node_modules/(?!(multi-bet-nexus-react-ui-v2|tone)/)',
    ],
    moduleNameMapper: {
        '^uuid$': require.resolve('uuid'),
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};