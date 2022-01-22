module.exports = {
    clearMocks: false,
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageProvider: "v8",
  
    testEnvironment: "node",
    testMatch: [
      "**/*.test.ts"
    ],
    coverageThreshold: {
      global: {
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100
      }
    }
  };