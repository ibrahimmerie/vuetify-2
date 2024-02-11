module.exports = {
  root: true,
  extends: [ 'standard' ],
  globals: {
    Vue: 'readonly',
    VueRouter: 'readonly',
    axios: 'readonly',
    $: 'readonly',
  },
  rules: {
    'operator-linebreak': [ 'error', 'before' ],
    'object-curly-spacing': [ 'error', 'always' ],
    'array-bracket-spacing': [ 'error', 'always' ],
    indent: [ 'error', 2, { flatTernaryExpressions: true, SwitchCase: 1 } ],
    'padded-blocks': 'off',
    'multiline-ternary': 'off',
    'comma-dangle': [ 'error', 'always-multiline' ],
  },
}
