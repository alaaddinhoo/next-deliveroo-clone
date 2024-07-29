const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  preset: "ts-jest",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  transform: {
    "^.+\\.tsx?$": "babel-jest",
  },
  transformIgnorePatterns: ["/node_modules/(?!@splidejs)"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "<rootDir>/__mocks__/styleMock.js",
    "^@/(.*)$": "<rootDir>/$1",
    "^@splidejs/react-splide/css$": "<rootDir>/__mocks__/styleMock.js",
  },
  testEnvironment: "jsdom",
};

module.exports = createJestConfig(customJestConfig);
