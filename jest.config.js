const { resolve } = require('path');

module.exports = {
    preset: 'ts-jest',
    // setupFilesAfterEnv: ['./jest.setup.js'],
    bail: true,
    rootDir: resolve(),
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coveragePathIgnorePatterns: ['/node_modules/'],
    moduleDirectories: ['node_modules'],
    moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|pdf|txt)$':
            '<rootDir>/__mocks__/fileMock.js',
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
        '^src(.*)$': `${resolve('./src')}$1`
    },
    transform: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/__mocks__/fileTransform.js'
    },
    transformIgnorePatterns: ['/node_modules/'],
    verbose: true,
    testMatch: ['**/__tests__/**/*.{js,ts,tsx,jsx}', '**/?(*.)+(spec|test).{js,ts,tsx,jsx}']
};
