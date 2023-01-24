module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended", // Eslint's own recommended rules, minimal set of best practices
    "plugin:prettier/recommended", // Disable eslint's rules about code style and use prettier styles
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  rules: {
    "react/prop-types": 0,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  overrides: [
    // Work with JS files
    {
      files: ["**/*.{js,jsx}"], // Only js and jsx files are processed
      parser: "@babel/eslint-parser", // Use babel to parse js files
      parserOptions: {
        sourceType: "module", // Support import/export
        allowImportExportEverywhere: false,
        ecmaFeatures: {
          globalReturn: false,
        },
      },
    },
    // Work with TS files
    {
      files: ["**/*.{ts,tsx}"], // Only js and jsx files are processed
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: ["./tsconfig.json"], // Tell eslint: where tsconfig is
      },
      extends: [
        // The recommended rules for typescript-eslint, but these best rules are all for TS
        "plugin:@typescript-eslint/recommended",
        // Recommended rules for Type Checking in tsconfig.json
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      rules: {
        "react/prop-types": 0,
        "@typescript-eslint/no-floating-promises": 0,
        "@typescript-eslint/no-empty-function": 0,
        "@typescript-eslint/no-misused-promises": 0,
      },
      plugins: [
        // Plugins that use TypeScript x Eslint
        "@typescript-eslint",
      ],
    },
  ],
};
