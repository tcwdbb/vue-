module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
  ],
  parserOptions: {
    ecmaVersion: 2022,
    parser: "@typescript-eslint/parser",
    requireConfigFile: false,
    sourceType: "module",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-unused-vars": [
      2,
      {
        vars: "all",
        args: "none",
      },
    ],
    "vue/multi-word-component-names": [
      "error",
      {
        ignores: ["index", "404"],
      },
    ],
  },
  globals: {
    defineProps: "readonly",
    defineEmits: "readonly",
    defineExpose: "readonly",
    withDefaults: "readonly",
  },
};
