import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import boundaries from "eslint-plugin-boundaries";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "public/mockServiceWorker.js",
  ]),

  // ── FSD Boundaries ──────────────────────────────────────────────
  // Enforces Feature-Sliced Design layer dependencies:
  //   app → views → widgets → features → entities → shared
  {
    name: "fsd/boundaries",
    plugins: { boundaries },
    settings: {
      "boundaries/elements": [
        { type: "app", pattern: ["src/app/*"] },
        { type: "views", pattern: ["src/views/*"], capture: ["view"] },
        { type: "widgets", pattern: ["src/widgets/*"], capture: ["widget"] },
        { type: "features", pattern: ["src/features/*"], capture: ["feature"] },
        { type: "entities", pattern: ["src/entities/*"], capture: ["entity"] },
        { type: "shared", pattern: ["src/shared/*"], capture: ["segment"] },
        { type: "mocks", pattern: ["src/mocks/*"] },
      ],
      "boundaries/ignore": ["**/*.test.*", "**/*.spec.*"],
    },
    rules: {
      "boundaries/element-types": [
        "warn",
        {
          default: "disallow",
          rules: [
            {
              from: "app",
              allow: ["views", "widgets", "features", "entities", "shared"],
            },
            {
              from: "views",
              allow: ["widgets", "features", "entities", "shared"],
            },
            {
              from: "widgets",
              allow: ["widgets", "features", "entities", "shared"],
            },
            { from: "features", allow: ["entities", "shared"] },
            { from: "entities", allow: ["entities", "shared"] },
            { from: "shared", allow: ["shared"] },
            { from: "mocks", allow: ["mocks", "entities", "shared"] },
          ],
        },
      ],
    },
  },

  // ── Import ordering & hygiene ───────────────────────────────────
  {
    name: "imports",
    rules: {
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          pathGroups: [
            { pattern: "react", group: "external", position: "before" },
            { pattern: "react-dom/**", group: "external", position: "before" },
            { pattern: "next", group: "external", position: "before" },
            { pattern: "next/**", group: "external", position: "before" },
          ],
          pathGroupsExcludedImportTypes: ["react", "next"],
          "newlines-between": "never",
        },
      ],
      "import/no-duplicates": "warn",
      "import/first": "warn",
      "import/newline-after-import": "warn",
      "import/no-useless-path-segments": "warn",
    },
  },

  // ── TypeScript strictness ───────────────────────────────────────
  {
    name: "typescript/strict",
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
        },
      ],
    },
  },

  // ── General rules ───────────────────────────────────────────────
  {
    name: "general",
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "prefer-const": "warn",
    },
  },
]);

export default eslintConfig;
