import js               from "@eslint/js";
import globals          from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig ([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions:
    {
      globals:
      {
        ... globals .browser,
        ... globals .vitest,
      },
    },
    rules:
    {
      "no-async-promise-executor": "off",
      "no-empty": ["error", { "allowEmptyCatch": true }],
      "semi": "error",
    },
  },
  {
    files: ["tests/browser/**/*.js"],
    languageOptions:
    {
      sourceType: "module",
      globals:
      {
        enumerate: "readonly",
        sleep: "readonly",
      },
    },
  },
  {
    files: ["tests/node/**/*.js"],
    languageOptions:
    {
      sourceType: "module",
      globals:
      {
        ... globals .node,
      },
    },
  },
  {
    files: ["tests/browser/versions/*.js.test.js"],
    languageOptions:
    {
      globals:
      {
        X3D: "readonly",
      },
    },
  },
]);
