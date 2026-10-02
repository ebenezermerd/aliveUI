import js from "@eslint/js";
import tseslint from "typescript-eslint";

/** Shared rules for every TypeScript workspace. */
export default tseslint.config(
  { ignores: ["dist/**", ".next/**", ".turbo/**", "storybook-static/**", "next-env.d.ts"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/consistent-type-imports": ["error", { fixStyle: "inline-type-imports" }],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
);
