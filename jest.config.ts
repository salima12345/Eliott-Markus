import type { Config } from 'jest'
import nextJest from 'next/jest.js'
 
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})
 
// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.css$': 'jest-transform-stub',
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^swiper/react$": "<rootDir>/__mocks__/swiperReactMock.js",
    "^swiper/modules$": "<rootDir>/__mocks__/swiperModulesMock.js",
    "^swiper/css$": "<rootDir>/__mocks__/swiperCssMock.js",
    "^swiper/css/(.*)$": "<rootDir>/__mocks__/swiperCssMock.js"
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: ['node_modules/(?!(swiper|ssr-window|dom7)/)'],

  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },


  
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']}
 
// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)