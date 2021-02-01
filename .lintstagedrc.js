module.exports = {
  "src/**/*.js": [
    "npm run lint:js",
    "npm run lint:format",
    "npm run test:related",
  ],
  "*.{md,json,yml}": ["npm run lint:format"],
};
