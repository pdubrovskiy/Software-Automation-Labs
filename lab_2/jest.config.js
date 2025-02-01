module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.ts"],
  verbose: true,
  testTimeout: 60000, // Increased timeout for Selenium tests
  setupFilesAfterEnv: [],
};
