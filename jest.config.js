module.exports = {
    transform: {
        "^.+\\.[t|j]sx?$": "babel-jest"
    },
    verbose: true,
    testEnvironment: "jsdom",
    moduleNameMapper: {
        '\\.svg$': '<rootDir>/src/__mocks__/svgrMock.ts',
    },
    collectCoverage: true,
    coverageDirectory: "<rootDir>/src/__tests__/coverage",
    testPathIgnorePatterns: [
        "<rootDir>/src/__tests__/coverage/"
    ]
}
