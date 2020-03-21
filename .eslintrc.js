module.exports = {
  extends: ['./node_modules/poetic/config/eslint/eslint-config.js'],
  // Add custom rules here
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    'func-names': ['error', 'always', { generators: 'never' }],
    'import/prefer-default-export': 'off',
    'react/prop-types': 'off',
    'global-require': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-param-reassign': 'off',
  },
};
