import js from "@eslint/js";
import globals from "globals";
import pluginPrettier from "eslint-plugin-prettier";

export default [
  // Base ESLint recommended rules
  js.configs.recommended,

  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        ...globals.node, // ✅ Node.js environment (backend)
      },
    },
    plugins: {
      prettier: pluginPrettier, // ✅ add Prettier
    },
    rules: {
      ...js.configs.recommended.rules,
      "prettier/prettier": "error", // ✅ enforce Prettier formatting
    },
  },
];
