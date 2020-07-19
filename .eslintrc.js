module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    '@nuxtjs/eslint-config-typescript',
    'airbnb-typescript/base',
    'plugin:vue/essential',
  ],
  // required to lint *.vue files
  plugins: [
    'vue',
  ],
  // add your custom rules here
  rules: {
    'no-param-reassign': 0,
    'max-len': 'warn',
    'import/no-unresolved': 'off',
    'newline-before-return': 'error',
    'arrow-parens': ['error', 'always'],
    'no-undef': 'off',
    'class-methods-use-this': 'off',
    'no-empty': 'off',
    '@typescript-eslint/member-delimiter-style': 'error',
  },
};
