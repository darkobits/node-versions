module.exports = require('@darkobits/ts-unified/dist/config/jest')({
  coveragePathIgnorePatterns: [
    '<rootDir>/src/bin'
  ],
  coverageThreshold: {
    global: {
      lines: 90,
      branches: 90,
      statements: 90
    }
  }
});
