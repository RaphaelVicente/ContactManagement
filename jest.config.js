module.exports = {
  bail: true,

  clearMocks: true,

  collectCoverage: true,

  collectCoverageFrom: ["src/**", "!src/database/**"],

  coverageDirectory: "tests/coverage",

  testEnvironment: "node",

  testMatch: [
    "**/tests/**/*.test.js?(x)"
  ]
};