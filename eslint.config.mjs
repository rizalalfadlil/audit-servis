import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import sonarjs from "eslint-plugin-sonarjs";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  // Custom rules
  {
    plugins: { sonarjs },
    rules: {
      // Warn when using console.log (allow console.warn/error)
      "no-console": ["warn", { allow: ["warn", "error"] }],
      // Warn for commented-out code blocks
      "sonarjs/no-commented-code": "warn",
    },
  },
]);

export default eslintConfig;
