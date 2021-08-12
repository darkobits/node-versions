import { jest } from '@darkobits/ts';

export default jest({
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
