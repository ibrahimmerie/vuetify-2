module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  env: {
    'vue/setup-compiler-macros': true
  },
  plugins: [
    'vue',
    '@typescript-eslint',
    'typescript-sort-keys'
  ],
  extends: [ 'standard', 'plugin:@typescript-eslint/recommended', 'plugin:vue/vue3-recommended' ],
  rules: {
    'operator-linebreak': [ 'error', 'before' ],
    'object-curly-spacing': [ 'error', 'always' ],
    'array-bracket-spacing': [ 'error', 'always' ],
    indent: 'off',
    'multiline-ternary': 'off',
    '@typescript-eslint/indent': [
      'error',
      2,
      { flatTernaryExpressions: true, SwitchCase: 1 }
    ],
    'padded-blocks': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_'
      }
    ],
    '@typescript-eslint/no-non-null-assertion': 'off',
    'vue/multi-word-component-names': 'off',
    'typescript-sort-keys/interface': 'error',
    'vue/script-setup-uses-vars': 'error',
    'vue/require-default-prop': 'off'
  }
}
