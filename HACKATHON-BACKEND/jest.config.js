module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js?(x)'],
  verbose: true,
  // Helpful for diagnosing hanging async ops in CI/local
  detectOpenHandles: true,
};