module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-prettier',
  ],
  env: {
    node: true,
    'vue/setup-compiler-macros': true,
  },
};
