module.exports = {
  parser: 'vue-eslint-parser',
  root: true,
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  env: {
    'vue/setup-compiler-macros': true,
    node: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:typescript-sort-keys/recommended',
  ],
  rules: {
    'object-curly-spacing': ['error', 'always'],
    indent: 'off',
    'multiline-ternary': 'off',
    'padded-blocks': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-non-null-assertion': 'off',
    'vue/multi-word-component-names': 'off',
    'typescript-sort-keys/interface': 'error',
    'vue/script-setup-uses-vars': 'error',
    'vue/require-default-prop': 'off',
  },
}
