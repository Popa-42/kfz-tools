import { FlatCompat } from "@eslint/eslintrc";
import eslintParserTypeScript from "@typescript-eslint/parser";
import eslintPluginBetterTailwindcss from "eslint-plugin-better-tailwindcss";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  {
    ignores: ["**/node_modules/**", "**/dist/**", "**/build/**", "**/.next/**"],
  },
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript", "plugin:prettier/recommended"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: true,
          varsIgnorePattern: "^(_\\S*|req)$",
          argsIgnorePattern: "^(_\\S*|req)$",
          caughtErrorsIgnorePattern: "^(_\\S*|req)$",
        },
      ],
      "@typescript-eslint/no-explicit-any": ["error"],
    },
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        },
      },
      "better-tailwindcss": {
        entryPoint: "./public/assets/styles/globals.css",
        attributes: ["className", "classNames", "classes", "styles", "style", ".*Classes", ".*Variants"],
        callees: ["clsx", "cn", "cva", "tw", ".*Classes", ".*Variants"],
        variables: [
          ".*Classes",
          ".*Variants",
          [
            ".*Classes",
            [
              {
                match: "objectValues",
                pathPattern: "[a-z]+[A-Za-z]*",
              },
            ],
          ],
          [
            ".*Variants",
            [
              {
                match: "objectValues",
                pathPattern: "[a-z]+[A-Za-z]*",
              },
            ],
          ],
        ],
      },
    },
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
    files: ["**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}"],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "better-tailwindcss": eslintPluginBetterTailwindcss,
    },
    rules: {
      // enable all recommended rules to report a warning
      ...eslintPluginBetterTailwindcss.configs["recommended-warn"].rules,
      // enable all recommended rules to report an error
      ...eslintPluginBetterTailwindcss.configs["recommended-error"].rules,

      // or configure rules individually
      "better-tailwindcss/multiline": [
        "warn",
        {
          printWidth: 120,
          preferSingleLine: true,
          lineBreakStyle: "windows",
          group: "newLine",
        },
      ],

      "better-tailwindcss/no-unregistered-classes": "off",

      // Prettier
      ...eslintPluginPrettierRecommended.rules,
      "prettier/prettier": [
        "error",
        {
          endOfLine: "crlf",
        },
      ],
    },
  },
];

export default eslintConfig;
