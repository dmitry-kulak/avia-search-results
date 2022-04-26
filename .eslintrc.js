module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:mobx/recommended",
    "plugin:ramda/recommended",
    "prettier",
  ],
  plugins: ["@typescript-eslint", "mobx", "ramda"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-non-null-assertion": "off"
  },
  "env": {
    browser: true,
    es6: true
  },
};
