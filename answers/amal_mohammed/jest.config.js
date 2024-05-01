// jest.config.js
module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
      // Handle module aliases (if you have them in your tsconfig.json)
      '^@components/(.*)$': '<rootDir>/components/$1',
      '^@utils/(.*)$': '<rootDir>/utils/$1',
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy' // Mocking CSS imports
    },
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }]
    }
  };
  