import {dirname} from "path";
import {fileURLToPath} from "url";
import {FlatCompat} from "@eslint/eslintrc";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import eslintParserTypeScript from "@typescript-eslint/parser";
import eslintPluginReadableTailwind from "eslint-plugin-readable-tailwind";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: [
      "next/core-web-vitals",
      "next/typescript",
      "plugin:prettier/recommended"
    ],
  }),
  {
    files: ["**/*.{ts,tsx,cts,mts}"],
    languageOptions: {
      parser: eslintParserTypeScript,
      parserOptions: {
        project: true,
      },
    },
  },
  {
    files: ["**/*.{js,mjs,jsx,ts,mts,tsx}"],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "readable-tailwind": eslintPluginReadableTailwind,
      "typescript-eslint": typescriptEslint,
    },
    rules: {
      // Readable Tailwind
      ...eslintPluginReadableTailwind.configs.error.rules,

      "readable-tailwind/multiline": [
        "warn",
        {
          printWidth: 120,
          lineBreakStyle: "windows",
          preferSingleLine: true,
          group: "newLine",
        }
      ],

      // Prettier
      "prettier/prettier": [
        "error",
        {
          endOfLine: "crlf",
        },
      ],
    },
  },
  eslintConfigPrettier,
];

export default eslintConfig;
