import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";
import base from "./base.js";

/** Base rules plus React hooks rules for component packages and apps. */
export default tseslint.config(...base, reactHooks.configs.flat.recommended, {
  languageOptions: {
    globals: { ...globals.browser },
  },
});
