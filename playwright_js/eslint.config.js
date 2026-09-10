import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser } },
  {
    languageOptions: {
      globals: {
        ...globals.node, // Adds process, require, etc.
      },
    },
  },
   {
    rules: {
      // Allows function foo({}) {} but still catches const {} = bar;
      "no-empty-pattern": ["error", { "allowObjectPatternsAsParameters": true }]
    }
  }
]);
