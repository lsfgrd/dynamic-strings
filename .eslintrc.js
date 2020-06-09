module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'lines-between-class-members': 'off',
    'arrow-body-style': 'off',
    'class-methods-use-this': 'off',
    'no-underscore-dangle': 'off',
    'import/extensions': ['off', 'never'],
    'import/no-unresolved': ['off', 'never']
  },
};
