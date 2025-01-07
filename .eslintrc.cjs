module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended', 'eslint-config-prettier', 'plugin:import/recommended', 'plugin:import/typescript', 'plugin:storybook/recommended'],
  plugins: ['import', 'react-refresh'],
  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.app.json',
      },
    },
  },
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
};
