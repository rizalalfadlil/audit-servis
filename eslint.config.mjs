import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import sonarjs from "eslint-plugin-sonarjs";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    plugins: { sonarjs },
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "sonarjs/no-commented-code": "warn",
    },
  },
]);

export default eslintConfig;
