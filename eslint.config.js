import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"], // Include TypeScript files
    parser: "@typescript-eslint/parser", // Use the TypeScript parser
    parserOptions: {
      ecmaVersion: 2020, // Set ECMAScript version
      sourceType: "module", // Allow imports in TypeScript
    },
    settings: {
      react: {
        version: "detect", // Automatically detect the React version
      },
    },
    plugins: ["@typescript-eslint", "react"], // Add TypeScript and React plugins
    extends: [
      pluginJs.configs.recommended, // Include base JavaScript linting rules
      pluginReact.configs.flat.recommended, // Include React linting rules
      "plugin:@typescript-eslint/recommended", // Add TypeScript linting rules
    ],
    rules: {
      "react/react-in-jsx-scope": "off", // Disable the rule for JSX scope
      "no-undef": "error", // Enforce no-undef rule for both JS and TS files
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ], // Handle unused variables in TypeScript
      "@typescript-eslint/explicit-module-boundary-types": "off", // Disable explicit return type checking (optional)
    },
  },
];
