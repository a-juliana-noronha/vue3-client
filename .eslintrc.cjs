// const tailwindAttributes = [
//   'input',
//   'button',
//   'inner',
//   'outer',
//   'label',
//   'options',
//   'option',
//   'help',
//   'tag',
//   'body',
//   'messages',
//   'wrapper',
//   'icon',
//   'fieldset',
// ].map((prefix) => `${prefix}-class`)

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    'vue/setup-compiler-macros': true,
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
  },
  ignorePatterns: ['**/node_modules/**', '**/dist/**'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': ['off'],
    'no-multiple-empty-lines': ['error'],
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
      },
    ],
    '@typescript-eslint/no-unused-vars': ['error'],
    // this is already checked by @vue/standard so this would double it up
    // '@typescript-eslint/no-explicit-any': 'off',
    'vue/script-setup-uses-vars': 'error',
    'vue/component-tags-order': [
      'error',
      {
        order: ['script', 'template', 'style'],
      },
    ],
    'vue/multi-word-component-names': ['off'],
    'vue/no-reserved-component-names': ['off'],
    'prettier/prettier': [
      'error',
      {
        semi: false,
        singleQuote: true,
        printWidth: 80,
        plugins: [
          // 'prettier-plugin-tailwindcss',
          '@ianvs/prettier-plugin-sort-imports',
        ],
        // tailwindConfig: './packages/tailwind-config/tailwind.config.js',
        // tailwindAttributes,
      },
    ],
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@vue/prettier',
    'prettier',
    '@vue/eslint-config-typescript',
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2021,
  },
}
