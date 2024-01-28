const dotenv = require("dotenv");
dotenv.config({
  path: ".env.test.local",
});

module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFiles: ["jest-canvas-mock"],
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
    "^.+\\.svg$": "<rootDir>/svgTransform.js",
  },
  collectCoverage: true,
  coverageReporters: ["json", "html"],
};
