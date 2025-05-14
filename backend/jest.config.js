module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    roots: ["<rootDir>/src/tests"],
    setupFilesAfterEnv: ["<rootDir>/src/tests/jest.setup.ts"],
    moduleFileExtensions: ["ts", "js"],
    transform: {
      "^.+\\.ts$": "ts-jest",
    },
    collectCoverage: true,
    collectCoverageFrom: ["src/modules/**/*.ts","src/core/**/*.ts"],
  };
  