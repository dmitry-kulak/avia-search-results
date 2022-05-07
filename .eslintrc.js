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
    "plugin:unicorn/recommended",
    "plugin:sonarjs/recommended",
    "prettier",
  ],
  plugins: ["@typescript-eslint", "mobx", "ramda", "unicorn", "sonarjs"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "unicorn/filename-case": "off",
    "unicorn/prevent-abbreviations": [
      "error",
      {
        "ignore": [
          ".*\Props$",
          /^ignore/i
        ]
      }
    ],
    "mobx/no-anonymous-observer": "off",
    "unicorn/no-array-for-each": "warn"

  },
  "env": {
    browser: true,
    es6: true
  },
};
