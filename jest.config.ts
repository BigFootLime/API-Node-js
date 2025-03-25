export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/__test__/**/*.test.ts'],
    setupFilesAfterEnv: ['./__test__/setup.ts'],
    testTimeout: 60000 
  }
  