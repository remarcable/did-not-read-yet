module.exports = {
  extends: ['eslint:recommended', 'airbnb-base', 'prettier'],
  plugins: ['import', 'prettier'],
  rules: {
    'prettier/prettier': 'warn',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@root', './src']],
        extensions: ['.js', '.jsx', '.json'],
      },
    },
  },
};
