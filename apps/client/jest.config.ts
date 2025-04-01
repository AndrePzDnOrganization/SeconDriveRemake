const config = {
  rootDir: '.',
  roots: ['<rootDir>/src', '<rootDir>/test'],
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  testRegex: '(/test/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  testPathIgnorePatterns: [
    '/node_modules/',
    '/.out/',
    '/dist/',
    '/public/',
    '/coverage/',
  ],
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/app/hooks/**/*.{js,jsx,ts,tsx}'],
  coverageThreshold: {
    'src/app/hooks/**/*.{js,jsx,ts,tsx}': {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
    '\\.(gif|ttf|eot|svg|png|jpg|jpeg)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default config;
