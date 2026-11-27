import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __dirname = dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // src/lib/ops-core.js is the supplied Ops Core file, kept byte-for-byte; its logic must not change.
    ignores: [".next/**", "node_modules/**", "next-env.d.ts", "review-screenshots/**", ".impeccable/**", "docs/**", "src/lib/ops-core.js"],
  },
];

export default eslintConfig;
