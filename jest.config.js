module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^axios$': '<rootDir>/node_modules/axios/index.js',
    // Додайте інші підстановки, якщо потрібно
  },
};
