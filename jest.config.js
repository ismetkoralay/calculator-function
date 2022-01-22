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
        statements: 90,
        branches: 90,
        functions: 90,
        lines: 90
      }
    }
  };